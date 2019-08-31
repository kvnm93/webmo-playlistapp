const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const models = require('../models');

users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password: req.body.password,
    user_roles: req.body.user_roles
  }

  models.user.findOne({
    include: [{
      model: models.role,
      as: 'roles',
      required: false,
      attributes: ['id', 'name'],
      through: { attributes: [] }
    }],
    where: {
      username: req.body.username
    }
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          console.log("passwrod:", hash)
          userData.password = hash
          models.user.create(userData)
            .then(user => {
              user.setRoles([userData.user_roles])
              res.json({ status: user.username + ' Registered!' })
            })
            .catch(err => {
              res.status(400).send('error: ' + err)
            })
        })
      } else {
        res.status(400).json({ error: 'User already exists' })
      }
    })
    .catch(err => {
        console.log("error", err);
      res.send('error: ' + err)
    })
})

users.post('/login', (req, res) => {
  models.user.findOne({
    include: [{
      model: models.role,
      as: 'roles',
      required: false,
      attributes: ['id', 'name'],
      through: { attributes: [] }
    }],
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 999999
          })
          res.status(200).send(token)
        } else {
          res.status(400).json({ error: 'Wrong username or password' });
        }
      } else {
        res.status(400).json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      console.log("error", err);
      res.status(400).json({ error: err })
    })
})

module.exports = users
