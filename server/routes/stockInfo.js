/* eslint-disable linebreak-style */
const Router = require('express-promise-router');
const db = require('../../database');
const router = new Router();
// const pg = require('pg');
// const config = require('../configDB.js');      
// const client = new pg.Client(config);
router.get('/:stockId', async (req, res) => {
  const stockQuery = `SELECT * from stock_info WHERE symbol = $1`;
  const { rows } = await db.query(stockQuery, [req.params.stockId]);
  res.send(rows[0]);
});

// testing route
router.get('/:id', async (req, res) => {
  const stockQuery = `SELECT * from stock_info WHERE id = $1`;
  const { rows } = await db.query(stockQuery, [req.params.stockId]);
  res.send(rows[0]);
});

router.post('/', async (req, res) => {
  const {
    id,  
    ask_price,
    ask_size, 
    bid_price,
    bid_size, 
    last_extended_hours_trade_price,
    last_trade_price,
    symbol,
    quantity
  } = req.body;
  const text = 'INSERT INTO stock_info (ask_price, ask_size, bid_price, bid_size, last_extended_hours_trade_price, last_trade_price, symbol, quantity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
  const { response } = await db.query(text, [
    id,
    ask_price,
    ask_size, 
    bid_price,
    bid_size, 
    last_extended_hours_trade_price,
    last_trade_price,
    symbol,
    quantity
  ]);
  res.send(response[0]);
});

router.put('/:stockId', async (req, res) => {
  const { stockId } = req.params;
  const { 
    id, 
    ask_price,
    ask_size, 
    bid_price,
    bid_size, 
    last_extended_hours_trade_price,
    last_trade_price,
    symbol,
    quantity
  } = req.body;
  const text = 'UPDATE stock_info SET (ask_price, ask_size, bid_price, bid_size, last_extended_hours_trade_price, last_trade_price, symbol, quantity) WHERE symbol = $8';
  const { response } = await db.query(text, [
    id,
    ask_price,
    ask_size, 
    bid_price,
    bid_size, 
    last_extended_hours_trade_price,
    last_trade_price,
    symbol,
    quantity
  ]);
  res.send(response[0]);
});

router.delete('/:stockId', async (req, res) => {
  const { stockId } = req.params;
  const text = `DELETE stock_info WHERE symbol = $1`;
  const { response } = await db.query(text, [stockId]);
  res.send(response[0]);
});

module.exports = router;

