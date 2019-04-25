const mongoose = require('mongoose');
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/stocks';
mongoose.Promise = global.Promise;

mongoose.connect(dbUri, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (error) => {
  console.log('there was an error with the database: ', error);
})

db.once('open', (status) => {
  console.log('db is working!');
});

// const stockInfoSchema = new mongoose.Schema({
//   counter: Number,
//   ask_price: Number,
//   ask_size: Number,
//   bid_price: Number,
//   bid_size: Number,
//   last_extended_hours_trade_price: Number,
//   last_trade_price: Number,
//   symbol: String,
//   quantity: Number,
// });

// add createdAt and updateAt timestamps
// stockInfoSchema.set('timestamps', true);

// const Stocks = mongoose.model('Stocks', stockInfoSchema);

// // add auto-incrementing id to imporve querying times
// stockInfoSchema.plugin(AutoIncrement, { inc_field: 'counter' });

// module.exports = { Stocks, db, mongoose }

module.exports = db;