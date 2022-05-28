module.exports = app => {
    app.route('/users')
        .post(app.api.user.save) // Vai associar o metodo q será chamado quando vier uma requisição na URL de 'route' usando o método HTTP Post. 
}           // Graças ao 'consign' não precisa se preocupar em ter q importar os arquivos nem os caminhos relativos.