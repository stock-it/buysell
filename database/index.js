const { Pool } = require('pg');
require('dotenv').config();

const { PGHOST, PGUSER, POOLSIZE, PGDATABASE, DBPASSWORD } = process.env;

const db = new Pool({
  host: PGHOST || 'ec2-3-90-224-190.compute-1.amazonaws.com',
  user: PGUSER || 'power_user', // MyFolder
  database: PGDATABASE || 'test',
  port: 5432,
  password: DBPASSWORD,
  max: POOLSIZE || 10,
});

(async function() {
  const client = await db.connect();
  await client.query('SELECT NOW()');
  client.release()
})()

module.exports = {
  query: (text, params, callback) => {
    return db.query(text, params, callback)
  }
}