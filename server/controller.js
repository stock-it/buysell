// src/usingDB/models/index.js
let Pool = require('pg-pool');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

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


// module.exports.getAccountInfo = accountID => requestAccount(accountID);

// const controller = {
//   async getOne(req, res) {
//     const text = 'SELECT * FROM stocks WHERE ticker = $1 ';
//     try {
//       const { rows } = await db.query(text, [req.params.id]);
//       if (!rows[0]) {
//         return res.status(404).send({ message: 'reflection not found' });
//       }
//       return res.status(200).send(rows[0]);
//     } catch (error) {
//       return res.status(400).send(error);
//     }
//   },
// };

// module.exports = controller;


// This module is being mocked in __mocks__/request.js
const Stock = require('../database-postgres/Stocks.js');
const Account = require('../database-mysqldb/Accounts.js');

module.exports.requestStock = stockSymbol => Stock.findOne({ where: { symbol: stockSymbol } });

// eslint-disable-next-line max-len
module.exports.requestAccount = accountID => Account.findOne({ where: { account_number: accountID } });