
const faker = require('faker');
const fs = require('fs');
const file = fs.createWriteStream('./data.csv');

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
  for (let i = 0; i < 1000000; i++) {
    if (i === 0) {
      file.write('id, ask_price, ask_size, bid_price, bid_size, last_extended_hours_trade_price, last_trade_price, symbol, quantity\n');
    } else if (!file.write(`${i},${faker.finance.amount(100, 1500, 6)}, ${faker.random.number({ min: 100, max: 500 })}, ${faker.finance.amount(100, 2000, 6)}, ${faker.random.number({ min: 100, max: 500 })},${faker.finance.amount(100, 2000, 6)},${faker.finance.amount(100, 2000, 6)}, ${tickers[i]},${faker.finance.amount(1, 500, 4)}\n`)) {
        await new Promise(resolve => file.once('drain', resolve)); 
    }
  }
};

createMockDataCSV();

exports.module = tickers;

