module.exports = app => {
    app.route('/users')
        .post(app.api.user.save) // Vai associar o metodo q será chamado quando vier uma requisição na URL de 'route' usando o método HTTP Post. 
        .get(app.api.user.get)

    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getById)
}       // Graças ao 'consign' não precisa se preocupar em ter q importar os arquivos nem os caminhos relativos.