const app = require('express')() // Este segundo chama o resultado do require('express') 
const consign = require('consign')
const db = require('./config/db')

app.db = db

// O consign vai ler todos os arquivos passados no 'then', carrega-los e vai passar o 'app' como parametro pra todos.
consign()
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app) // Vai injetar como parametro o 'app' em cada uma das dependencias que irá carregar.

app.listen(3000, () => {
    console.log('Backend executando...')
})