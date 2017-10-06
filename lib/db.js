const knexfile = require('../knexfile');
const knex = require('knex')(knexfile);

const saveReview = object => {
  return knex.insert('reviews').whereNotExists(_ => {
    this.select('*').from('reviews').where(object);
  }).insert(object);
}

const saveUser = object => {
  return knex.whereNotExists(_ => {
    this.select('*').from('users').where(object);
  }).insert('users').insert(object);
}

module.exports = {
  saveReview,
  saveUser
}
