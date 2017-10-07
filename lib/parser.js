const cheerio = require('cheerio');
const hasha = require('hasha');

/**
 * Primary exported parser function gets review and user data out of a Yelp page.
 * @param {object} body The body that `request` returns from http.
 * @returns {Array} An array of compound objects with user and review data from a given review DOM element.
 */
function reviews(body) {
  const $ = cheerio.load(body);
  const business = $('.biz-page-title').text().trim();

  // get review divs from the DOM and parse into user and review info
  const reviews = $('div.review').toArray();
  const data = reviews.map(el => {
    // review data
    let text = $(el).find('.review-content p').text();
    let hash = hasha(text);
    let rating = parseRating($(el).find('.biz-rating .i-stars').attr('title'));// .match(ratingRegex)[0];
    let date = parseDate($(el).find('.rating-qualifier').text());

    // user data
    let name = $(el).find('.review-sidebar-content .user-passport-info .user-name > a').text().trim();
    let userid = parseUserId($(el).find('.review-sidebar-content .user-passport-info .user-name > a').attr('href'));
    let location = $(el).find('.review-sidebar-content .user-passport-info .user-location b').text();
    let friendCount = Number($(el).find('.review-sidebar-content .user-passport-stats .friend-count b').text());
    let reviewCount = Number($(el).find('.review-sidebar-content .user-passport-stats .review-count b').text());
    let photoCount = Number($(el).find('.review-sidebar-content .user-passport-stats .photo-count b').text());
    let isElite = Boolean($(el).find('.review-sidebar-content .user-passport-stats .is-elite').length);

    return {
      user: {
        name,
        id: userid,
        location,
        review_count: reviewCount,
        elite_status: isElite
      },
      review: {
        text,
        rating,
        date,
        business,
        hash,
        user_id: userid
      }
    }
  }).filter(el => {
    // naive filter for null values, should be improved
    return (el.review.text && el.review.rating);
  });
  return data;
}

/**
 * Exported parser function gets pagination links out of a Yelp page.
 * @param {object} body The body that `request` returns from http.
 * @returns {Array} An array of URIs.
 */
function pages(body) {
  const $ = cheerio.load(body);
  // update list links to visit
  const pagination = $('.pagination-links a.available-number').toArray().map(el => $(el).attr('href'));
  return pagination;
}

/**
 * Exported parser function gets pagination links out of a Yelp page.
 * @param {object} body The body that `request` returns from http.
 * @returns {Array} An array of URIs.
 */
function pages(body) {
  const $ = cheerio.load(body);
  // update list links to visit
  const pagination = $('.pagination-links a.available-number').toArray().map(el => $(el).attr('href'));
  return pagination;
}

/**
 * Utility parser function makes the date representation how we want to save it.
 * @param {object} str the string to parse.
 * @returns {string} Milliseconds since 1/1/1970.
 */
function parseDate(str) {
  if (!str) return null;
  let arr = str.replace(/[\n\\\s]/g, '').split('/').reverse();
  return new Date(arr[0], arr[1], arr[2]).getTime();
}

/**
 * Utility parser function gets a numeric rating from a string.
 * @param {object}  str the string to parse.
 * @returns {number} a numeric rating.
 */
function parseRating(str) {
  return str ? Number(str.match(/\d/)[0]) : null;
}

/**
 * Utility parser function gets a Yelp user id from a string.
 * @param {object}  str the string to parse.
 * @returns {string} a user id.
 */
function parseUserId(str) {
  return str ? str.match(/userid=([^&]*)/)[1] : null;
}

module.exports = {
  reviews,
  pages
}

