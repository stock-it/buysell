const Router = require('express-promise-router');
const db = require('../../database');
const router = new Router();
const redis = require('redis');

const client = redis.createClient();

// app.get('/:account_number', async (req, res) => {
//     const accountQuery = `SELECT * from account_info WHERE account_number = $1`;
//     const { rows } = await db.query(accountQuery, [req.params.account_number]);
//     res.send(rows[0]);
//   });

// To get the account information of the only user - currently only a single profile is loaded into DB for testing
router.get('/:account_number', async (req, res) => {
    const accountQuery = `SELECT * from account_info WHERE account_number = $1`;
    const { rows } = await db.query(accountQuery, [req.params.account_number]);
    res.send(rows[0]);
});


app.get('/api/accounts/:account_number', (req, res) => {
    db.query(`SELECT * FROM accounts WHERE account_number = '${req.params.account_number}'`)
      .then((account) => {
        res.status(200);
        res.send(account[0][0]);
      })
      .catch(err => res.status(404).end(err));
  });
  
  app.put('/api/accounts/:account_number', (req, res) => {
    const accountID = req.params.account_number;
    const ticker = req.body;
    db.query(`INSERT into accounts (watchlist) VALUES (${ticker}) WHERE account_number = ${accountID}`)
      .then(() => res.status(200).end())
      .catch(err => res.status(418).end(err));
  });
  
  app.delete('/api/accounts/:account_number', async (req, res) => {
    const accountID = req.params.accountNumber;
    const { ticker } = req.body;
    const user = await Account.findOne({ where: { account_number: accountID } });
    let watchlist = user[0].watchlist.split(' ');
    watchlist = watchlist.splice(watchlist.indexOf(ticker), 1);
    db.query(`INSERT into accounts (watchlist) VALUES (${watchlist}) WHERE account_number = ${accountID}`)
      .then(() => res.status(200).end())
      .catch(err => res.status(418).end(err));
  });