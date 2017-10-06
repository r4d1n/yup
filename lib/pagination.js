const cheerio = require('cheerio');
const _ = require('lodash');

const _list = [];

/**
 * Get pagination links from Yelp page.
 * @constructor
 * @param {object} body The body that `request` returns from http.
 * @returns {array} A list of pagination links.
 */
function getLinks(body) {
  const $ = cheerio.load(body);
  // update list links to visit
  const pagination = $('.pagination-links a.available-number').toArray().map(el => $(el).attr('href'));
  return pagination;
}

/**
 * Add pagination link to list, if not already present.
 * @constructor
 * @param {string} link The URI to be added to the list.
 */
function add(link) {
  if (_.some(_list, { 'href': link })) return; // don't add redundant pages to the list
  _list.push({
    href: link,
    done: false
  });
}

/**
 * Update pagination link status in list.
 * @constructor
 * @param {string} link The URI to update in the list.
 */
function markDone(link) {
  let i = _.findIndex(_list, { 'href': link });
  _list[i].done = true;
}

module.exports = {
  add,
  getLinks,
  markDone
}
