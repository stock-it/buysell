// const Sequelize = require('sequelize');

// const db = new Sequelize('stocks', 'root', '', { // <- make sure to change password and input from a config file
//   host: 'localhost', // <- update host
//   dialect: 'postgres',
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

// // ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';

const promise = require('bluebird');
const pg = require('pg');
const conString = 'postgres://me:password@localhost:5432/stocks';
const options = {
  promiseLib: promise
}; 
const pgp = require('pg-promise')(options);
const db = pgp(conString);

const database = new pg.Client(conString);


database.connect(() => {
  console.log('Connected to Postgres!!!');
});
