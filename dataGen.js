const faker = require('faker');
const file = require('fs').createWriteStream('./fakeData.csv');
const csv = require('fast-csv');
const fs = require('fs');
// const psql = require('./database-postgres/pgIndex.js');
const pg = require('pg');
let copyFrom = require('pg-copy-streams').from;
const date = new Date().toLocaleTimeString();

const tickerChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const companies = new Set();

const numToseed = 100000;
let counter = 1;

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

const createFakeStock = () => ({
  id: counter++,
  ask_price: faker.finance.amount(100, 1500, 6),
  ask_size: faker.random.number({ min: 100, max: 500 }),
  bid_price: faker.finance.amount(100, 2000, 6),
  bid_size: faker.random.number({ min: 100, max: 500 }),
  last_extended_hours_trade_price: faker.finance.amount(100, 2000, 6),
  last_trade_price: faker.finance.amount(100, 2000, 6),
  symbol: mapTicker(),
  quantity: faker.finance.amount(1, 500, 4),
});

const generateStocks = () => createFakeStock();

const convertArrayofObjectsToCSV = (data, count) => {
  let result = '';
  if (count === numToseed) {
    result += 'id,ask_price,ask_size,bid_price,bid_size,last_extended_hours_trade_price,last_trade_price,symbol,quantity\n';
  }
  for (let property in data) {
    result += `${data[property]  },`;
  }
  result = result.slice(0, -1);
  return `${result  }\n`;
};


console.log('creating csv file....');
console.time('file created in');
function writeRecords(writer, encoding, callback) {
  let i = numToseed;
  write();
  function write() {
    let ok = true;
    do {
      const stockData = (convertArrayofObjectsToCSV(generateStocks(), i));
      i--;
      if (i === 0) {
        process.stdout.write(stockData, encoding, callback);
      } else {
        ok = process.stdout.write(stockData, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      process.stdout.once('drain', write);
      console.timeEnd('file created in');
    }
  }  
}

writeRecords(file, 'utf8', () => { 
  console.error('Done'); 
});

const connectionString = process.env.DATABASE_URL || "postgres://127.0.0.1:5432/sdc"
const client = new pg.Client(connectionString
client.connect(() => console.log('Connected to postgres!'));

// inserts data from CSV file into Postgres stocks table
console.log('Inserting......please wait.....');
console.time('finished seeding Postgres with 10 Million Records');
let stream = client.query(copyFrom('COPY sdc(id, ask_price,ask_size,bid_price,bid_size,last_extended_hours_trade_price,last_trade_price,symbol,quantity) FROM STDIN WITH CSV HEADER'));
let fileStream = fs.createReadStream('fakeData.csv');
fileStream.pipe(stream);
fileStream.on('end', () => console.timeEnd('finished seeding Postgres with 10 Million Records'));