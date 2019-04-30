const stocks = require('./stockInfo');
// const accounts = require('./accountInfo');
module.exports = app => {
  app.use('/api/stocks', stocks);
  // app.use('/api/accounts', accounts);
}