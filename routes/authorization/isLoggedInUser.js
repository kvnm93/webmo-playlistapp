const jwt = require('jsonwebtoken')

module.exports = isLoggedInUser = (req, res, next) => {
  try {
     var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
     return next();
  } catch (ex) {
      res.status(403).send(ex.message)
  }
}