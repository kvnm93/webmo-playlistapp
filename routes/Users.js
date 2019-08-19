const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const models = require('../models');

users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password: req.body.password,
    created: today,
    user_roles: req.body.user_roles
  }

  models.user.findOne({
    include: [{
      model: models.role,
      as: 'user_roles',
      required: false,
      attributes: ['id', 'role'],
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

          userData.password = hash
          models.user.create(userData)
            .then(user => {
              const role = models.role.findByPk(userData.user_roles)
              console.log(role);
              user.addRole(role)
              res.json({ status: user.username + ' Registered!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        res.json({ error: 'User already exists' })
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
      as: 'user_roles',
      required: false,
      attributes: ['id', 'role'],
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
            expiresIn: 1440
          })
          res.send(token)
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

users.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  models.user.findOne({
    where: {
      id: decoded.id
    }
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = users
