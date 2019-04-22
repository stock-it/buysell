const promise = require('bluebird');
const createJoin = require('./jointable.js');
const options = {
  promiseLib: promise
};
const pgp = require('pg-promise')(options);
const cn = 'postgres://localhost:5432/suggested';
const db = pgp(cn);
const faker = require('faker');
const numRests = 10000000;