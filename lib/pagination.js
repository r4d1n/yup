const _ = require('lodash');

const _list = [];

/**
 * Add pagination link to list, if not already present.
 * @constructor
 * @param {string} link The URI to be added to the list.
 * @return {array} the number of links remaining
 */
function add(link) {
  if (_.some(_list, { 'href': link })) return; // don't add redundant pages to the list
  _list.push({
    href: link,
    done: false
  });
  return remain();
}

/**
 * Update pagination link status in list.
 * @constructor
 * @param {string} link The URI to update in the list.
 */
function complete(link) {
  let i = _.findIndex(_list, { 'href': link });
  _list[i].done = true;
}

/**
 * Return the next pagination link to visit.
 * @constructor
 * @param {string} link The URI to update in the list.
 */
function next() {
  let queue = _.map(_.filter(_list, o => !o.done), o => o.href);
  let next = queue.shift();
  console.log(`yup scraper: next href is ${next} and ${queue.length} remain`);
  return next ? next : null;
}

/**
 * Return the number of links left to go
 * @constructor
 * @return {number} the number of links that have yet to be visited.
 */
function remain() {
  let queue = _.map(_.filter(_list, o => !o.done), o => o.href);
  return queue.length;
}

/**
 * Reset the list of links.
 * @constructor
 * @return {number} the number of links that have yet to be visited.
 */
function reset() {
  _list.length = 0;
}

module.exports = {
  add,
  complete,
  next,
  remain,
  reset
}
