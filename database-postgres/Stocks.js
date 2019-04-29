const Sequelize = require('sequelize');
const db = require('./index.js').sequelize;

const { Model } = Sequelize;

class Stock extends Sequelize.Model {}

Stock.create('Stock', {
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

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.'); // eslint-disable-line no-console
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err); // eslint-disable-line no-console
  });

  sequelize.databaseVersion().then((databaseVersion) => {
    console.log(databaseVersion);
} );


module.exports = Stocks