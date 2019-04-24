const mongoose = require('mongoose');
const csv = require('fast-csv');
const fs = require('fs');


mongoose.connect('mongodb://localhost/testSeed', { useNewUrlParser: true });


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to Mongoose DB. The collection name is: stocks');
});

const stockInfoSchema = new mongoose.Schema({
  ask_price: Number,
  ask_size: Number,
  bid_price: Number,
  bid_size: Number,
  last_extended_hours_trade_price: Number,
  last_trade_price: Number,
  symbol: String,
  quantity: Number,
});

const Stocks = mongoose.model('Stock', stockInfoSchema);


module.exports = { Stocks, db, mongoose };
