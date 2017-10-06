exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.integer('id').unsigned().primary();
    table.integer('review_count');
    table.boolean('elite_status');
  }).createTable('reviews', (table) => {
    table.uuid('id').primary();
    table.text('text');
    table.integer('rating');
    table.integer('date');
    table.integer('user_id').references('id').inTable('users');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable('reviews')
    .dropTable('users');
};
