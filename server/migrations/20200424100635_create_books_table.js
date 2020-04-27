
exports.up = function(knex) {
    return knex.schema
    .createTable('liked_books', (table) => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('author').notNull()
        table.date('year').notNull()
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('books')
};
