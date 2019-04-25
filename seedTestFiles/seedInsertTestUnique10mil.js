/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
const faker = require('faker');
const mongoose = require('mongoose');
// const fs = require('fs');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/testSeed', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (err) => {
  console.log('error connecting', err);
});
db.once('open', () => {
  console.log('mongoose connected');
});

const companies = new Set();
const mapTicker = () => {
  let company = '';
  const tickerChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i <= 4; i++) {
    company += tickerChars.charAt(Math.floor(Math.random() * tickerChars.length));
  }
  if (!companies.has(company)) {
    if (company === undefined) {
      return assignCompanies();
    }
    companies.add(company);
    return company;
  }
  return mapTicker();
};

let idCounter = 1;
let finalArray;
const noDocsInSet = 1000;
let round = 1;

const randoGenArrayFactory = () => {
  finalArray = [];
  let i = 0;
  while (i < noDocsInSet) {
    const stockDetail = {
      _id: new mongoose.Types.ObjectId(),
      ask_price: faker.finance.amount(100, 1500, 6),
      ask_size: faker.random.number({ min: 100, max: 500 }),
      bid_price: faker.finance.amount(100, 2000, 6),
      bid_size: faker.random.number({ min: 100, max: 500 }),
      last_extended_hours_trade_price: faker.finance.amount(100, 2000, 6),
      last_trade_price: faker.finance.amount(100, 2000, 6),
      symbol: mapTicker(),
      quantity: faker.finance.amount(1, 500, 4),
    };

    finalArray.push(stockDetail);
    // eslint-disable-next-line no-plusplus
    idCounter++;
    // eslint-disable-next-line no-plusplus
    i++;
  }
};


const insertionFactory = () => {
  randoGenArrayFactory();
  // eslint-disable-next-line no-unused-vars
  return new Promise(((resolve, reject) => {
    db.collection('stocks').insertMany(finalArray, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Insertion success - Round ${round}`);
        resolve();
      }
    });
  }));
};

const doEverything = async () => {
  const startTime = Date.now();
  while (round < 10001) {
    await insertionFactory();
    round++;
  }
  console.log(`\x1b[32m${(Date.now() - startTime) / 1000}s\x1b[0m`);
  await db.close();
};

doEverything();
