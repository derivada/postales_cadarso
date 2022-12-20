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
    // Los siguientes campos contienen la postal en sí. Dedicatoria, cuerpo y posdata son HTML, imagen es la URL de la imagen
    dedicatoria: {
        type: String,
    },
    cuerpo: {
        type: String,
    },
    posdata: {
        type: String,
    },
    imagen: {
        type: String,
    },
}
);

module.exports = mongoose.model('usuarios', userSchema);