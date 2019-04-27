// This module is being mocked in __mocks__/request.js
const Stock = require('../../database-postgres/Stocks');
const Account = require('../../database-postgres/Accounts.js');
// const { requestAccount, requestStock, updateAccount } = require('./request');

module.exports.getAccountInfo = (accountID) => {
  Account.findOne({ where: { account_number: accountID } });
};

module.exports.updateAccount = accountID => Account.update(
  { account_number: accountID },
  { where: { account_number: '2QW30682' } },
).then((count) => {
  console.log(`Rows updated ${count}`);
}).catch(err => console.error('Something went wrong:', err));

module.exports.deleteAccount = accountID => Account.delete(
  { account_number: accountID },
  { where: { account_number: '2QW30682' } },
).then((count) => {
  console.log(`Account Deleted. Rows updated ${count}`);
}).catch(err => console.error('Something went wrong:', err));

module.exports.getStockInfo = (stockSymbol) => {
  Stock.findOne({ where: { symbol: stockSymbol } });
};

module.exports.updateStockInfo = (stockSymbol, newPrice) => Stock.update(
    { price: newPrice },
    { where: { stockSymbol: $1 } },
  ).then((count) => {
    console.log(`Rows updated ${count}`);
  }).catch(err => console.error('Something went wrong:', err));
