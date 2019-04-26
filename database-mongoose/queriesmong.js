const mong = require('./index.js')

//Our simple module only makes a get request to get all data with the specifc ID.

//****MONGOOSE QUERIES*******


//GET ID 1
console.time('time')
mong.Stock.findOne({_id: '1'}, (err, docu) => {
	err ? console.log(err) : console.log(docu);console.timeEnd('time')
});

//GET 100k
console.time('time')
mong.Stock.findOne({_id: '100000'}, (err, docu) => {
	err ? console.log(err) : console.log(docu);console.timeEnd('time')
});


console.time('time')
mong.Stock.findOne({likes: 78106}, (err, docu) => {
	err ? console.log(err) : console.log(docu);console.timeEnd('time')
});

console.time('time')
mong.Stock.find({artist: "Americo_Jacobs"}, (err, docu) => {
	err ? console.log(err) : console.log(docu);console.timeEnd('time')
});

console.time('time')
mong.Stock.find({symbol: "ZZZZZ"}, (err, docu) => {
	err ? console.log(err) : console.log(docu.length);console.timeEnd('time')
});