const mongoose = require("mongoose");

const connectDB = () => {
  console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);
  return mongoose.connect(process.env.MONGODB_URI);
};

module.exports = connectDB;
