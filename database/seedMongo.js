const fs = require('fs');
const csv = require("fast-csv");
const mong = require('./index.js')

let authors = [];
let count = 1;

//run this file using npm run seedm

let stream = fs.createReadStream("data.csv");
console.log('Inserting into Mongo.....please wait.....')
console.time('finished seeding')
csv
 .fromStream(stream, {headers : true})
 .on("data", function(data){
 	     data['_id'] = (count++).toString()

         authors.push(data);
 })
 .on("end", function(){
    	mong.SongsInfos.collection.insertMany(authors,(err, documents) => {
            err ? console.log('Mong Insert Broke', err) : console.timeEnd('finished seeding') //about 235 seconds
         });
 });
 