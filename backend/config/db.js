// backend/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/");
    console.log("✅ MongoDB Database Connected Successfully!");
  } catch (error) {
    console.log("⚠️ MongoDB अभी चालू नहीं है, सर्वर Fallback Memory Mode में चलेगा।");
  }
};

module.exports = connectDB;