const db = require('../index.js')

let newSong = {
  _id: 123456789,
  plays: 12345,
  likes: 54321,
  reposts: 32145,
  date: "3 March 1989",
  artist: "Ryan O",
  artist_followers: 1000000,
  artist_tracks: 1,
  isFollowed: false
}

exports.getData = (req,res) => {
  let id = req.params.id;
  db.SongsInfos.findOne({ _id: id}, (err, results) => {
    err ? res.send(err) : res.send(results);
  })
}

exports.updateFollowers = (req, res) => {
  console.log(req.body)
  let id = req.body.id
  let num = req.body.num
  db.SongsInfos.findOneAndUpdate({_id: id}, {artist_followers: num }, (err, results) => {
  	err ? res.send(err) : res.send(results);
  })
  db.SongsInfos.findOne({_id: id}, (err, doc) => {
  	err? console.log(err) : doc.isFollowed = !doc.isFollowed;
  	doc.save(err => {if (err)  console.log(err)})
  })
}

exports.deleteSong = (req, res) => {
	console.log(req.body, 'and', req.params)
	let id = req.body.id
	db.SongsInfos.deleteOne({_id: id}, (err,results) => {
		err ? console.log(err) : console.log(results)
	})
}

exports.createSong = (req, res) => {
	db.SongsInfos.create(newSong, (err,results) => {
		err ? console.log(err) : console.log(results)
	})
}

