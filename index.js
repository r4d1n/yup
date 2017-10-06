'use strict';

const _ = require('lodash');
const request = require('request');
const pagination = require('./lib/pagination');
const parse = require('./lib/parse');

const db = require('./lib/db');

const INIT_URL = "https://www.yelp.com/biz/blue-bottle-coffee-san-francisco-14?osq=Blue+Bottle+Coffee";

function main(err, res, body) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  let reqUri = res.request.uri.href;

  console.log('fetching ', reqUri);

  let pLinks = pagination.getLinks(body);
  pagination.add(reqUri);
  pLinks.forEach(k => pagination.add(k));

  let data = parse(body);

  Promise.all(data.map(object => {
    return db.saveUser(object.user).then(_ => db.saveReview(object.review));
  }))
  .then(_ => {
    console.log('success!')
    process.exit(0);
  })
  .catch(err => {
    console.error(err)
    process.exit(1);
  });

}

// make the first request
request(INIT_URL, main);

