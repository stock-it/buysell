const promise = require('bluebird');
const pg = require('pg');
const conString = 'postgress://me:password@localhost:5432/stocks';
const options = {
  promiseLib: promise
}; 
const pgp = require('pg-promise')(options);
const db = pgp(conString);

const database = new pg.Client(conString);


database.connect(() => {
  console.log('Connected to Postgres!!!');
});



// const cn = 'postgres://localhost:5432';
// const db  = pgp(cn);

// const search = id => {
//   return db.query(` `);
// }

// search();

// module.exports.search = search;


// const Sequelize = require('sequelize');

// const db = new Sequelize('stocks', 'root', '', { // <- make sure to change password and input from a config file
//   host: '172.17.0.3', // <- update host
//   dialect: 'mysql',
// });

// db
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

// module.exports = db;
