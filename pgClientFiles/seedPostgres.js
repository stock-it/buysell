const { Client } = require('pg');
const fs = require('fs');
const {exec} = require('child_process');
const pgtools = require('pgtools');
const path = require('path');
const csv = require("fast-csv");
const { performance } = require('perf_hooks');
const seedUtilities = require('./seedUtilities');
require('dotenv').config();

let endTime;
const noDocsInSet = 1000;
const excludeId = true;
// GET UTILITY FILE IN PLACE FOR SEEDING
// let finalArray = seedUtilities.randoGenArrayFactory(noDocsInSet, excludeId);
const seedOutputPath = path.join(__dirname, 'seedFile', 'testSeed.csv');

const rounds = 10000;
let client;
const progressBarSize = 30;

const config = {
  host: process.env.HOST,
  port: process.env.DBPORT,
  user: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
};


const dropDatabase = () => pgtools.dropdb(config, 'Accounts');

const createDatabase = () => pgtools.createdb(config, 'Stocks');

const loadSchemaFactory = () => {
  const command = 'psql roomsDB < database-mysqldb/schema.sql';
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.log('...schema could not be loaded in the database', err);
        reject();
      }
      console.log('...schema loaded');
      resolve();
    });
  });
};

let csvTransformObject;

const writeTheThing = () => {
  const StockDataStream = fs.createWriteStream(seedOutputPath);

  return new Promise((resolve, reject) => {
    csv
      .writeToStream(stockDataStream, finalArray, {
        headers: true,
        transform (row) {
                    csvTransformObject = {
                        id: row.id,
                        ask_size: row.ask_size,
                        bid_price: row.bid_price,
                        bid_size: row.bid_size,
                        last_extended_hours_trade_price: row.last_extended_hours_trade_price,
                        last_trade_price: row.last_trade_price,
                        symbol: row.symbol,
                        quantity: row.quantity,
                        createdAt: row.createdAt,
                        updatedAt: row.updatedAt
                    }
                    return csvTransformObject;
                },
      })
      .on('finish', () => {
                console.log(`...wrote ${noDocsInSet} unique records to ${path.basename(seedOutputPath)}`);
                resolve();
            });
  });
};


const insertionFactory = async () => {
  client = new Client(config);
  client.connect();
  const headers = Object.keys(csvTransformObject);
  const caseSens = ['user', 'sleepingArrangements', 'selfCheckin'];
  headers.forEach((headersItem, headersIndex) => {
    caseSens.forEach((caseSensItem) => {
      if (headersItem === caseSensItem) {
        headers[headersIndex] = JSON.stringify(caseSensItem);
      }
    });
  });
  for (let i = 0; i < rounds; i++) {
    await client.query(`COPY rooms(${headers}) FROM '${seedOutputPath}' WITH CSV HEADER`);
    const eachTick = Math.floor(rounds / progressBarSize);

    let progBar = [...Array(progressBarSize).keys()].fill('\x1b[47m \x1b[0m');
    const spacesToFill = Math.floor(i / eachTick);
    progBar = progBar.fill('\x1b[44m \x1b[0m', 0, spacesToFill);
    progBar = progBar.join('');
    seedUtilities.clearConsole();
    process.stdout.write(`${Math.round((i / rounds) * 100)}% complete... ${progBar}`);
  }
  seedUtilities.clearConsole();
  console.log('...unique records inserted!');
};

const deleteFile = () => {
  fs.unlink(seedOutputPath, (err) => {
    if (err) {
      console.log(err, '...could not delete file, see above');
    }
    console.log(`...${path.basename(seedOutputPath)} file deleted`);
  });
};

const doEverything = async () => {
  await dropDatabase().catch((e) => {
    console.log('...no existing database named \'roomsDB\' to delete... moving on');
  });
  await createDatabase().then(() => {
    config.database = process.env.DATABASE;
  });
  await loadSchemaFactory();
  const startTime = performance.now();
  await writeTheThing();
  console.log(`...importing unique data to postgres db ${rounds} times`);
  await insertionFactory();
  endTime = performance.now();
  console.log(`Time It Took: ${(((endTime - startTime) / 1000) / 60).toFixed(2)} minutes.`);
  deleteFile();
  await client.end();
};


doEverything();
