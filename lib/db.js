const knexfile = require('../knexfile');
const knex = require('knex')(knexfile);

const saveReview = object => {
  return knex('reviews')
    .whereNotExists(query => {
      query.select('*').from('reviews').where('hash', object.hash);
    })
    .insert(object)
    .then(_ => {
      console.log(`yup scraper: saved review ${object.hash}`);
    })
    .catch(err => {
      let re = /SQLITE_CONSTRAINT: UNIQUE constraint failed/ig;
      if (re.test(err)) {
        console.log(`yup scraper: skipped review ${object.hash}`);
      } else {
        throw err;
      }
    });
}

const saveUser = object => {
  return knex('users')
    .whereNotExists(query => {
      query.select('*').from('users').where('id', object.id);
    })
    .insert(object)
    .then(_ => {
      console.log(`yup scraper: saved user ${object.name} from ${object.location} with id ${object.id}`);
    })
    .catch(err => {
      let re = /SQLITE_CONSTRAINT: UNIQUE constraint failed/ig;
      if (re.test(err)) {
        console.log(`yup scraper: skipped user ${object.name} from ${object.location} with id ${object.id}`);
      } else {
        throw err;
      }
    });
}

module.exports = {
  saveReview,
  saveUser
}
