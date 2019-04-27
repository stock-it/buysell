const Sequelize = require('sequelize');

const db = new Sequelize('sdc', 'MyFolder', '', {
  host: 'localhost',
  dialect: 'postgres',
});


db
  .authenticate()
  .then(() => console.log('Successfully connected to PostgreSQL through Sequelize!'))
  .catch(err => console.error('Something went wroong. Connection to PostgreSQL failed: ', err));


module.exports = db;
