/* eslint-disable no-console */
require('newrelic');
const express = require('express');
const { join } = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const Routes = require('./routes');
const morgan = require('morgan');
const db = require('../database');
const app = express();
app.use(cors());
app.use(morgan('dev'));

const port = 5000;

Routes(app);
app.use(express.static(join(__dirname, '/../dist')));

app.use('/stocks/:stockId', express.static(join(__dirname, '/../dist')));

app.get('/api/accounts/:account_number', async (req, res) => {
  const accountQuery = `SELECT * from account_info WHERE account_number = $1`;
  const { rows } = await db.query(accountQuery, [req.params.account_number]);
  res.send(rows[0]);
});


// app.use(bodyParser.json());


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
  console.log(`Server is now listening on port: ${port}`)
})