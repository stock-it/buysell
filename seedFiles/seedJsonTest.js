/* eslint-disable no-plusplus */
const faker = require('faker');
const mongoose = require('mongoose');
const fs = require('fs');
const exec = require('child_process').exec;

let startTime;
let importStartTime;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/jsonStocks');
const db = mongoose.connection;
db.on('error', (err) => {
  console.log('error connecting', err);
});
db.once('open', () => {
  console.log('mongoose connected');
});

const uniqueRecords = 100;
let idCounter = 1;
const seedOutputPath = `${__dirname}/seedJsonTest.json`;
const finalArray = [];


const date = new Date().toLocaleTimeString();

const tickerChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const companies = new Set();

const numToseed = 10;

const mapTicker = () => {
  let company = '';
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

while (idCounter < uniqueRecords) {
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
  const stringStockDetail = JSON.stringify(stockDetail);
  finalArray.push(stringStockDetail);
  idCounter++;
}


const outputLoc = `${__dirname}/seedJsonTest.json`;

const writeOpenBracket = () => new Promise(((resolve, reject) => {
  fs.writeFile(outputLoc, '[', (err) => {
    if (err) throw err;
    resolve();
  });
}));

const writeComma = () => new Promise(((resolve, reject) => {
  fs.appendFile(outputLoc, ',', (err) => {
    if (err) throw err;
    resolve();
  });
}));

const writeContent = round => new Promise(((resolve, reject) => {
  if (round !== 1) {
    for (let i = 0; i < uniqueRecords - 1; i++) {
      const currRecord = JSON.parse(finalArray[i]);
      currRecord.id = idCounter;
      finalArray[i] = JSON.stringify(currRecord);
      idCounter++;
    }
  }

  fs.appendFile(outputLoc, finalArray, (err) => {
    if (err) throw err;
    resolve();
  });
}));

const writeContents = async () => {
  for (let round = 1; round < 10001; round++) {
    round !== 1 && await writeComma();
    await writeContent(round);
    console.log(round);
  }
};

const writeCloseBracket = () => new Promise(((resolve, reject) => {
  fs.appendFile(outputLoc, ']', (err) => {
    if (err) throw err;
    resolve();
  });
}));

const importFactory = () => {
  const command = `mongoimport --db jsonStocks --collection stocks --type json --file ${seedOutputPath} --jsonArray --numInsertionWorkers 2`;
  console.log(`Time to Generate + Export: \x1b[32m${(Date.now() - startTime) / 1000}s\x1b[0m`);
  console.log('starting to import');
  importStartTime = Date.now();
  return new Promise(((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.log('THIS IS ERROR', err);
      }
      console.log(`Time to Import: \x1b[32m${(Date.now() - importStartTime) / 1000}s\x1b[0m`);
      resolve();
    });
  }));
};

const deleteFile = () => new Promise(((resolve, reject) => {
  fs.unlink(seedOutputPath, (err) => {
    if (err) throw err;
    console.log(`${seedOutputPath} was deleted`);
    resolve();
  });
}));

const writeEverything = async () => {
  startTime = Date.now();
  await writeOpenBracket();
  await writeContents();
  await writeCloseBracket();
  await importFactory();
  await deleteFile();
  await db.close();
};

writeEverything();
