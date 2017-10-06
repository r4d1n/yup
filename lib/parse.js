const cheerio = require('cheerio');

/**
 * Primary exported parser function gets review and user data out of a Yelp page.
 * @constructor
 * @param {object} body The body that `request` returns from http.
 * @returns {Array} An array of compound objects with user and review data from a given review DOM element.
 */
function parseReviews(body) {
  const $ = cheerio.load(body);

  // get review divs from the DOM and parse into user and review info
  const reviews = $('div.review').toArray();
  const data = reviews.map(el => {
    // review data
    let text = $(el).find('.review-content p').text();
    let rating = parseRating($(el).find('.biz-rating .i-stars').attr('title'));// .match(ratingRegex)[0];
    let date = parseDate($(el).find('.rating-qualifier').text());

    // user data
    let name = $(el).find('.review-sidebar-content .user-passport-info .user-name > a').text();
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
        friendCount,
        reviewCount,
        photoCount,
        isElite
      },
      review: {
        text,
        rating,
        date,
        user_id: userid
      }
    }
  });
  return data;
}

function parseDate(str) {
  if (!str) return null;
  let arr = str.replace(/[\n\\\s]/g, '').split('/').reverse();
  return new Date(arr[0], arr[1], arr[2]).getTime();
}

function parseRating(str) {
  return str ? Number(str.match(/\d/)[0]) : null;
}

function parseUserId(str) {
  return str ? str.match(/userid=([^&]*)/)[1] : null;
}

module.exports = parseReviews;

