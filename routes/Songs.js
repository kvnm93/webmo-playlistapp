const express = require('express')
const songs = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const isLoggedInUser = require('./authorization/isLoggedInUser');
const isAdmin = require('./authorization/isAdmin');
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

songs.use(cors())

process.env.SECRET_KEY = require('./authorization/secret');

// Get Songs
songs.get('/get', isLoggedInUser, (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

  var criteria = {};
  if (req.query.term && req.query.term !== "") {
    criteria = {
      where: {
        [Op.or]:[
          {
            title: {
              [Op.like]: "%"+req.query.term.toLowerCase()+"%"
            }
          },
          {
            artist: {
              [Op.like]: "%"+req.query.term.toLowerCase()+"%"
            }
          },
          {
            genre: {
              [Op.like]: "%"+req.query.term.toLowerCase()+"%"
            }
          },
        ]
      }
    }
  }

  models.song.findAll(criteria)
    .then(songs => {
        res.json(songs ? songs : [])
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
})

// Delete Songs
songs.delete('/delete/:song', isAdmin, (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);


  models.song.findOne({
    where: {
      id: req.params.song
    }
  })
    .then(song => {
        song.destroy();
        res.status(204).send("success");
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
})

// Get specific Song
songs.get('/get/:song', isAdmin, (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

  console.log(decoded);

  models.song.findOne({
    where: {
        id: req.params.song
    }
  })
    .then(song => {
        res.json(song ? song : {})
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err)
    })
})

// Get specific Song
songs.put('/update/:song', isAdmin, (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

  models.song.update(req.body, {
    where: {
        id: req.params.song
    }
  })
    .then(song => {
        res.status(200).send("success")
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
})

// Get specific Song
songs.post('/add', isAdmin, (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

  models.song.create(req.body)
    .then(song => {
        res.status(200).json(song)
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
})

module.exports = songs