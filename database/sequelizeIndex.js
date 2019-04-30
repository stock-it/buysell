const Sequelize = require('sequelize');

const db = new Sequelize('sdc', 'MyFolder', '', { // <- make sure to change password and input from a config file
  host: '127.0.0.1', // <- update host
  dialect: 'postgres',
});

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;