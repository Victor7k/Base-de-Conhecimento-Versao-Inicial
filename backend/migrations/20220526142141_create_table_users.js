// Evolui o banco de dados para novas versões (criar uma tabela, alterar uma coluna, excluir uma tabela, etc...)
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('password').notNull()
        table.boolean('admin').notNull().defaultTo(false)
    })
};

// Serve para desfazer o q foi feito no 'up'.
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
};

/* 
    knex migrate: make create_table_'nome da tabela'.

    knex migrate:latest - Roda até a ultima Migration cadastrada no sistema.

    knex migrate:rollback - Vai executar da ultima até a primeira Migration.

    knex_migrations - Vai controlar as migrações.
    knex_migrations_lock - Vai controlar as transações no momento em q forem feitas.
*/