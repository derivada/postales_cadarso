var mongoose = require('mongoose');
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI)
    console.log(`Conectando a MongoDB: ${conn.connection.host}`)
  } catch (error) {
    console.log('No se pudo conectar a MongoDB!')
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB