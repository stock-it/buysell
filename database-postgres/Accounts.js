const Sequelize = require('sequelize');

const db = new Sequelize('Account', 'MyFolder', '', { // <- make sure to change password and input from a config file
  host: 'localhost', // <- update host
  dialect: 'postgres',
  port: 5432,
  define: {
    timestamps: false,
  },
});

const Account = db.define('account', {
  account_number: {
    type: Sequelize.STRING(8),
    primaryKey: true,
    unique: true,
    allowNull: true,
  },
  buying_power: Sequelize.DECIMAL(14, 4),
  option_level: Sequelize.INTEGER,
  watchlist: Sequelize.STRING,
}, {
  timestamps: false,
});

module.exports = Account;
