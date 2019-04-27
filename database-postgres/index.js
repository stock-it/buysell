var Pool = require('pg-pool');

// dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://MyFolder@127.0.0.1:5432/stocks'
});

pool.on('connect', () => {
  console.log('connected to the db');
});
/**
 * Create Tables
 */
const createTables = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS 
       stocks (
        id SERIAL PRIMARY KEY, 
        ask_price DECIMAL NOT NULL,
        ask_size DECIMAL NOT NULL, 
        bid_price DECIMAL NOT NULL,
        bid_size FLOAT NOT NULL, 
        last_extended_hours_trade_price DECIMAL NOT NULL ,
        last_trade_price DECIMAL NOT NULL, 
        symbol VARCHAR(5) NOT NULL, 
        quantity DECIMAL NOT NULL 
      )`;



  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS stocks';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables
};

require('make-runnable');



// const Sequelize = require('sequelize');

// const db = new Sequelize('stocks', 'MyFolder', '', { // <- make sure to change password and input from a config file
//   host: 'localhost', // <- update host
//   dialect: 'postgres',
//   port: 5432,
//   define: {
//     timestamps: false,
//   },
// });

// db
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

// // module.exports = db;

// const Stocks = db.define('stocks', {
//   ask_price: {
//     type: Sequelize.DECIMAL(12, 6),
//     allowNull: true,
//   },
//   ask_size: {
//     type: Sequelize.INTEGER,
//     allowNull: true,
//   },
//   bid_price: {
//     type: Sequelize.DECIMAL(12, 6),
//     allowNull: true,
//   },
//   bid_size: {
//     type: Sequelize.INTEGER,
//     allowNull: true,
//   },
//   last_extended_hours_trade_price: {
//     type: Sequelize.DECIMAL(12, 6),
//     allowNull: true,
//   },
//   last_trade_price: {
//     type: Sequelize.DECIMAL(12, 6),
//     allowNull: true,
//   },
//   symbol: {
//     type: Sequelize.STRING(5),
//     primaryKey: true,
//     unique: true,
//   },
//   quantity: {
//     type: Sequelize.DECIMAL(14, 4),
//     allowNull: true,
//   },
// }, {
//   timestamps: false,
// });


// db.sync();

// module.exports = { Stocks, db }