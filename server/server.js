/* eslint-disable no-trailing-spaces */
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const fs = require('fs');
const controller = require('./controller');
const cors = require('cors');

// const router = express.Router();
const pg = require('pg');


const app = express();
app.use(cors());
app.use(function timeLog(req, res, next) {
  console.log('Request made at: ', Date.now());
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT DELETE');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});


app.get('*.js', (request, response, next) => {
  if (fs.existsSync(`${request.url}.br`)) {
    request.url += '.br';
    response.set('Content-Encoding', 'br');
  } else if (fs.existsSync(`${request.url}.gz`)) {
    request.url += '.gz';
    response.set('Content-Encoding', 'gzip');
  }
  next();
});

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/stocks/:ticker', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());

app.get('/api/stocks/:ticker', (req, res) => {
  controller.getStockInfo(req.params.ticker)
    .then((stockData) => {
      res.status(200);
      res.send(stockData);
    });
});

app.get('/api/accounts/:account_number', (req, res) => {
  controller.getAccountInfo(req.params.account_number)
    .then((accountData) => {
      res.status(200);
      res.send(accountData);
    }); 
});

app.patch('/api/stocks/:account_number', (req, res) => {
  controller.getAccountInfo(req.params.account_number)
  .then((accountData) => {
    res.status(200);
    res.send(accountData);
  }); 
});

// router.get('/api/stocks/:ticker', (req, res, next) => {
//   pg.connect(process.env.DATABASE_URL, (err, client, done) => {
//     if (err) {
//       return console.error('error fetching client from pool', err);
//     }
//     console.log("connected to database");
//     client.query(`SELECT * FROM stocks WHERE symbol=${req.params.ticker}`, (err, result) => {
//       done();
//       if (err) {
//         return console.error('error running query', err);
//       }
//       res.status(200);
//       res.send(result);
//     });
//   });
// });

// app.get('/api/accounts/:account_number', (req, res) => {
//   controller.getAccountInfo(req.params.account_number)
//     .then((account) => {
//       res.status(200);
//       res.send(account);
//     });
// });

app.listen(3000, () => console.log('BuySell server listening on port 3000!\n'));
