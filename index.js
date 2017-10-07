'use strict';

const _ = require('lodash');
const request = require('request');
const pagination = require('./lib/pagination');
const parser = require('./lib/parser');

const db = require('./lib/db');

const INIT_URL = "https://www.yelp.com/biz/blue-bottle-coffee-san-francisco-14?osq=Blue+Bottle+Coffee";

function main(err, res, body) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  let reqUri = res.request.uri.href;
  console.log('yup scraper: fetching ', reqUri);
  pagination.add(reqUri);

  let pLinks = parser.pages(body);
  pLinks.forEach(k => pagination.add(k));

  let data = parser.reviews(body);

  console.log('yup scraper: will save ', reqUri);

  Promise.all(data.map(object => {
    return db.saveUser(object.user).then(_ => db.saveReview(object.review));
  }))
    .then(_ => {
      pagination.markDone(reqUri);
      let next = pagination.next();
      if (next) {
        request(next, main);
      } else { // done
        console.log('yup scraper: success!')
        process.exit(0);
      }
    })
    .catch(err => {
      console.error(err)
      process.exit(1);
    });

}

// make the first request
request(INIT_URL, main);
