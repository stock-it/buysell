const Sequelize = require('sequelize');
const { POSTGRES_USER, POSTGRES_PASSWORD } = require('../config.js');

const sequelize = new Sequelize('stocks', POSTGRES_USER, POSTGRES_PASSWORD, {
  host: 'localhost',
  port: '5432',
  dialect: 'postgres'
});
class Stock extends Sequelize.Model {}
Stock.init({
    id: {type: Sequelize.INTEGER, primaryKey: true },
    ask_price: {
      type: Sequelize.DECIMAL(12, 6),
      allowNull: false,
    },
    ask_size: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    bid_price: {
      type: Sequelize.DECIMAL(12, 6),
      allowNull: false,
    },
    bid_size: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    last_extended_hours_trade_price: {
      type: Sequelize.DECIMAL(12, 6),
      allowNull: false,
    },
    last_trade_price: {
      type: Sequelize.DECIMAL(12, 6),
      allowNull: false,
    },
    symbol: {
      type: Sequelize.STRING(5),
      primaryKey: true,
      unique: true,
    },
    quantity: {
      type: Sequelize.DECIMAL(14, 4),
      allowNull: false,
    },
});

const dataPath = '/Users/MyFolder/SDC/buysell/fakeData.csv';

sequelize.sync({ force: true })
  .then(() => sequelize.query(`COPY stocks FROM '${dataPath}' DELIMITER('|') CSV HEADER;`)
    .then(() => console.log('done'))
      .catch((error) => console.error('Something went wrong:,', error))
  );

//   sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connected to Postgres through Sequelize')
//   })
//   .catch(err => {
//     console.log(err);
//   });