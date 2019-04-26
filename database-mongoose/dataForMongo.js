const faker = require('faker');
const fs = require('fs');
const csv = require("fast-csv");

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
//run this file using npm run create
const data = [];
console.log('generating data.....')
//makes 10 million datas
console.time('data generated in')
for (let i = 0; i <= 10000000; i++) { 
  const stock = {
    ask_price: faker.finance.amount(100, 1500, 6),
    ask_size: faker.random.number({ min: 100, max: 500 }),
    bid_price: faker.finance.amount(100, 2000, 6),
    bid_size: faker.random.number({ min: 100, max: 500 }),
    last_extended_hours_trade_price: faker.finance.amount(100, 2000, 6),
    last_trade_price: faker.finance.amount(100, 2000, 6),
    symbol: mapTicker(),
    quantity: faker.finance.amount(1, 500, 4),
  }
  data.push(stock)
}

console.log(data.length)
console.timeEnd('data generated in') //about 35 seconds
console.log('creating csv file....')
console.time('file created in')
//creates csv file using data
//data is array of 10 million object items
var ws = fs.createWriteStream("mongoData.csv");
csv
   .write(data, {headers: true})
   .pipe(ws)
    ws.on("finish", () => console.timeEnd('file created in')) //abount 93 seconds