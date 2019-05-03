/* eslint-disable no-console */
require('newrelic');
const express = require('express');
const { join } = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const Routes = require('./routes');
const morgan = require('morgan');
const db = require('../database');
const app = express();


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(compression());
app.use(cors());
app.use(morgan('dev'));

// app.use('/loaderio-89cd53c52fc0a961ea0df9d2345607317.txt', (req, res) => {
//   res.send('loaderio-89cd38c52fc0a961ea2ds9d910607317');
// });



Routes(app);
app.use(express.static(join(__dirname, '/../dist')));

app.use('/stocks/:stockId', express.static(join(__dirname, '/../dist')));
// app.use('/:stockId', express.static('/dist'));


////// redis cache 

const cache = (req, res, next) => {
  const key = req.params.nameOrId;
  client.get(key, (err, data) => {
    if (err) {
      console.log (err);
      next();
    }
    if (data && data!=null) {
      res.send(JSON.parse(data));
    } else {
      next();
    }
  });
};

// app.get('/api/stocks/:stockId', cache);


app.get('/api/accounts/:account_number', async (req, res) => {
  const accountQuery = `SELECT * from account_info WHERE account_number = $1`;
  const { rows } = await db.query(accountQuery, [req.params.account_number]);
  res.send(rows[0]);
});


// app.use(bodyParser.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.listen(5000, function(){
  console.log('Express listening on port', this.address().port);
});
