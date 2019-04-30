const Router = require('express-promise-router');
const db = require('../../database');
const router = new Router();

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
