const fs = require('fs');
const parse = require('../lib/parse');

const sample = fs.readFileSync('./test/sample.html');

const expected = [
  {
    user: {
      name: "Joe O.",
      id: "85zUsMUd9sRSnwJ8MzWwlg",
      location: "Miami, FL",
      review_count: 105,
      elite_status: false
    },
    review: {
      text: "Decor is beautiful. Simple and clean. The ice coffee, \"New Orleans\" was 10/10.",
      date: 1510214400000,
      rating: 4,
      user_id: "85zUsMUd9sRSnwJ8MzWwlg"
    }
  }
]

test('it should parse the correct fields out of the sample html', () => {
  let parsed = parse(sample);
  expect(parsed).toEqual(expected);
});
