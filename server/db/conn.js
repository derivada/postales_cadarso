/**
 * Conexión a MongoDB y schema de la tabla de usuarios   con MOngoose
 */

var mongoose = require('mongoose');
const validator = require('validator');

require('dotenv').config({ path: __dirname + '/.env' })
const connectionString = process.env.DB_URI.replace('<password>', process.env.DB_PWD);

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
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    },
  },
  // El key del link a la postal, es temporal (se puede cambiar por otro) hasta que la postal es abierta por 1º vez
  temp_key: {
    type: String,
    required: false,
  },
  // El link a la postal definitivo, se registra una vez la postal es abierta
  final_key: {
    type: String,
    required: false
  },
  // La fecha en la que se abrió la postal
  opened_timestamp: {
    type: Date,
    required: false
  },
  // TODO migrar a otra colección ??
  postal_body: {
    type: String,
    default: null,
    required: false
  }
}
);

const User = mongoose.model('usuarios', userSchema);

mongoose.connect(connectionString);

module.exports = {User};