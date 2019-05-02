// const faker = require('faker');
// const file = require('fs').createWriteStream('./fakeData.csv');

// const date = new Date().toLocaleTimeString();

// const tickerChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// const companies = new Set();

// const numToseed = 10;


// const mapTicker = () => {
//   let company = '';
//   for (let i = 0; i <= 4; i++) {
//     company += tickerChars.charAt(Math.floor(Math.random() * tickerChars.length));
//   }
//   if (!companies.has(company)) {
//     if (company === undefined) {
//       return assignCompanies();
//     }
//     companies.add(company);
//     return company;
//   }
//   return mapTicker();
// };

// let counter = 1;
// const createFakeStock = () => ({
//   id: counter++,
//   ask_price: faker.finance.amount(100, 1500, 6),
//   ask_size: faker.random.number({ min: 100, max: 500 }),
//   bid_price: faker.finance.amount(100, 2000, 6),
//   bid_size: faker.random.number({ min: 100, max: 500 }),
//   last_extended_hours_trade_price: faker.finance.amount(100, 2000, 6),
//   last_trade_price: faker.finance.amount(100, 2000, 6),
//   symbol: mapTicker(),
//   quantity: faker.finance.amount(1, 500, 4),
// });

// const generateStocks = () => createFakeStock();

// const convertArrayofObjectsToCSV = (data, count) => {
//   let result = '';
//   if (count === numToseed) {
//     result += 'ask_price,ask_size,bid_price,bid_size,last_extended_hours_trade_price,last_trade_price,symbol,quantity\n';
//   }
//   for (let property in data) {
//     result += `${data[property]  },`;
//   }
//   result = result.slice(0, -1);
//   return `${result  }\n`;
// };


// console.log('creating csv file....');
// console.time('file created in');
// function writeRecords(writer, encoding, callback) {
//   let i = numToseed;
//   write();
//   function write() {
//     let ok = true;
//     do {
//       const stockData = (convertArrayofObjectsToCSV(generateStocks(), i));
//       i--;
//       if (i === 0) {
//         process.stdout.write(stockData, encoding, callback);
//       } else {
//         ok = process.stdout.write(stockData, encoding);
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
//       process.stdout.once('drain', write);
//       console.timeEnd('file created in');
//     }
//   }  
// }

// writeRecords(file, 'utf8', () => { 
//   console.error('Done'); 
// });


const faker = require('faker');
const fs = require('fs');
const file = fs.createWriteStream('./mockData.csv');

const createCompanies = (numOfChar) => {
  const options = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const allPossibilities = [];
  const roundChoice = (round, charNumber) => {
    for (let i = 0; i < options.length; i++) {
      round += options[i];
      if (charNumber === numOfChar) {
        const ticker = round;
        allPossibilities.push(ticker);
      } else {
        roundChoice(round, charNumber + 1);
      }
      round = round.slice(0, -1);
    }
  };
  roundChoice('', 1);
  return allPossibilities;
};

const tickers = createCompanies(5);

const createMockDataCSV = async () => {
  for (let i = 0; i < 1000; i++) {
    if (i === 0) {
      file.write('ask_price, ask_size, bid_price, bid_size, last_extended_hours_trade_price, last_trade_price, symbol, quantity\n');
    } else if (!file.write(`${faker.finance.amount()},${faker.random.number()},${faker.finance.amount()},${faker.random.number()},${faker.finance.amount()},${faker.finance.amount()},${tickers[i]}, ${faker.finance.amount()}\n`)) {
        await new Promise(resolve => file.once('drain', resolve));
    }
  }
};

createMockDataCSV();

exports.module = tickers;
