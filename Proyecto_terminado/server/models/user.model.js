const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: [true, "*Nombre es requerido."],
      minlength: [3, "Nombre debe tener al menos 3 caracteres de largo"]
    },

    lastName: {
      type: String,
      required: [true, "*Apellido es requerido."],
      minlength: [3, "*Apellido debe tener al menos 3 caracteres de largo"]
    },

    phone: {
      type: String,
      required: [true, "*Número de teléfono es requerido."],
    },

    email: {
      type: String,
      required: [true, "*Correo electrónico es requerido."],
      unique: true,
      match: [/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/, "*Correo electrónico no tiene el formato correcto."]
    },

    password: {
      type: String,
      required: [true, "*Contraseña es requerida."],
      minlength: [6, "*Contraseña debe tener al menos 6 caracteres."]
    },

    admin: {
      type: Boolean,
      default: false
    }

  }, {timestamps: true});

  UserSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( value => this._confirmPassword = value );

 UserSchema.pre('validate', function(next) {
    if(this.password !== this.confirmPassword) {
      this.invalidate('confirmPassword', '*Contraseña debe ser igual al confirmarla.');
    }
    next();
  });

 UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        next();
      });
  });

  const User = mongoose.model("User", UserSchema);
  UserSchema.plugin(uniqueValidator, { message: '*Error, correo electrónico {VALUE} debe ser único.' });

  module.exports = User;