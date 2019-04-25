const mongoose = require('mongoose');

const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/stocks2';

mongoose.connect(dbUri);
const db = mongoose.connection;

db.on('error', (error) => {
  console.log('there was an error with the database: ', error);
});

db.once('open', (status) => {
  console.log('db is working!');
});

module.exports = db;
