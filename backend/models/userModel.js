var mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email');
            }
        },
    },
    // El key del link a la postal, es temporal (se puede cambiar por otro) hasta que la postal esta abierta
    key: {
        type: String,
        required: false,
    },
    // Indicador de si la postal ya fue abierta
    opened: {
        type: Boolean,
        required: true,
        default: false
    },
    // La fecha en la que se abrió la postal
    opened_timestamp: {
        type: Date,
        required: false
    },
    // TODO migrar a otra colección ??
    postal_body: {
        type: String,
        required: true,
        default: "Feliz navidad!",
    },
    dedicatoria: {
        type: String,
        required: true,
        default: "Querido cadarsino!",
    },
    cuerpo: {
        type: String,
        required: true,
        default: "Feliz navidad!",
    },
    posdata: {
        type: String,
        required: false,
    },
    imagen: {
        type: String,
        required: false,
    },
}
);

module.exports = mongoose.model('usuarios', userSchema);