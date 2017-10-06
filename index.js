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
  }

  let reqUri = res.request.uri.href;

  console.log('fetching ', reqUri);

  let pLinks = pagination.getLinks(body);
  pagination.add(reqUri);
  pLinks.forEach(k => pagination.add(k));

  let data = parse(body);

}

// make the first request
request(INIT_URL, main);

