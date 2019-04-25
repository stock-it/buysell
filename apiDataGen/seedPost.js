const csv = require('fast-csv');
const fs = require('fs');
const psql = require('./database-postgres/pgIndex ');
let copyFrom = require('pg-copy-streams').from;

// inserts data from CSV file into Postgres stocks table
console.log('Inserting......please wait.....');
console.time('finished seeding Postgres with 10 Million Records');
let stream = psql.client.query(copyFrom('COPY stocks(ask_price,ask_size,bid_price,bid_size,last_extended_hours_trade_price,last_trade_price,symbol,quantity) FROM STDIN WITH CSV HEADER'));
let fileStream = fs.createReadStream('seedPG.csv');
fileStream.pipe(stream);
fileStream.on('end', () => console.timeEnd('finished seeding Postgres with 10 Million Records'));


// COPY stocks(ask_price,ask_size,bid_price,bid_size,last_extended_hours_trade_price,last_trade_price,symbol,quantity)
// FROM '/Users/MyFolder/SDC/buysell/seedPG.csv' DELIMITER ',' CSV HEADER;
