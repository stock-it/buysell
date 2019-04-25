const Sequelize = require('sequelize');
const db = require('./index.js');

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


module.exports = Stocks;
