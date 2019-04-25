const psql = require('./index.js')

//******PSQL QUERIES *********

console.time('time')
 psql.client.query(`SELECT * FROM Songsinfos WHERE id = 1`, (err, results) => {
 	err ? console.log(err) : console.log(results.rows);console.timeEnd('time')
 });
 /*
 { id: 1,
    plays: 89631,
    likes: 94420,
    reposts: 82239,
    description:
     'Quas voluptates et repellendus omnis et.                                              ',
    artist:
     'Conrad4                                                                    ',
    artist_followers: 64959,
    artist_tracks: 83694 } ]
time: 11.710ms
*/

console.time('time')
 psql.client.query(`SELECT * FROM Songsinfos WHERE id = 100000`, (err, results) => {
 	err ? console.log(err) : console.log(results.rows);console.timeEnd('time')
 });
/*
[ { id: 100000,
    plays: 72403,
    likes: 51709,
    reposts: 85377,
    description:
     'Laudantium autem consequuntur labore.                                              ',
    artist:
     'Rickie_Effertz                                                             ',
    artist_followers: 54706,
    artist_tracks: 65530 } ]
time: 11.862ms
*/
console.time('time')
 psql.client.query(`SELECT * FROM Songsinfos WHERE id = 10000000`, (err, results) => {
 	err ? console.log(err) : console.log(results.rows);console.timeEnd('time')
 });
 /*
[ { id: 10000000,
    plays: 37735,
    likes: 95530,
    reposts: 7694,
    description:
     'Cupiditate deleniti dolores voluptatum maxime.                                              ',
    artist:
     'Hazel.Brown                                                                ',
    artist_followers: 85304,
    artist_tracks: 39529 } ]
time: 11.763ms
*/
//***RANDOM QUERIES

console.time('time')
 psql.client.query(`SELECT * FROM Songsinfos WHERE likes = 78106 LIMIT 1`, (err, results) => {
 	err ? console.log(err) : console.log(results.rows);console.timeEnd('time')
 });

 //**WITH LIMIT 1
 /*
 [ { id: 9918888,
    plays: 90753,
    likes: 78106,
    reposts: 3535,
    description:
     'Voluptatibus et sit nulla sapiente quo ullam quibusdam aut.                                              ',
    artist:
     'Estelle53                                                                  ',
    artist_followers: 76686,
    artist_tracks: 33639 } ]
time: 12.217ms
*/
 //***WITHOUT LIMIT 1***
 /*
   [{ id: 9117382,
    plays: 46348,
    likes: 78106,
    reposts: 17333,
    description:
     'Dolore non sint quis ut est eos laboriosam.                                              ',
    artist:
     'Kris.Rau93                                                                 ',
    artist_followers: 74474,
    artist_tracks: 72079 },
  { id: 9093366,
    plays: 41677,
    likes: 78106,
    reposts: 94865,
    description:
     'Error corrupti deserunt in amet est veniam.                                              ',
    artist:
     'Alex.Turner73                                                              ',
    artist_followers: 3970,
    artist_tracks: 87986 },
  ... 110 more items ]
time: 48471.423ms
*/


