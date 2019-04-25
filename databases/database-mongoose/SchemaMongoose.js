const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const db = require('../index.js');
const AutoIncrement = require('mongoose-sequence')(mongoose);

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

const Stock = mongoose.model('Stock', stockSchema);

// add auto-incrementing id to imporve querying times
stockSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = Stock;
