exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.string('id').primary();
    table.integer('review_count');
    table.string('location');
    table.string('name');
    table.boolean('elite_status');
  }).createTable('reviews', (table) => {
    table.increments('id').primary().unsigned();
    table.text('text');
    table.integer('rating');
    table.integer('date');
    table.string('business');
    table.string('hash').unique();
    table.integer('user_id').references('id').inTable('users');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable('reviews')
    .dropTable('users');
};
