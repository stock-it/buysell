/*
id SERIAL PRIMARY KEY
ask_price INT NOT NULL
ask_size INT NOT NULL
bid_price INT NOT NULL
bid_size INT NOT NULL
last_extended_hours_trade_price INT NOT NULL
last_trade_price INT NOT NULL
symbol VARCHAR(5) NOT NULL
quantity INT NOT NULL
*/
const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const db = require('./index.js');

mongoose.Promise = global.Promise;

const stockSchema = new mongoose.Schema({
  ask_price: Number,
  ask_size: Number,
  bid_price: Number,
  bid_size: Number,
  last_extended_hours_trade_price: Number,
  last_trade_price: Number,
  symbol: String,
  quantity: Number,
});


// add createdAt and updateAt timestamps
stockSchema.set('timestamps', true);


const Stocks = mongoose.model('Stock', stockSchema);
module.exports = Stocks;
