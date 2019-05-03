const stocks = require('./stockInfo');
const db = require('../redisConnection')
// const accounts = require('./accountInfo');
module.exports = app => {
  app.use('/api/stocks', stocks);
  // app.use('/api/stocks/:query', db.getCache);
  // app.use('/api/accounts', accounts);
}

