import fs from 'fs';
import fetch from 'node-fetch';

const TOPICS = [
  'Computer Science',
  'Cryptography',
  'Information Security',
  'Web Design',
  'Web Development',
  'Web Security',
];

const BASE = 'https://www.googleapis.com/books/v1/volumes';
const TOPIC = TOPICS[2];
const TOTAL_ITEMS = 1000;
const Q = toQueryParam(TOPIC);
const ORDER_BY = 'newest';
const PRINT_TYPE = 'books';
const MAX_RESULTS = 40;

function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function toQueryParam(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1+$2')
    .replace(/[\s_]+/g, '+')
    .toLowerCase();
}

(async function () {
  try {
    const promises = [];

    let count = 0;

    while (count * MAX_RESULTS < TOTAL_ITEMS) {
      count++;

      const res = await fetch(
        `${BASE}?q=${Q}&orderBy=${ORDER_BY}&printType=${PRINT_TYPE}&maxResults=${MAX_RESULTS}&startIndex=${Math.floor(
          MAX_RESULTS * count
        )}`
      );

      promises.push(res.json());
    }

    const result = await Promise.all(promises);

    const books = result
      .flatMap((r) => r.items)
      .filter((book) => typeof book === 'object' && book !== null);

    let data = JSON.stringify({ books }, null, 2);

    if (!fs.existsSync('data')) fs.mkdirSync('data');
    if (!fs.existsSync('data/topics')) fs.mkdirSync('data/topics');
    fs.writeFile(`data/topics/${toKebabCase(TOPIC)}.json`, data, (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.log('Error: ', error.message);
  }
})();
