var mongoose = require('mongoose');
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI)
    console.log(`Connected to MongoDB: ${conn.connection.host}`)
  } catch (error) {
    console.log('Couldn\'t connect to MongoDB!')
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB