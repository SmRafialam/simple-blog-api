const dotenv = require("dotenv");
dotenv.config();
const mongoose = require('mongoose');

const connectionToMongodb = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
      } catch (err) {
        console.error('MongoDB connection failed', err.message);
        process.exit(1);
      }
}

module.exports = connectionToMongodb;