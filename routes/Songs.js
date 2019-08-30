const express = require('express')
const songs = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const ensureLogin = require('./authorization');
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

songs.use(cors())

process.env.SECRET_KEY = require('./authorization');

// Get Playlists
songs.get('/get', ensureLogin, (req, res) => {
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


module.exports = songs