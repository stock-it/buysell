const Sequelize = require('sequelize');

// setup connection
const db = new Sequelize('democloud', 'root', '', {
  host: 'localhost',
  dialect: 'postgres'
});

// test connection
db.authenticate()
  .then(() => {
    console.log('db connection success!');
  })
  .catch(err => {
    console.log('NO db connection!', err);
  });

// songsinfo table schema
const SongsInfo = db.define(
  'SongsInfo',
  {
    plays: Sequelize.INTEGER,
    likes: Sequelize.INTEGER,
    reposts: Sequelize.INTEGER,
    date: Sequelize.STRING,
    artist: Sequelize.STRING,
    artist_followers: Sequelize.INTEGER,
    artist_tracks: Sequelize.INTEGER
  },
  {
    timestamps: false
  }
);

// applies SongsInfo table to democloud db
db.sync();

module.exports = { SongsInfo };
