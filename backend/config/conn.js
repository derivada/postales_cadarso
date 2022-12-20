var mongoose = require('mongoose');
const connectionString = process.env.DB_URI.replace('<password>', process.env.DB_PWD);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(connectionString)
    console.log(`Connected to MongoDB: ${conn.connection.host}`)
  } catch (error) {
    console.log('Couldn\'t connect to MongoDB!')
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB