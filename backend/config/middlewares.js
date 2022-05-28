const bodyParser = require('body-parser') // Vai interpretar o body da requisição.
const cors = require('cors') // Permite a uma aplicação de origem diferente acessar a API.

// Este 'app' representa a instância do 'app' de 'index.js'
module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors())
}
// Consign vai ajudar a fazer as relações/dependencias dos arquivos dentro da aplicação.