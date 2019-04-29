CREATE DATABASE test;
DROP DATABASE IF EXISTS test;
DROP TABLE IF EXISTS stock_info;

\connect test;

 CREATE TABLE IF NOT EXISTS stock_info (
    id SERIAL PRIMARY KEY, 
    ask_price DECIMAL NOT NULL,
    ask_size DECIMAL NOT NULL, 
    bid_price DECIMAL NOT NULL,
    bid_size FLOAT NOT NULL, 
    last_extended_hours_trade_price DECIMAL NOT NULL ,
    last_trade_price DECIMAL NOT NULL, 
    symbol VARCHAR(5) NOT NULL, 
    quantity DECIMAL NOT NULL 
);

COPY stock_info FROM '/Users/MyFolder/SDC/buysell/test.csv' DELIMITER ',' CSV HEADER;

/* eslint-disable no-console */
require('newrelic');
const express = require('express');
const { join } = require('path');
// const bodyParser = require('body-parser');
// const cors = require('cors');
const mountRoutes = require('./routes');




const app = express();
const port = 4000;
mountRoutes(app);

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use('/stocks/:stockId', express.static(join(__dirname, '/../public/dist')));

app.listen(port, () => {
  console.log(`Server is now listening on port: ${port}`)
})