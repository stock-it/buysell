// const Sequelize = require('sequelize');

// const db = new Sequelize('test', 'MyFolder', '', { // <- make sure to change password and input from a config file
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

const { Pool } = require('pg');

const { PGHOST, PGUSER, POOLSIZE, PGDATABASE } = process.env;

const db = new Pool({
  host: PGHOST || 'localhost',
  user: PGUSER || 'MyFolder',
  database: PGDATABASE || 'test',
  port: 5432,
  max: POOLSIZE || 10,
});

(async function() {
  const client = await db.connect()
  await client.query('SELECT NOW()')
  client.release()
})()

module.exports = {
  query: (text, params, callback) => {
    return db.query(text, params, callback)
  }
}