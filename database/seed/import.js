const { Client } = require('pg');
const client = new Client({});

client.connect();
client.query(`
  DROP DATABASE IF EXISTS sdc;
`);
client.query(`CREATE DATABASE IF NOT EXISTS sdc;`);
client.query(`\connect sdc;`);
client.query(`
  DROP TABLE IF EXISTS stock_info;
`);
client.query(`
  DROP TABLE IF EXISTS account_info;
`);

client.query(`
CREATE TABLE IF NOT EXISTS stock_info(
  id SERIAL PRIMARY KEY, 
  ask_price DECIMAL NOT NULL,
  ask_size DECIMAL NOT NULL, 
  bid_price DECIMAL NOT NULL,
  bid_size FLOAT NOT NULL, 
  last_extended_hours_trade_price DECIMAL NOT NULL ,
  last_trade_price DECIMAL NOT NULL, 
  symbol VARCHAR(5) NOT NULL, 
  quantity DECIMAL NOT NULL);`,
);

client.query(`
CREATE TABLE IF NOT EXISTS 
  account_info(
  account_number VARCHAR, 
  buying_power DECIMAL, 
  option_level INT, 
  watchlist VARCHAR
)`,
);




// const createStockTable = () => {
//   const queryText = ` 
//   CREATE TABLE IF NOT EXISTS 
//     account_info(
//     account_number VARCHAR, 
//     buying_power DECIMAL, 
//     option_level INT, 
//     watchlist VARCHAR
//   )`;
//   pool.query(queryText)
//     .then((res) => {
//       console.log(res);
//       pool.end();
//     })
//     .catch((err) => {
//       console.log(err);
//       pool.end();
//     });
// };

// const createAccountTable = () => {
//   const queryText = `
//   CREATE TABLE IF NOT EXISTS 
//        account_info (
//         account_number VARCHAR, 
//         buying_power DECIMAL, 
//         option_level INT, 
//         watchlist VARCHAR
//   )`;
//   pool.query(queryText)
//     .then((res) => {
//       console.log(res);
//       pool.end();
//     })
//     .catch((err) => {
//       console.log(err);
//       pool.end();
//     });
// };
// /**
//  * Drop Tables
//  */
// const dropStockTable = () => {
//   const queryText = 'DROP TABLE IF EXISTS stock_info';
//   pool.query(queryText)
//     .then((res) => {
//       console.log(res);
//       pool.end();
//     })
//     .catch((err) => {
//       console.log(err);
//       pool.end();
//     });
// };

// const dropAccountTable = () => {
//   const queryText = 'DROP TABLE IF EXISTS accounts_info';
//   pool.query(queryText)
//     .then((res) => {
//       console.log(res);
//       pool.end();
//     })
//     .catch((err) => {
//       console.log(err);
//       pool.end();
//     });
// };

// const createDB = () => {
//   const queryText = `
//   DROP DATABASE IF EXISTS sdc; 
//   CREATE DATABASE sdc;
//   `;
//   pool.query(queryText)
//     .then((res) => {
//       console.log(res);
//       pool.end();
//     })
//     .catch((err) => {
//       console.log(err);
//       pool.end();
//     });
// };

// createDB();
// dropAccountTable();
// dropStockTable();
// createAccountTable();
// createStockTable();


// pool.on('remove', () => {
//   console.log('client removed');
//   process.exit(0);
// });
