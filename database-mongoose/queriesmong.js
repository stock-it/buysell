// const db = require('./index.js');

const mongoose = require('mongoose');
mongoose.set('debug', true);

// const csv = require('fast-csv');
// const fs = require('fs');
// mongoose.Promise = global.promise;

mongoose.connect('mongodb://localhost/stocks', { useNewUrlParser: true });


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to Mongoose DB. The collection name is: stocks');
});

//Our simple module only makes a get request to get all data with the specifc ID.

//****MONGOOSE QUERIES*******

db.stocks.find({"id": 10000}, (err, docu) => {
		err ? console.log(err) : console.log(docu); 
});


//GET ID 1
// console.time('time')
// db.collection('stocks').findOne({_id: '10000'}, (err, docu) => {
// 	err ? console.log(err) : console.log(docu);console.timeEnd('time')
// });

// //GET 100k
// console.time('time')
// db.collection('stocks').findOne({_id: '100000'}, (err, docu) => {
// 	err ? console.log(err) : console.log(docu); console.timeEnd('time')
// });


// console.time('time')
// db.collection('stocks').findOne({}, (err, docu) => {
// 	err ? console.log(err) : console.log(docu);console.timeEnd('time')
// });

// console.time('time')
// db.Stock.find({}, (err, docu) => {
// 	err ? console.log(err) : console.log(docu);console.timeEnd('time')
// });

// console.time('time')
// db.Stock.find({symbol: "ZZZZZ"}, (err, docu) => {
// 	err ? console.log(err) : console.log(docu.length);console.timeEnd('time')
// });