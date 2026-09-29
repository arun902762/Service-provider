// backend/models/Worker.js
const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    dailyWage: { type: Number, required: true },
    experience: { type: Number, required: true },
    rating: { type: Number, default: 4.5 },
    reviewsCount: { type: Number, default: 1 },
    verified: { type: Boolean, default: true },
    skills: { type: [String], required: true }, // जैसे: ["electrician", "plumber"]
    subSkills: { type: [String], default: [] },
    available: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Worker", workerSchema);