const csv = require('fast-csv');
const fs = require('fs');
// const psql = require('./database-postgres/pgIndex.js');
const pg = require('pg');
let copyFrom = require('pg-copy-streams').from;

const connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/stocks"
const client = new pg.Client(connectionString);
client.connect(() => console.log('Connected to postgres!'));

// inserts data from CSV file into Postgres stocks table
console.log('Inserting......please wait.....');
console.time('finished seeding Postgres with 10 Million Records');
let stream = client.query(copyFrom('COPY sdc(ask_price,ask_size,bid_price,bid_size,last_extended_hours_trade_price,last_trade_price,symbol,quantity) FROM STDIN WITH CSV HEADER'));
let fileStream = fs.createReadStream('10Million.csv');
fileStream.pipe(stream);
fileStream.on('end', () => console.timeEnd('finished seeding Postgres with 10 Million Records'));
