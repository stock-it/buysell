//const mong = require('./index.js')

//Our simple module only makes a get request to get all data with the specifc ID.

//****MONGOOSE QUERIES*******


//GET ID 1
console.time('time')
mong.SongsInfos.findOne({_id: '1'}, (err, docu) => {
	err ? console.log(err) : console.log(docu);console.timeEnd('time')
});

/*
{ _id: '1',
  plays: '72702',
  likes: '66885',
  reposts: '71328',
  description: 'Eveniet inventore impedit.',
  artist: 'Lura.Casper',
  artist_followers: '16766',
  artist_tracks: '87239' }
time: 29.342ms
*/


//GET 100k
console.time('time')
mong.SongsInfos.findOne({_id: '100000'}, (err, docu) => {
	err ? console.log(err) : console.log(docu);console.timeEnd('time')
});

/*
{ _id: '100000',
  plays: '25798',
  likes: '28518',
  reposts: '55090',
  description: 'Et totam non aut minus eum eius numquam voluptatum fugiat.',
  artist: 'Frida77',
  artist_followers: '4708',
  artist_tracks: '39347' }
time: 29.747ms
*/

/*
//GET 10 Mill
console.time('time')
mong.SongsInfos.findOne({_id: '10000000'}, (err, docu) => {
	err ? console.log(err) : console.log(docu);console.timeEnd('time')
});
/*
{ _id: '10000000',
  plays: '65100',
  likes: '90703',
  reposts: '92679',
  description: 'Quis saepe possimus est error delectus aut.',
  artist: 'Emmett_Bogan34',
  artist_followers: '15267',
  artist_tracks: '84422' }
time: 29.724ms
*/


//Random Non ID Requests


console.time('time')
mong.SongsInfos.findOne({likes: 78106}, (err, docu) => {
	err ? console.log(err) : console.log(docu);console.timeEnd('time')
});

/*
{ _id: '51778',
  plays: '40640',
  likes: '78106',
  reposts: '4110',
  description: 'Nesciunt qui minima enim qui fugit beatae laborum.',
  artist: 'Alexandro41',
  artist_followers: '47266',
  artist_tracks: '93640' }
time: 47.257ms
*/
/*
console.time('time')
mong.SongsInfos.find({artist: "Americo_Jacobs"}, (err, docu) => {
	err ? console.log(err) : console.log(docu);console.timeEnd('time')
});

/*
 { _id: '26',
    plays: '58715',
    likes: '24929',
    reposts: '45577',
    description: 'Qui vero suscipit aperiam qui assumenda eligendi nihil.',
    artist: 'Americo_Jacobs',
    artist_followers: '80839',
    artist_tracks: '14922' },
  { _id: '2738617',
    plays: '70725',
    likes: '72296',
    reposts: '97308',
    description: 'Fugiat explicabo animi voluptas quia sapiente.',
    artist: 'Americo_Jacobs',
    artist_followers: '52273',
    artist_tracks: '2978' } ]
time: 3362.494ms
*/

console.time('time')
mong.SongsInfos.find({plays: "777"}, (err, docu) => {
	err ? console.log(err) : console.log(docu.length);console.timeEnd('time')
});

/*
 [{_id: '9915172',
    plays: '777',
    likes: '23902',
    reposts: '20175',
    description: 'Quas et ea tenetur voluptatum quia beatae sequi nisi est.',
    artist: 'Malcolm6',
    artist_followers: '74639',
    artist_tracks: '79786' },
  { _id: '9918697',
    plays: '777',
    likes: '28345',
    reposts: '59279',
    description:
     'Veritatis nostrum est quo amet quod officiis ut error totam.',
    artist: 'Barrett.Kuvalis43',
    artist_followers: '34319',
    artist_tracks: '67175' },
  { _id: '9995868',
    plays: '777',
    likes: '90962',
    reposts: '74616',
    description: 'Nemo quisquam quos temporibus.',
    artist: 'Zachery_Conn79',
    artist_followers: '14589',
    artist_tracks: '15427' } .......90 more items]
time: 3064.238ms
*/


