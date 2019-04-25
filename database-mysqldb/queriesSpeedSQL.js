const psql = require('./index.js')

//******PSQL QUERIES *********

console.time('time')
 psql.client.query(`SELECT * FROM Stocks WHERE id = 1`, (err, results) => {
 	err ? console.log(err) : console.log(results.rows);console.timeEnd('time')
 });
// {
//   ask_price: '189.190000',
//   ask_size: 100,
//   bid_price: '189.170000',
//   bid_size: 100,
//   last_extended_hours_trade_price: '189.160000',
//   last_trade_price: '189.160000',
//   symbol: 'AAPL',
//   quantity: '133.0000',
//   createdAt: '2019-03-29T17:37:11.000Z',
//   updatedAt: '2019-03-29T17:37:11.000Z',
// }

console.time('time')
 psql.client.query(`SELECT * FROM Stocks WHERE id = 100000`, (err, results) => {
 	err ? console.log(err) : console.log(results.rows);console.timeEnd('time')
 });

console.time('time')
 psql.client.query(`SELECT * FROM Stocks WHERE id = 10000000`, (err, results) => {
 	err ? console.log(err) : console.log(results.rows);console.timeEnd('time')
 });