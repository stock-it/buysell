const db = require('./index.js');
const Stock = require('./Stocks.js');
const Account = require('./Accounts.js');

const sampleStockData = [{
  ask_price: '189.190000',
  ask_size: 100,
  bid_price: '189.170000',
  bid_size: 100,
  last_extended_hours_trade_price: '189.160000',
  last_trade_price: '189.160000',
  symbol: 'AAPL',
  quantity: '133.0000',
},
{
  ask_price: '4.330000',
  ask_size: 1400,
  bid_price: '4.310000',
  bid_size: 2600,
  last_extended_hours_trade_price: '4.320000',
  last_trade_price: '4.320000',
  symbol: 'ABEV',
  quantity: '123.0000',
},
{
  ask_price: '39.520000',
  ask_size: 100,
  bid_price: '37.610000',
  bid_size: 100,
  last_extended_hours_trade_price: '39.510000',
  last_trade_price: '39.510000',
  symbol: 'AMAT',
  quantity: '0.0000',
},
{
  ask_price: '25.350000',
  ask_size: 100,
  bid_price: '25.280000',
  bid_size: 100,
  last_extended_hours_trade_price: '25.330000',
  last_trade_price: '25.330000',
  symbol: 'AMD',
  quantity: '14.0000',

},
{
  ask_price: '45.310000',
  ask_size: 200,
  bid_price: '45.280000',
  bid_size: 100,
  last_extended_hours_trade_price: '45.280000',
  last_trade_price: '45.280000',
  symbol: 'APC',
  quantity: '0.0000',
 
},
{
  ask_price: '45.170000',
  ask_size: 100,
  bid_price: '45.000000',
  bid_size: 100,
  last_extended_hours_trade_price: '45.165000',
  last_trade_price: '45.165000',
  symbol: 'ATVI',
  quantity: '179.0000',
  
},
{
  ask_price: '380.800000',
  ask_size: 100,
  bid_price: '330.000000',
  bid_size: 500,
  last_extended_hours_trade_price: '380.745000',
  last_trade_price: '380.745000',
  symbol: 'BA',
  quantity: '0.0000',

},
{
  ask_price: '181.900000',
  ask_size: 100,
  bid_price: '181.470000',
  bid_size: 100,
  last_extended_hours_trade_price: '181.550000',
  last_trade_price: '181.550000',
  symbol: 'BABA',
  quantity: '0.0000',

},
{
  ask_price: '27.400000',
  ask_size: 400,
  bid_price: '27.380000',
  bid_size: 100,
  last_extended_hours_trade_price: '27.385000',
  last_trade_price: '27.385000',
  symbol: 'BAC',
  quantity: '0.0000',

},
{
  ask_price: '64.350000',
  ask_size: 100,
  bid_price: '10.840000',
  bid_size: 200,
  last_extended_hours_trade_price: '10.860000',
  last_trade_price: '10.860000',
  symbol: 'BBD',
  quantity: '128.0000',

},
{
  ask_price: '46.410000',
  ask_size: 100,
  bid_price: '46.390000',
  bid_size: 100,
  last_extended_hours_trade_price: '46.400000',
  last_trade_price: '46.400000',
  symbol: 'BBT',
  quantity: '0.0000',

},
{
  ask_price: '5.730000',
  ask_size: 1500,
  bid_price: '5.710000',
  bid_size: 600,
  last_extended_hours_trade_price: '5.715000',
  last_trade_price: '5.715000',
  symbol: 'BBVA',
  quantity: '0.0000',

},
{
  ask_price: '239.470000',
  ask_size: 100,
  bid_price: '236.490000',
  bid_size: 100,
  last_extended_hours_trade_price: '236.620000',
  last_trade_price: '236.620000',
  symbol: 'BIIB',
  quantity: '0.0000',

},
{
  ask_price: '47.300000',
  ask_size: 100,
  bid_price: '47.250000',
  bid_size: 100,
  last_extended_hours_trade_price: '47.260000',
  last_trade_price: '47.260000',
  symbol: 'BMY',
  quantity: '71.0000',

},
// {
//   ask_price: '38.360000',
//   ask_size: 100,
//   bid_price: '37.920000',
//   bid_size: 2600,
//   last_extended_hours_trade_price: '38.350000',
//   last_trade_price: '38.350000',
//   symbol: 'BSX',
//   quantity: '179.0000',
// },
// {
//   ask_price: '62.100000',
//   ask_size: 200,
//   bid_price: '64.230000',
//   bid_size: 100,
//   last_extended_hours_trade_price: '62.090000',
//   last_trade_price: '62.090000',
//   symbol: 'C',
//   quantity: '0.0000',
// },
// {
//   ask_price: '47.660000',
//   ask_size: 200,
//   bid_price: '47.640000',
//   bid_size: 100,
//   last_extended_hours_trade_price: '47.620000',
//   last_trade_price: '47.620000',
//   symbol: 'CBS',
//   quantity: '102.0000',
// },
];


const insertSampleStockData = () => {
  sampleStockData.map(stockData => (
    Stock.create({
      ask_price: stockData.ask_price,
      ask_size: stockData.ask_size,
      bid_price: stockData.bid_price,
      bid_size: stockData.bid_size,
      last_extended_hours_trade_price: stockData.last_extended_hours_trade_price,
      last_trade_price: stockData.last_trade_price,
      symbol: stockData.symbol,
      quantity: stockData.quantity,
    })
  ));
};

const sampleAccount = {
  account_number: '2QW30682',
  buying_power: '486422.2050',
  option_level: 3,
  watchlist: 'FB,TSLA,SQ,AAPL,MSFT,BABA,V,JPM,BAC',
};

const insertSampleAccount = () => {
  Account.create(sampleAccount);
};

db.sync({ force: true })
  .then(() => insertSampleAccount())
  .then(() => insertSampleStockData())
  .then(() => console.log('Database and table created!'));