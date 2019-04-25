const seeder = require('mongoose-seed-csv');
const Stock = require('./SchemaMongoose');

seeder.connect('mongodb://localhost/stocks2', () => {
  // Load Mongoose models
  seeder.loadModels([
    // './SchemaMongoose.js',
    './databases/database-mongoose/SchemaMongoose.js',
  ]);

  seeder.populateFromCSV(
    [
      './databases/database-mongoose/mongooseSeedTest.csv',
      {path: './databases/database-mongoose/SchemaMongoose.js', model: Stock, parseOptions: { columns: true } },
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
