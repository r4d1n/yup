const fs = require('fs');
const parser = require('../lib/parser');

const sample = fs.readFileSync('./test/sample.html');

test('it should parse the correct data fields out of the sample html', () => {
  let expected = [
    {
      user: {
        name: "Joe O.",
        id: "85zUsMUd9sRSnwJ8MzWwlg",
        location: "Miami, FL",
        review_count: 105,
        elite_status: false
      },
      review: {
        text: "Decor is beautiful. Simple and clean.",
        date: 1510214400000,
        rating: 4,
        business: "Blue Bottle Coffee",
        hash: "8ec27274f5b83c60e8ba8356f36ce85d885b8c6a4010df948d474788efe902bbaebe134f8435b8284c280775ca7d55c0696c6fa87012c5ce7da592b14aa0206a",
        user_id: "85zUsMUd9sRSnwJ8MzWwlg"
      }
    }
  ];

  let parsed = parser.reviews(sample);

  expect(parsed).toEqual(expected);
});

test('it should parse the pagination links out of the sample html', () => {
  let expected = [
    'https://www.yelp.com/biz/blue-bottle-coffee-san-francisco-14?osq=Blue+Bottle+Coffee&start=20',
    'https://www.yelp.com/biz/blue-bottle-coffee-san-francisco-14?osq=Blue+Bottle+Coffee&start=40',
    'https://www.yelp.com/biz/blue-bottle-coffee-san-francisco-14?osq=Blue+Bottle+Coffee&start=60',
    'https://www.yelp.com/biz/blue-bottle-coffee-san-francisco-14?osq=Blue+Bottle+Coffee&start=80',
    'https://www.yelp.com/biz/blue-bottle-coffee-san-francisco-14?osq=Blue+Bottle+Coffee&start=100',
    'https://www.yelp.com/biz/blue-bottle-coffee-san-francisco-14?osq=Blue+Bottle+Coffee&start=120',
    'https://www.yelp.com/biz/blue-bottle-coffee-san-francisco-14?osq=Blue+Bottle+Coffee&start=140',
    'https://www.yelp.com/biz/blue-bottle-coffee-san-francisco-14?osq=Blue+Bottle+Coffee&start=160'
  ];

  let parsed = parser.pages(sample);

  expect(parsed).toEqual(expected);
});
