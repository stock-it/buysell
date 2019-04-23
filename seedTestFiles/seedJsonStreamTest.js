const faker = require('faker');
const mongoose = require('mongoose');
const fs = require('fs');
const exec = require('child_process').exec;

let startTime;
let importStartTime;


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/stocks');
const db = mongoose.connection;
db.on('error', (err) => {
  console.log('error connecting', err);
});
db.once('open', () => {
  console.log('mongoose connected');
});

const uniqueRecords = 1001;
let idCounter = 1;
const seedOutputPath = `${__dirname}/../seedFile/testSeed.json`;
const finalArray = [];

while (idCounter < uniqueRecords) {
  const stockDetail = {
    ask_price: Number,
    ask_size: Number,
    bid_price: Number,
    bid_size: Number,
    last_extended_hours_trade_price: Number,
    last_trade_price: Number,
    symbol: String,
    quantity: Number,
  };

  const stringRoomDetail = JSON.stringify(stockDetail);
  finalArray.push(stockDetail);

  idCounter++;
}


const outputLoc = 'database/seedFile/testSeed.json';


const writeOpenBracket = () => new Promise(((resolve, reject) => {
  fs.writeFile(outputLoc, '[', (err) => {
    if (err) throw err;
    console.log('wrote open brackets');
    resolve();
  });
}));

const writeComma = () => new Promise(((resolve, reject) => {
  fs.appendFile(outputLoc, ',', (err) => {
    if (err) throw err;
    console.log('wrote comma');
    resolve();
  });
}));

const writeContent = round => new Promise(((resolve, reject) => {
  if (round !== 1) {
    for (let i = 0; i < uniqueRecords - 1; i++) {
      const currRecord = JSON.parse(finalArray[i]);
      currRecord.id = idCounter;
      finalArray[i] = JSON.stringify(currRecord);
      idCounter++;
    }
  }
  const stockDataStream = fs.createWriteStream(seedOutputPath, { flags: 'a' });
  stockDataStream.write(`${finalArray}`);
  stockDataStream.end();
  stockDataStream.on('finish', () => {
    console.log('wrote contents');
    resolve();
  });
}));

const writeContents = async () => {
  for (let round = 1; round < 10001; round++) {
    round !== 1 && await writeComma();
    await writeContent(round);
    console.log(round);
  }
};

const writeCloseBracket = () => new Promise(((resolve, reject) => {
  fs.appendFile(outputLoc, ']', (err) => {
    console.log('wrote close bracket');
    if (err) throw err;
    resolve();
  });
}));

const importFactory = () => {
  const command = `mongoimport --db stocks --collection stocks --type json --file ${seedOutputPath} --jsonArray --numInsertionWorkers 2`;
  console.log(`Time to Generate + Export: \x1b[32m${(Date.now() - startTime) / 1000}s\x1b[0m`);
  console.log('starting to import');
  importStartTime = Date.now();
  return new Promise(((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.log('THIS IS ERROR', err);
      }
      console.log(`Time to Import: \x1b[32m${(Date.now() - importStartTime) / 1000}s\x1b[0m`);
      resolve();
    });
  }));
};

const deleteFile = () => new Promise(((resolve, reject) => {
  fs.unlink(seedOutputPath, (err) => {
    if (err) throw err;
    console.log(`${seedOutputPath} was deleted`);
    resolve();
  });
}));

const writeEverything = async () => {
  startTime = Date.now();
  await writeOpenBracket();
  await writeContents();
  await writeCloseBracket();
  await importFactory();
  await deleteFile();
  await db.close();
};

writeEverything();
