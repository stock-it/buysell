const { Pool } = require('pg');

const client = new Pool({
  host: 'ec2-3-90-224-190.compute-1.amazonaws.com',
  user: 'power_user', // MyFolder
  database: 'test',
  port: 5432,
  password: 'hackerman',
  max: 10,
});

// const dropStockTable = 'DROP TABLE IF EXISTS stock_info';
// const dropAccountTable = 'DROP TABLE IF EXISTS account_info';
// const createStockTable = `CREATE TABLE stock_info (
//     id SERIAL PRIMARY KEY,
//     ask_price DECIMAL NOT NULL,
//     ask_size DECIMAL NOT NULL,
//     bid_price DECIMAL NOT NULL,
//     bid_size FLOAT NOT NULL,
//     last_extended_hours_trade_price DECIMAL NOT NULL ,
//     last_trade_price DECIMAL NOT NULL,
//     symbol VARCHAR(5) NOT NULL,
//     quantity DECIMAL NOT NULL,
// )`;

// const createAccountTable = `CREATE TABLE account_info (
//   id SERIAL PRIMARY KEY,
//   account_number VARCHAR,
//   buying_power DECIMAL,
//   option_level: INT
//   watchlist VARCHAR(100),
// )`;

client.connect((err) => {
//   if (err) {
//     return console.error('could not connect to postgres', err);
//   }
//   client.query(dropStockTable, (err) => {
//     if (err) {
//       console.error('error droping stock_info', err);
//     }
//     console.log('successfully dropped stock_info');
//   });

  //   client.query(dropAccountTable, (err) => {
  //     if (err) {
  //       console.error('error dropping account_info table', err);
  //     }
  //     console.log('successfully dropping account_info table');
  //   });

  //   client.query(createStockTable, (err) => {
  //     if (err) {
  //       console.error('error creating stock_info table', err);
  //     }
  //     console.log('successfully created stock_info table');
  //   });

  //   client.query(createAccountTable, (err) => {
  //     if (err) {
  //       console.error('error creating account_info', err);
  //     }
  //     console.log('successfully created account_info');
  //   });

  const insertAccountInfo = 'INSERT INTO account_info VALUES (1, \'2QW30682\', \'486422.2050\', 3, \'FB,TSLA,SQ,AAPL,MSFT,BABA,V,JPM,BAC\')';

  client.query(insertAccountInfo, (err) => {
    if (err) {
      console.error('error inserting account profile', err);
    }
    console.log('successfully loaded account profile into account_info table');
  });

  const insertCSV = `COPY stock_info(id, ask_price,ask_size,bid_price,bid_size,last_extended_hours_trade_price,last_trade_price,symbol,quantity)
                    FROM '/Users/MyFolder/SDC/buysell/data.csv' 
                    DELIMITERS ',' CSV HEADER`;


  client.query(insertCSV, (err) => {
    if (err) {
      console.error('error inserting csv', err);
    } else {
        client.end();
        console.log('successfully loaded csv of stocks into stock_info');
    }

  });
});
