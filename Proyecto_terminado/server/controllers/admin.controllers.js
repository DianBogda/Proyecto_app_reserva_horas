const Spa = require('../models/spa.model');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { secret } = require('../config/jwt.config');

module.exports.viewAllAdmins = (req, res) => {
    console.log('Funciona!');
    User.find({admin: true}).sort({'lastName': 1})
      .then(allAdmins => res.json({admins: allAdmins}))
      .catch(err => res.json({message: 'Algo salió mal', error: err})); 
};

  module.exports.verCitas = (req, res) => {
    console.log('Está funcionando!')
    Spa.find({}).populate('usuaria').sort({'date': 1, 'servicio': 1})
        .then(allCitas => res.status(200).json({citas: allCitas}))
        .catch(err => res.status(400).json({message: 'Algo salió mal', error: err}));  
};

module.exports.listarCita1 = (req, res) => {
    console.log('Está funcionando!')
    Spa.find({ servicio: 'Extensión de Pestañas' }).populate('usuaria').sort({'date': 1})
        .then(cita1Finded => res.status(200).json({cita: cita1Finded}))
        .catch(err => res.status(400).json({message: 'Algo salió mal', error: err})); 
}

module.exports.listarCita2 = (req, res) => {
    console.log('Está funcionando!')
    Spa.find({ servicio: 'Lifting de Pestañas' }).populate('usuaria').sort({'date': 1})
        .then(cita2Finded => res.status(200).json({cita: cita2Finded}))
        .catch(err => res.status(400).json({message: 'Algo salió mal', error: err})); 
}

module.exports.listarCita3 = (req, res) => {
    console.log('Está funcionando!')
    Spa.find({ servicio: 'Microblading' }).populate('usuaria').sort({'date': 1})
        .then(cita3Finded => res.status(200).json({cita: cita3Finded}))
        .catch(err => res.status(400).json({message: 'Algo salió mal', error: err})); 
}

module.exports.deleteCita = (req, res) => {
    console.log('Está funcionando!')
    Spa.findByIdAndDelete({_id: req.params._id})
        .then(result => res.json({message: 'Cita eliminada', result: result}))
        .catch(err => res.json({message: 'Algo salió mal', error: err}));
};


