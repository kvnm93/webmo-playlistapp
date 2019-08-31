const express = require('express')
const playlists = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const isLoggedInUser = require('./authorization/isLoggedInUser');
const isAdmin = require('./authorization/isAdmin');
const models = require('../models');

playlists.use(cors())

process.env.SECRET_KEY = require('./authorization/secret');

// Get Playlists
playlists.get('/get', isLoggedInUser, (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

  models.playlist.findAll({
    include: [{
      model: models.song,
      as: 'songs',
      required: false,
      attributes: ['id', 'title', 'artist', 'length', 'genre', 'album'],
      through: { attributes: [] }
    },
    {
      model: models.user,
      as: 'followers',
      required: false,
      attributes: ['id'],
      through: { attributes: [] },
      where: {
          id: decoded.id
      }
    }
    ]
  })
    .then(playlists => {
        res.json(playlists ? playlists : [])
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

// Get specific playlist
playlists.get('/get/:playlist', isLoggedInUser, (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

  console.log(decoded);

  models.playlist.findOne({
    include: [{
      model: models.song,
      as: 'songs',
      required: false,
      attributes: ['id', 'title', 'artist', 'length', 'genre', 'album'],
      through: { attributes: [] }
    },
    {
      model: models.user,
      as: 'followers',
      required: false,
      attributes: ['id'],
      through: { attributes: [] },
    },
    {
      model: models.user,
      as: 'creator',
      attributes: ['first_name', 'last_name'],
    }],
    where: {
        id: req.params.playlist
    }
  })
    .then(playlist => {
        res.json(playlist ? playlist : {})
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

// Follow/Unfollow playlist
playlists.post('/follow/:playlist', isLoggedInUser, (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

  models.user.findOne({
    where: {
      id: decoded.id
    }
  })
    .then(user => {
      if (user) {
        if (req.body.unfollow) {
            user.removePlaylists([req.params.playlist])
        } else {
            user.addPlaylists([req.params.playlist])
        }
        res.status(200).send("success")
      } else {
        res.status(403).json({ error: 'Please login' })
      }
    })
    .catch(err => {
      console.log("error", err);
      res.status(400).json({ error: err })
    })
})

// Delete Playlist
playlists.delete('/delete/:playlist', isAdmin, (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);


  models.playlist.findOne({
    where: {
      id: req.params.playlist
    }
  })
    .then(playlist => {
        playlist.destroy();
        res.status(204).send("success");
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
})

module.exports = playlists
