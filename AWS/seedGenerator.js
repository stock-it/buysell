var faker = require("faker");
var fs = require('fs');

// var one_million = 1;
var one_million = 1000;
var start = 1;
var stop = one_million;

const companies = new Set();
const tickerChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// const numToseed = 100000;
// let counter = 1;

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


for (var i = 1; i <= 10; i++){
  writeVideoInfoData(start, stop);
  function writeVideoInfoData(start, stop){
    var header =   'id|ask_price|ask_size|bid_price|bid_size|last_extended_hours_trade_price|last_trade_price|symbol|quantity|\n'
    var data = header;
    for (var j = start; j <= stop; j++){
      if (j % 100000 === 0) { console.log('j: ', j) }
      var id = j;
      var ask_price = faker.finance.amount(100, 1500, 6);
      var ask_size = faker.random.number({ min: 100, max: 500 });
      var bid_price = faker.finance.amount(100, 2000, 6);
      var bid_size = faker.random.number({ min: 100, max: 500 });
      var last_extended_hours_trade_price = faker.finance.amount(100, 2000, 6);
      var last_trade_price = faker.finance.amount(100, 2000, 6);
      var symbol = mapTicker();
      var quantity = faker.finance.amount(1, 500, 4);
      var csvString = `${id}|${ask_price}|${ask_size}|${bid_price}|${bid_size}|${last_extended_hours_trade_price}|${last_trade_price}|${symbol}|${quantity}|\n`;
      data += csvString;
    }
    console.log(`now writing file ${i}`)
    // fs.writeFileSync(`./data${i}.csv`, data);
    fs.writeFileSync(`data.csv`, data);
    console.log(`done writing file ${i}, ${stop - start} lines`)
  }
  start += one_million;
  stop += one_million;
};