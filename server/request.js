// This module is being mocked in __mocks__/request.js
const Stock = require('../database-postgres/Stocks');
const Account = require('../database-postgres/Accounts.js');

module.exports.requestStock = stockSymbol => Stock.findOne({ where: { symbol: stockSymbol } });

// eslint-disable-next-line max-len
module.exports.requestAccount = accountID => Account.findOne({ where: { account_number: accountID } });


module.exports.updateAccount = accountID => Account.update(
  {
    account_number: accountID,
  },
  { where: { account_number: '2QW30682' } },
).then((count) => {
  console.log(`Rows updated ${ count }`);
});
