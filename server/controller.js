// src/usingDB/models/index.js
var Pool = require('pg-pool');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export default {
  query(text, params){
    return new Promise((resolve, reject) => {
      pool.query(text, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      })
    })
  }
}




// const { requestAccount, requestStock } = require('./request');

// module.exports.getAccountInfo = accountID => requestAccount(accountID);

// module.exports.getStockInfo = stockSymbol => requestStock(stockSymbol);


