const faker = require('faker');
const mongoose = require('mongoose');
const Stock = require('../databases/database-mongoose/SchemaMongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/stocks');
const db = mongoose.connection;
db.on('error', (err) => {
  console.log('error connecting', err);
});
db.once('open', () => {
  console.log('mongoose connected');
});


let idCounter = 1;
const finalArray = [];
let insertedArray;
const noDocsInSet = 100000;
let round = 1;
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

const randoGenArrayFactory = () => {
  let i = 0;
  while (i < noDocsInSet) {
    const stockDetail = {
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
    i++;
  }
};


const parseFactory = () => new Promise(((resolve, reject) => {
  let i = 0;
  insertedArray = JSON.parse(JSON.stringify(finalArray.slice()));
  while (i < noDocsInSet) {
    insertedArray[i].id = idCounter++;
    i++;
  }
  resolve();
}));

const insertionFactory = () => new Promise(((resolve, reject) => {
  // Room.RoomModel.insertMany(insertedArray, function(error){
  db.collection('stocks').insertMany(insertedArray, (error, doc) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Insertion success - Round ${round}`);
      resolve();
    }
  });
}));

const doEverything = async () => {
  const startTime = Date.now();
  randoGenArrayFactory();
  while (round < 10001) {
    await parseFactory();
    await insertionFactory();
    round++;
  }
  console.log(`\x1b[32m${(Date.now() - startTime) / 1000}s\x1b[0m`);
  await db.close();
};

doEverything();
