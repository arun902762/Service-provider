// backend/models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    workerId: { type: Number, required: true },
    workerName: { type: String, required: true },
    workerPhone: { type: String, required: true },
    dailyWage: { type: Number, required: true },
    customerName: { type: String, required: true },
    address: { type: String, required: true },
    workDate: { type: String, required: true },
    status: { type: String, default: "Pending" } // "Pending" या "Completed"
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);