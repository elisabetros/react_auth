
exports.up = function(knex) {
  return knex.schema
    .createTable('user', (table) => {
        table.uuid('id').primary()
        table.string('username').unique().notNullable()
        table.string('email').notNullable()
        table.string('first_name')
        table.string('last_name')
        table.string('password').notNullable()
        table.date('birthday')
        table.timestamp('created_at').defaultTo(knex.fn.now()); 
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('user')
};
