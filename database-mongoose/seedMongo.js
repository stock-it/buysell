const fs = require('fs');
const csv = require('fast-csv');
const mong = require('./index.js');

const authors = [];
let count = 1;

const mongoose = require('mongoose');
// const csv = require('fast-csv');
// const fs = require('fs');


mongoose.connect('mongodb://localhost/testSeed', { useNewUrlParser: true });


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to Mongoose DB. The collection name is: stocks');
});

// run this file using npm run seed

const stream = fs.createReadStream('seedPG.csv');
console.log('Inserting into Mongo.....please wait.....');
console.time('finished seeding');
csv
  .fromStream(stream, { headers: true })
  .on('data', (data) => {
 	     data['_id'] = (count++).toString()

         authors.push(data);
 })
  .on('end', () => {
    	mong.Stocks.insertMany(authors,(err, documents) => {
            err ? console.log('Mongo Insert Malfunctioned', err) : console.timeEnd('finished seeding') //about 235 seconds
         });
 });