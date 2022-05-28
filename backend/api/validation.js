module.exports = app => {
    function existsOrError(value, msg) { // Vai verificar se determinado campo foi fornecido.
        if(!value) throw msg
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg
    }
    
    // Vai consultar, por exemplo, se alguem não está cadastrado no BD.
    function notExistsOrError(value, msg) { 
        try {
            existsOrError(value, msg) // Se não deu erro (pq ele existe) então vai lançar o erro.
        } catch(msg) { // Caso contrario apenas retorna normalmente. 
            return
        } // Pois esta função é o contrario da primeira.
        throw msg
    }
    
    function equalsOrError(valueA, valueB, msg) { // Vai comparar a senha com a confirmação de senha.
        if(valueA !== valueB) throw msg
    }

    return { existsOrError, notExistsOrError, equalsOrError }
}