const { Pool } = require('pg');

const { PGHOST, PGUSER, POOLSIZE, PGDATABASE } = process.env;

const db = new Pool({
  host: PGHOST || '172.31.83.26',
  user: PGUSER || 'postgres', // MyFolder
  database: PGDATABASE || 'test',
  port: 5432,
  password: '',
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

