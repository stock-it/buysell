const { requestAccount, requestStock } = require('./request');

module.exports.getAccountInfo = accountID => requestAccount(accountID);

module.exports.getStockInfo = stockSymbol => requestStock(stockSymbol);

// // src/usingDB/models/index.js
// var Pool = require('pg-pool');
// const dotenv = require('dotenv');
// const pg = require('pg');
// let copyFrom = require('pg-copy-streams').from;

// dotenv.config();
// const connectionString = process.env.DATABASE_URL
// const client = new pg.Client(connectionString);
// client.connect(() => console.log('Connected to postgres!'));

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL
// });
// export default {
//   query(text, params){
//     return new Promise((resolve, reject) => {
//       pool.query(text, params)
//       .then((res) => {
//         resolve(res);
//       })
//       .catch((err) => {
//         reject(err);
//       })
//     })
//   }
// }
// export default {
//     client.query(`SELECT * FROM stocks WHERE id = ${id}`, (err, results) => {
//         err ? callback(err) : callback(results);
//     })
// }





// const { requestAccount, requestStock } = require('./request');

// module.exports.getAccountInfo = accountID => requestAccount(accountID);

// module.exports.getStockInfo = stockSymbol => requestStock(stockSymbol);


