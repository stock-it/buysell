// This module is being mocked in __mocks__/request.js
const Stock = require('../database-postgres/index.js');
const Account = require('../database-postgres/Accounts.js');

module.exports.requestStock = stockSymbol => Stock.findOne({ where: { symbol: stockSymbol } });
// module.exports.requestStock = stockSymbol => Stock.findOne
// eslint-disable-next-line max-len
module.exports.requestAccount = accountID => Account.findOne({ where: { account_number: accountID } });
