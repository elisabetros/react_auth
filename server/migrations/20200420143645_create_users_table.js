
exports.up = function(knex) {
  return knex.schema
    .createTable('user', (table) => {
        table.increments('id').primary()
        table.string('username').unique().notNull()
        table.string('email').notNull()
        table.string('first_name')
        table.string('last_name')
        table.string('password').notNull()
        table.date('birthday')
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('user')
};
