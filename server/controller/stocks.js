const db = require('../../database');
// const client = require('./redisConnection');

exports.getStockInfo = (req, res) => {
  const ticker = req.params.stockId;
  console.log('reached');
  db.query(`SELECT * FROM stocks WHERE ticker='${ticker}';`, '', (error, data) => {
    if (error) {
      throw error;
    }
    res.send(JSON.stringify(data.rows[0]));
  })
}

exports.getCache = (req, res) => {
  let query = req.params.query;
  client.get(query, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      getStockInfo(req, res);
    }
  })
}



exports.createStock = (req, res) => {
  const payload = req.body;

  db.query(`INSERT INTO stocks VALUES (ticker, currentprice) (${payload.ticker}, ${payload.currentprice});`, '', (error, result))
  
  console.log(payload);
  res.status(200).json(stockId);
}
