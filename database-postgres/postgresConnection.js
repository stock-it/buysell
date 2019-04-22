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
