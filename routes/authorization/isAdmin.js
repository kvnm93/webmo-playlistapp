const jwt = require('jsonwebtoken')

module.exports = isAdmin = (req, res, next) => {
  try {
     var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
     console.log(req.headers['authorization']);
     console.log(decoded);
     if (decoded.roles[0].id === 1) {
       return next();
     } else {
       res.status(403).send("Not authorized")
     }
  } catch (ex) {
      res.status(403).send(ex.message)
  }
}