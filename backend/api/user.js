const  bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        // Quando o Salt gerar o hash ele será diferente para cada geração de senha, mesmo os q tem a mesma origem.
        const salt = bcrypt.genSaltSync(10)  
        return bcrypt.hashSync(password, salt)
    }

    // Este metodo vai inserir um novo usuario e tbm alterar um já existente.
    const save = async (req, res) => {
        const user = { ...req.body } // Usou o operador Spread pra pegar o body e espalhar seus atributos dentro de outro objeto.
        if(req.params.id) { 
            user.id = req.params.id
        }

        try {
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.confirmPassword, 'Confirmação de Senha inválida')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')

            const userFromDB = await app.db('users') // Verifica se o usuário já não está cadastrado.
                .where({ email: user.email }).first()
            if(!user.id) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if(user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    // Vai obter todos os usuários.
    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .where({ id: req.params.id })
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, getById }
}