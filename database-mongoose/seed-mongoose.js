const seeder = require('mongoose-seed-csv');
const Stock = require('./Stocks');

seeder.connect('mongodb://localhost/stocks', () => {
  // Load Mongoose models
  seeder.loadModels([
    // './SchemaMongoose.js',
    './database-mongoose/Stocks.js',
  ]);

  seeder.populateFromCSV(
    [
      './database-mongoose/mongooseTest.csv',
      { path: './database-mongoose/Stocks.js', model: 'Map', parseOptions: { columns: true } },
    ],
    { columns: true, parseDeep: true },
    () => {
      seeder.disconnect();
    },
  );

//   // Clear specified collections
//   seeder.clearModels([Stock], () => {
//     // Callback to populate DB once collections have been cleared
//     seeder.populateModels(data, () => {
//       seeder.disconnect();
//     });
//   });
});