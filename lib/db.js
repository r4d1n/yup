const knexfile = require('../knexfile');
const knex = require('knex')(knexfile);

const saveReview = object => {
  console.log('saving review', object);
  return knex('reviews').insert(object).catch(err => {
    console.error(err);
  });
}

const saveUser = object => {
  console.log('saving user', object);
  return knex('users').insert(object).catch(err => {
    console.error(err);
  });
}

module.exports = {
  saveReview,
  saveUser
}
