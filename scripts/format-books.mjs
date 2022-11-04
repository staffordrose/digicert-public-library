import fs from 'fs';

const DIRNAME = 'data/topics';

const VOLUME_INFO = 'volumeInfo';
const SALE_INFO = 'saleInfo';
const ACCESS_INFO = 'accessInfo';

const TOP_LEVEL_KEYS = ['id', 'selfLink', VOLUME_INFO, SALE_INFO, ACCESS_INFO];
const VOLUME_INFO_KEYS = [
  'title',
  'authors',
  'publisher',
  'publishedDate',
  'description',
  'categories',
  'imageLinks',
  'language',
  'canonicalVolumeLink',
];
const SALE_INFO_KEYS = ['listPrice', 'retailPrice'];
const ACCESS_INFO_KEYS = ['country', 'pdf'];

function keepProperties(obj, keys) {
  const object = {};

  for (const key in obj) {
    if (key === VOLUME_INFO) {
      object[key] = keepProperties(obj[VOLUME_INFO], VOLUME_INFO_KEYS);
    } else if (key === SALE_INFO) {
      object[key] = keepProperties(obj[SALE_INFO], SALE_INFO_KEYS);
    } else if (key === ACCESS_INFO) {
      object[key] = keepProperties(obj[ACCESS_INFO], ACCESS_INFO_KEYS);
    } else if (keys.includes(key)) {
      object[key] = obj[key];
    }
  }

  return object;
}

(async function () {
  try {
    const filenames = fs.readdirSync(DIRNAME, (err, filenames) => {
      if (err) throw err;
    });

    const booksByTopic = [];

    filenames.forEach((filename) => {
      const json = fs.readFileSync(`${DIRNAME}/${filename}`, 'utf-8', (err) => {
        if (err) throw err;
      });

      const data = JSON.parse(json);

      booksByTopic.push(data.books);
    });

    const allBooks = booksByTopic
      .flatMap((b) => b)
      .map((b) => {
        const { id, selfLink, volumeInfo, saleInfo, accessInfo } =
          keepProperties(b, TOP_LEVEL_KEYS);

        return {
          id,
          selfLink,
          ...volumeInfo,
          ...saleInfo,
          ...accessInfo,
        };
      });

    const filteredBookIds = [];
    const filteredBooks = [];

    for (let i = 0; i < allBooks.length; i++) {
      if (!filteredBookIds.includes(allBooks[i].id)) {
        filteredBookIds.push(allBooks[i].id);
        filteredBooks.push(allBooks[i]);
      }
    }

    let data = JSON.stringify({ books: filteredBooks }, null, 2);

    if (!fs.existsSync('data')) fs.mkdirSync('data');
    fs.writeFile(`data/books.json`, data, (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.log('Error: ', error.message);
  }
})();
