const csv = require('fast-csv');
const fs = require('fs');
const psql = require('./database-postgres/pgIndex.js');
let copyFrom = require('pg-copy-streams').from;

// inserts data from CSV file into Postgres stocks table
console.log('Inserting......please wait.....');
console.time('finished seeding Postgres with 10 Million Records');
let stream = psql.client.query(copyFrom('COPY stocks(ask_price,ask_size,bid_price,bid_size,last_extended_hours_trade_price,last_trade_price,symbol,quantity) FROM STDIN WITH CSV HEADER'));
let fileStream = fs.createReadStream('test.csv');
fileStream.pipe(stream);
fileStream.on('end', () => console.timeEnd('finished seeding Postgres with 10 Million Records'));



// // CREATE TABLE myschema.stocks (
//     CREATE TABLE stocks (
//     id SERIAL PRIMARY KEY, 
//     ask_price DECIMAL NOT NULL,
//     ask_size DECIMAL NOT NULL, 
//     bid_price DECIMAL NOT NULL,
//     bid_size FLOAT NOT NULL, 
//     last_extended_hours_trade_price DECIMAL NOT NULL ,
//     last_trade_price DECIMAL NOT NULL, 
//     symbol VARCHAR(5) NOT NULL, 
//     quantity DECIMAL NOT NULL 
// );

// INSERT INTO stocks(ask_size,ask_size,bid_price,bid_size,last_extended_hours_trade_price,last_trade_price,symbol,quantity) 