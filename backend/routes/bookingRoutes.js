// backend/routes/bookingRoutes.js
const express = require("express");
const mongoose = require("mongoose");
const Booking = require("../models/Booking");

const router = express.Router();

let fallbackBookings = [];
const isDbReady = () => mongoose.connection.readyState === 1;

// 1. GET: सभी बुकिंग्स प्राप्त करें
router.get("/", async (req, res) => {
  try {
    if (isDbReady()) {
      const bookings = await Booking.find().sort({ id: -1 });
      return res.json(bookings);
    }
    res.json(fallbackBookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. POST: नई बुकिंग बनाएँ
router.post("/", async (req, res) => {
  try {
    const newBooking = {
      id: Date.now(),
      status: "Pending",
      ...req.body
    };

    if (isDbReady()) {
      const saved = await Booking.create(newBooking);
      return res.status(201).json(saved);
    }

    fallbackBookings.unshift(newBooking);
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. PATCH: बुकिंग स्टेटस (Completed) अपडेट करें
router.patch("/:id", async (req, res) => {
  try {
    const bookingId = Number(req.params.id);
    const { status } = req.body;

    if (isDbReady()) {
      const updated = await Booking.findOneAndUpdate(
        { id: bookingId },
        { status },
        { new: true }
      );
      return res.json(updated);
    }

    fallbackBookings = fallbackBookings.map((b) =>
      b.id === bookingId ? { ...b, status } : b
    );
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 4. DELETE: बुकिंग हटाएँ
router.delete("/:id", async (req, res) => {
  try {
    const bookingId = Number(req.params.id);

    if (isDbReady()) {
      await Booking.deleteOne({ id: bookingId });
      return res.json({ success: true });
    }

    fallbackBookings = fallbackBookings.filter((b) => b.id !== bookingId);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;