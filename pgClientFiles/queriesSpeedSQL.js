const db = require('../database-postgres/index');

//******PSQL QUERIES *********

console.time('time');
 db.query(`SELECT * FROM stocks WHERE id=1`, (err, results) => {
	 err ? console.log(err) : console.log(results.rows);
	 results ? console.log('results') : null;
 });

//  console.time('time');
//  psql.query(`SELECT * FROM Stocks WHERE id = 99999`, (err, results) => {
// 	 err ? console.log(err) : console.log(results.rows);
// 	 results ? console.timeEnd('time') : null;
//  });

//  console.time('time');
//  psql.client.query(`SELECT * FROM Stocks WHERE id = 999999`, (err, results) => {
// 	 err ? console.log(err) : console.log(results.rows);
// 	 results ? console.timeEnd('time') : null;
//  });
// {
//   ask_price: '189.190000',
//   ask_size: 100,
//   bid_price: '189.170000',
//   bid_size: 100,
//   last_extended_hours_trade_price: '189.160000',
//   last_trade_price: '189.160000',
//   symbol: 'AAPL',
//   quantity: '133.0000',
// }
// psql.client.query(`SELECT * FROM Stocks WHERE id = 100000`, (err, results) => {
// 	console.time('time');

// 	 err ? console.log(err) : console.log(results.rows);	 
// 	 results ? console.timeEnd('time') : null;
//  });



//  psql.client.query(`SELECT * FROM Stocks WHERE id = 1000000`, (err, results) => {
// 	console.time('time')
// 	 err ? console.log(err) : console.log(results.rows);
// 	 results ? console.timeEnd('time') : null;
// 	});