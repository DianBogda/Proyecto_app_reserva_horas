const mongoose = require('mongoose');

const SpaSchema = new mongoose.Schema({
    usuariaId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    date: {
        type: Date,
        required: [true, "*Debe seleccionar una fecha y una hora"]
    },

    servicio: {
        type: String,
        required: [true, "*Debe seleccionar un servicio de la lista"]
    }

}, {timestamps: true});

SpaSchema.virtual('usuaria', {
    ref: 'User',
    localField: 'usuariaId',
    foreignField: '_id'   
});

SpaSchema.set('toObject', { virtuals: true });
SpaSchema.set('toJSON', { virtuals: true });

const Spa = mongoose.model("Spa", SpaSchema);

module.exports = Spa;