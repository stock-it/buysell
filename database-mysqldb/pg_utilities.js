let { Client } = require('pg');
const fs = require('fs');
const exec = require('child_process').exec;
const pgtools = require('pgtools');
const seedUtilities = require('./seedUtilities');
const path = require('path');
const csv = require("fast-csv");
const { performance } = require('perf_hooks');
require('dotenv').config();

let config = {
  host: process.env.HOST,
  port: process.env.DBPORT,
  user: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE
}

let client = new Client(config);
client.connect();

const findByID = (id, callback) => {
  client.query(`SELECT * FROM rooms WHERE id = ${id}`, (err, res) => {
    if (err) {
      return callback(err);
    }
    callback(undefined, [res.rows[0]]);
  });
};

const deleteRecord = (id, callback) => {
  client.query(`DELETE FROM rooms WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('Error during deletion...')
      return callback(err);
    }
    callback(undefined, res);
  });
}

module.exports = {
  findByID,
  deleteRecord
};
