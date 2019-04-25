const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const db = require('../index.js');

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

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;