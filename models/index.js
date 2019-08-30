'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    console.log("initialized model " + modelName);
    db[modelName].associate(db);
  }
});


sequelize.sync({ force: true }).then(() => {
  // Now the `users` table in the database corresponds to the model definition
  db.role.create({
    id: 1,
    name: 'ADMIN'
  });
  db.role.create({
    id: 2,
    name: 'LISTENER'
  });

  db.user.create({
     id: 1,
     username: "admin",
     password: "$2b$10$qi19MKAkTV0QSzWUEFCOL.YrP4YRwwrNPO6vGo9Mtu/wJ36Fo78kq", // equals 1234
      last_name: "Admin",
      first_name: "Peter"
  }).then(user => {
    // set as admin
    user.setRoles([1]);
  });

  db.user.create({
     id: 2,
     username: "listener",
     password: "$2b$10$qi19MKAkTV0QSzWUEFCOL.YrP4YRwwrNPO6vGo9Mtu/wJ36Fo78kq", // equals 1234
      last_name: "Listener",
      first_name: "Peter"
  }).then(user => {
    // set as admin
    user.setRoles([2]);
  });

  db.song.create({
    id: 1,
    artist: "Shakira",
    title: "Song 1",
    genre: "Pop",
    length: 192, // 3:12
    album: "NewAlbum",
  });
  db.song.create({
    id: 2,
    artist: "Eminem",
    title: "Song 2",
    genre: "Rap",
    length: 122,
    album: "NewAlbum",
  });
  db.song.create({
    id: 3,
    artist: "Usher",
    title: "Song 3",
    genre: "Electro",
    length: 180,
    album: "FL",
  });
  db.song.create({
    id: 4,
    artist: "Rihanna",
    title: "Song 4",
    genre: "Pop",
    length: 160,
    album: "NewTone",
  });

  db.playlist.create({
      id: 1,
      name: "Chill Vibes",
      description: "Songs to relax to during exam stress. Lean back",
      cover: "https://i.pinimg.com/236x/ce/e0/e6/cee0e6d4072e079752b543649f685ffe--camels-playlist.jpg"
  }).then(playlist => {
    // set as admin
    playlist.setSongs([1,2,3]);
    playlist.setCreator(1);
    playlist.addFollowers(2);
  });

  db.playlist.create({
      id: 2,
      name: "Sport",
      description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
      cover: "https://i.redd.it/0ls5x7mm8r011.jpg"
  }).then(playlist => {
    playlist.setSongs([1,2,4]);
    playlist.setCreator(1);
  });

  db.playlist.create({
      id: 3,
      name: "Sunset Dreaming",
      description: "Lorem ipsum dolor sit amet, consetetur sadipscing ",
      cover: "https://www.canva.com/learn/wp-content/uploads/2015/03/Colorful-Album-Cover.jpg"
  }).then(playlist => {
    playlist.setSongs([1,2,3,4]);
    playlist.setCreator(1);
  });

  db.playlist.create({
      id: 4,
      name: "Retro Vibes",
      description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed",
      cover: "https://www.graphicsprings.com/filestorage/images/1191/Screen%20Shot%202018-05-24%20at%2011.25.20%20AM.png"
  }).then(playlist => {
    playlist.setSongs([1,2,3,4]);
    playlist.setCreator(1);
  });

  db.playlist.create({
      id: 5,
      name: "Hidden Gems",
      description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam ",
      cover: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ba8e6264140685.5ac8182a1d973.jpg"
  }).then(playlist => {
    playlist.setSongs([1,2,3,4]);
    playlist.setCreator(1);
  });

  db.playlist.create({
      id: 6,
      name: "Signal Noise",
      description: "Lorem ipsum dolor sit amet, consetetur",
      cover: "https://pro2-bar-s3-cdn-cf6.myportfolio.com/1fabf4ed77f805d754b14c5b7b6b7fb1/7238d42acc58c1c5f58e6ca6768bfb2352a0aa7a21016eb7d6f0dc293190f898f05ee0a79aeb4322_rw_1200.jpg?h=d73e87a9258dd65515c8148ff3930b6c"
  }).then(playlist => {
    playlist.setSongs([1,2,3,4]);
    playlist.setCreator(1);
  });


});



db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
