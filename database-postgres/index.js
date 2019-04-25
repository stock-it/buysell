const Sequelize = require('sequelize');

const db = new Sequelize('stocks', 'MyFolder', '', { // <- make sure to change password and input from a config file
  host: 'localhost', // <- update host
  dialect: 'postgres',
  port: 5432,
  define: {
    timestamps: false,
  },
});

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// module.exports = db;

const Stocks = db.define('stocks', {
  ask_price: {
    type: Sequelize.DECIMAL(12, 6),
    allowNull: true,
  },
  ask_size: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  bid_price: {
    type: Sequelize.DECIMAL(12, 6),
    allowNull: true,
  },
  bid_size: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  last_extended_hours_trade_price: {
    type: Sequelize.DECIMAL(12, 6),
    allowNull: true,
  },
  last_trade_price: {
    type: Sequelize.DECIMAL(12, 6),
    allowNull: true,
  },
  symbol: {
    type: Sequelize.STRING(5),
    primaryKey: true,
    unique: true,
  },
  quantity: {
    type: Sequelize.DECIMAL(14, 4),
    allowNull: true,
  },
}, {
  timestamps: false,
});


db.sync();

module.exports = { Stocks, db };