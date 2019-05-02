const redis = require('redis');
require('dotenv').config();

const REDIS_URL = process.env.REDIS_URL;
const REDIS_PORT = process.env.REDIS_PORT;
const client = redis.createClient(REDIS_PORT, REDIS_URL);

client.on('connect', () => {
  console.log('connected to redis');
});
client.on('error', (err) => {
  console.log(`THE Error: ${err}`);
});

module.exports = client;
