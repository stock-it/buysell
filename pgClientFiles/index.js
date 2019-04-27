const Pool = require('pg-pool');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});
/**
 * Create Tables
 */
const createStockTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS 
       stocks (
        id SERIAL PRIMARY KEY, 
        ask_price DECIMAL NOT NULL,
        ask_size DECIMAL NOT NULL, 
        bid_price DECIMAL NOT NULL,
        bid_size FLOAT NOT NULL, 
        last_extended_hours_trade_price DECIMAL NOT NULL ,
        last_trade_price DECIMAL NOT NULL, 
        symbol VARCHAR(5) NOT NULL, 
        quantity DECIMAL NOT NULL 
      )`;
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}; 

const createAccountTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS 
       accounts (
        id SERIAL PRIMARY KEY,
        type VARCHARS(8) NOT NULL,
        buying_power DECIMAL NOT NULL,
        option_level INT NOT NULL, 
        watchlist VARCHARS(20),
      )`;
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}
/**
 * Drop Tables
 */
const dropStockTable = () => {
  const queryText = 'DROP TABLE IF EXISTS stocks';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const dropAccountTable = () => {
  const queryText = 'DROP TABLE IF EXISTS accounts';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createStockTable,
  createAccountTable,
  dropStockTable, 
  dropAccountTable,
};

// run module.exports files in Node
require('make-runnable');
