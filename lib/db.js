const knexfile = require('../knexfile');
const knex = require('knex')(knexfile);

const saveReview = object => {
  console.log(`yup scraper: saving review ${object.hash}`);
  return knex('reviews')
    .whereNotExists(query => {
      query.select('*').from('reviews').where('hash', object.hash);
    })
    .insert(object)
    .catch(err => {
      console.error(err);
    });
}

const saveUser = object => {
  console.log(`yup scraper: saving user ${object.name} from ${object.location} with id ${object.id}`);
  return knex('users')
    .whereNotExists(query => {
      query.select('*').from('users').where('id', object.id);
    })
    .insert(object)
    .catch(err => {
      console.error(err);
    });
}

module.exports = {
  saveReview,
  saveUser
}
