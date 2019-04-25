var fs = require('fs');
var pg = require('pg');
var copyFrom = require('pg-copy-streams').from;
const connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/democloud"

const client = new pg.Client(connectionString);
//connect
client.connect();

//get all data based on id
const getData = (id,callback) => {
 client.query(`SELECT * FROM Songsinfos WHERE id = ${id}`, (err, results) => {
 	err ? callback(err) : callback(results);
 })
}

module.exports = { client, getData }
