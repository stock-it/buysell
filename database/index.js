const { Pool } = require('pg');

const { PGHOST, PGUSER, POOLSIZE, PGDATABASE } = process.env;

const db = new Pool({
  host: PGHOST || 'localhost',
  user: PGUSER || 'MyFolder',
  database: PGDATABASE || 'sdc',
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