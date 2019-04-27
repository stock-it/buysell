const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const fs = require('fs');
// const controller = require('./controller');
const morgan = require('morgan');
const cors = require('cors');
const stockRoutes = require('./routes/index.js');
const pg = require('pg');

app.use(cors());
app.use(morgan('dev'));

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

app.use('/api', stockRoutes)

// app.listen(3000, () => console.log('BuySell server listening on port 3000!\n'));

module.exports = app