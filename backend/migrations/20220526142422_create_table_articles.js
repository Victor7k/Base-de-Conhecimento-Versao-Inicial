// O 'return' é obrigatorio nas 'Migrations'. 
exports.up = function(knex, Promise) {
    return knex.schema.createTable('articles', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('description', 1000).notNull()
        table.string('imageUrl', 1000)
        table.binary('content').notNull() // Vai armazenar o conteúdo do artigo. Ele é um campo BLOB.
        table.integer('userId').references('id')
            .inTable('users').notNull()
        table.integer('categoryId').references('id')
            .inTable('categories').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('articles')
};

/* 
    BLOB - Binary Large Object
    CLOB - Character Large Object
*/