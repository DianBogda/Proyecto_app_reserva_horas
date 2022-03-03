const jwt = require("jsonwebtoken");
const secret = "My new secret key is valid";

module.exports.secret = secret;

module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
    console.log(err, payload);
    if (err) { 
      res.status(401).json({verified: false});
    } else {
      next();
    }
  });
}