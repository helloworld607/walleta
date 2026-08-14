const mongoose = require("mongoose");

async function connectDB() {
  try {
    console.log("Connecting");
    mongoose.connect("mongodb://localhost:27017/walleta");
    console.log("Connect Successfully");
  } catch (error) {
    console.log("Connection error", error);
  }
}

module.exports = connectDB;
