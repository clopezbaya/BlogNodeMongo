const mongoose = require('mongoose');
const connectDB = async () => {
  
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }

}

const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('Database Connection Closed');
  } catch (error) {
    console.log('Error closing the database connection:', error);
  }
}

module.exports = {
  connectDB,
  closeDB
};

