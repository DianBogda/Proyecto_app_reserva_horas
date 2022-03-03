const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { secret } = require('../config/jwt.config');

module.exports.test = (req,res) => {
  res.status(401).json({ msg: 'Usuario no autorizado'})
};

module.exports.viewAllUsers = (req, res) => {
  console.log('Funciona!');
  User.find({admin: false}).sort({'lastName': 1})
    .then(allUsers => res.json({users: allUsers}))
    .catch(err => res.json({message: 'Algo salió mal', error: err})); 
}

module.exports.registerNewUser = (req, res) => {
  console.log('Funciona!');
  const user = new User(req.body);
  user.save()
    .then(() => {
        res.status(201).json({ msg: "Usuario Registrado", user: user });
    })
    .catch(err => res.status(400).json(err));
};

module.exports.loginUser = (req, res) => {
  console.log('Funciona!');
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user === null) {
        res.status(400).json({ msg: "Acceso inválido" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then(passwordIsValid => {
            if (passwordIsValid) {
                const payload = {
                    _id: user._id,
                    admin: user.admin
                };
                const myJWT = jwt.sign(payload, secret);
              res
              .cookie("usertoken", myJWT, secret, {
                  httpOnly: true
                })
                res.status(200).json({ msg: "Acceso Exitoso" });
            } else {
              res.status(400).json({ msg: "Intento de acceso inválido" });
            }
          })
          .catch(err => res.status(400).json({ msg: "Intento de acceso inválido" }));
      }
    })
    .catch(err => res.status(400).json(err));
};