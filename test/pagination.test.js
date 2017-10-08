const fs = require('fs');
const pagination = require('../lib/pagination');

beforeEach(() => {
  pagination.reset();
});

test('it should add a link to the list one time', () => {
  expect(pagination.remain()).toEqual(0);
  pagination.add('www.google.com');
  pagination.add('www.google.com');
  expect(pagination.remain()).toEqual(1);
});

test('it should mark a link as done', () => {
  expect(pagination.remain()).toEqual(0);
  pagination.add('www.google.com');
  pagination.add('www.twitter.com');
  expect(pagination.remain()).toEqual(2);
  pagination.complete('www.google.com');
  expect(pagination.remain()).toEqual(1);
});

test('it should return the next link', () => {
  pagination.add('www.google.com');
  expect(pagination.next()).toEqual('www.google.com');
});
