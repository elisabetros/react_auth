
exports.up = function(knex) {
    return knex.schema
    .createTable('liked_movies', (table) => {
        table.increments('id').primary()
        table.string('title').notNull()
        table.integer('user_id').unsigned().references('user.id').notNullable()
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('liked_movies')
};
