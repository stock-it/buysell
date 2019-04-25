const csv = require("fast-csv");
const fs = require('fs');
const psql = require('./index.js');
var copyFrom = require('pg-copy-streams').from;

//run this file using npm run seedp
//inserts data from CSV file into Postgres SongsInfos table
console.log('Inserting......please wait.....')
console.time('finished seeding')
var stream = psql.client.query(copyFrom('COPY SongsInfos(plays,likes,reposts,description,artist,artist_followers,artist_tracks) FROM STDIN WITH CSV HEADER'));
var fileStream = fs.createReadStream('data.csv')
fileStream.pipe(stream)
fileStream.on('end', () => console.timeEnd('finished seeding')) //about 70 seconds

