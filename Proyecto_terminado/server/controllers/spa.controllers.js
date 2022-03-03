const Spa = require('../models/spa.model');
const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
const { secret } = require('../config/jwt.config');
const nodemailer = require('nodemailer');
const moment = require('moment');

module.exports.solicitarCita = (req,res) => {
    console.log('Está funcionando!')
    const spa = req.body;
    const payload = jwt.decode(req.cookies.usertoken, secret);
    spa.usuariaId = payload._id;
    Spa.create(spa)
        .then(newCita => res.status(201).json({cita: newCita}))
        .catch(err => res.status(400).json(err));
};

module.exports.verCitasUser = (req, res) => {
    console.log('Está funcionando!')
    const payload = jwt.decode(req.cookies.usertoken, secret);
    Spa.find({usuariaId: payload._id}).populate('usuaria').sort({'date': 1})
        .then(allCitas => res.status(200).json({citas: allCitas}))
        .catch(err => res.status(400).json({message: 'Algo salió mal', error: err}));  
};

module.exports.actualizarCita = (req, res) => {
    console.log('Está funcionando!')
    Spa.findByIdAndUpdate({_id: req.params._id}, req.body, {new: true, runValidators: true, context: 'query'})
        .then(citaUpdated => res.json({cita: citaUpdated}))
        .catch(err => res.status(400).json({message: 'Algo salió mal', error: err})); 
};

module.exports.eliminarCita = (req, res) => {
    console.log('Está funcionando!')
    Spa.findByIdAndDelete({_id: req.params._id})
        .then(result => res.json({message: 'Cita eliminada', result: result}))
        .catch(err => res.json({message: 'Algo salió mal', error: err}));
};

module.exports.verCitaId = (req, res) => {
    console.log('Está funcionando!')
    Spa.findById({_id: req.params._id})
        .then(citaFinded => res.status(200).json({cita: citaFinded}))
        .catch(err => res.status(400).json({message: 'Algo salió mal', error: err})); 
};

module.exports.confirmarCita = (req, res) => {
    console.log('Está funcionando!')
    const payload = jwt.decode(req.cookies.usertoken, secret);
    Spa.findById(req.body.id)
        .then(cita =>{
            // console.log(cita)
            User.findById({_id: payload._id})    
            .then(r=>{
                // console.log(r)
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    auth: {
                      user: 'xxxxx@gmail.com',
                      pass: 'xxxxx'
                    },
                  });
            
                  transporter.sendMail({
                    from: '"Amely Pestañas y Cejas" <xxxxxx@gmail.com>',
                    to: r.email,
                    subject: "Confirmación hora reservada",
                    html:"<h2>Tu hora ha sido confirmada</h2>" + "<h3>Servicio:</h3> " + cita.servicio + "<h3>Fecha y hora:</h3> " + moment(cita.date).format('DD/MM/YYYY, h:mm a')
                })
                .then(r => res.status(200).json({message: 'Cita confirmada'}))
                .catch(err => res.status(400).json({message: 'Algo salió mal', error: err}));
            })
            .catch(err => res.status(400).json({message: 'Algo salió mal', error: err}));
        })
        .catch(err => res.status(400).json({message: 'Algo salió mal', error: err}));
}