// backend/models/WorkRequest.js
const mongoose = require("mongoose");

const workRequestSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true }, // जैसे: "plumber", "labour"
    budget: { type: Number, required: true },
    city: { type: String, required: true },
    customerPhone: { type: String, required: true },
    postedAt: { type: String, default: "अभी-अभी" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkRequest", workRequestSchema);