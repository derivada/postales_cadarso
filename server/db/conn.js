/**
 * Conexión a MongoDB y schema de la tabla de usuarios   con MOngoose
 */

var mongoose = require('mongoose');
const validator = require('validator');

require('dotenv').config({ path: __dirname + '/.env' })
const connectionString = process.env.ATLAS_URI.replace('<password>', process.env.ATLAS_PWD);

const userSchema = new mongoose.Schema({
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
  link: {
    type: String,
    required: false,
  },
  opened: {
    type: Boolean,
    default: false,
  },
  opened_timestamp: {
    type: Date,
    required: false
  }
}
);

const User = mongoose.model('usuarios', userSchema);
mongoose.connect(connectionString);

module.exports = User;