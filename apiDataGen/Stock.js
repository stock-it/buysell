// DB Setup
var pg = require('pg');
pg.defaults.ssl = true;
const Sequelize = require('sequelize');
const db = require('./database-postgres/pgIndex');
const sequelize = new Sequelize(db);

const Stock = sequelize.define('stock', {
    name: {
      type: Sequelize.STRING
    },
    symbol: {
      type: Sequelize.STRING
    },
    sector: {
      type: Sequelize.STRING
    },
    description: { 
      type: Sequelize.STRING
    },
    exchange: {
      type: Sequelize.STRING
    }
  });

  module.exports = Stock;