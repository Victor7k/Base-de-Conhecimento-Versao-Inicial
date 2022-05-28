const config = require('../knexfile.js')
const knex = require('knex')(config)

knex.migrate.latest([config]) // Não é muito recomendado pois pode perder o controle quando as migrações forem chamadas.
module.exports = knex