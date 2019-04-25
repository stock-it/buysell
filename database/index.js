const mongoose = require('mongoose');
const csv = require("fast-csv")
const fs = require('fs');


mongoose.connect('mongodb://localhost/democloud',{ useNewUrlParser: true } );


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongoose DB Connected')
});

var SongsInfosSchema = new mongoose.Schema({
	_id: String,
	plays: Number,
	likes: Number,
	reposts: Number,
	date: String,
	artist: String,
	artist_followers: Number,
	artist_tracks: Number,
	isFollowed: Boolean

})

var SongsInfos = mongoose.model('SongsInfos', SongsInfosSchema);


 module.exports = { SongsInfos, db, mongoose }