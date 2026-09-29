// backend/routes/workerRoutes.js
const express = require("express");
const mongoose = require("mongoose");
const Worker = require("../models/Worker");

const router = express.Router();

// शुरुआती 5 सैंपल वर्कर्स (सभी 9 कैटेगरी कवर करने के लिए)
let fallbackWorkers = [
  { id: 1, name: "Ramesh Kumar", phone: "9876543210", city: "Lucknow", pincode: "226001", dailyWage: 600, experience: 5, rating: 4.8, reviewsCount: 24, verified: true, skills: ["electrician", "plumber"], subSkills: ["Pipe Leakage", "House Wiring", "Fan/Cooler Repair"], available: true },
  { id: 2, name: "Suresh Yadav", phone: "9123456780", city: "Kanpur", pincode: "208001", dailyWage: 500, experience: 4, rating: 4.6, reviewsCount: 18, verified: true, skills: ["labour", "mason"], subSkills: ["Brickwork", "Construction Helper", "Tiles Fitting"], available: true },
  { id: 3, name: "Mahesh Vishwakarma", phone: "9988776655", city: "Lucknow", pincode: "226005", dailyWage: 700, experience: 7, rating: 4.9, reviewsCount: 31, verified: true, skills: ["carpenter", "welder"], subSkills: ["Door/Window", "Furniture Repair", "Iron Gate/Grill"], available: true },
  { id: 4, name: "Salim Khan", phone: "9765432109", city: "Varanasi", pincode: "221001", dailyWage: 650, experience: 6, rating: 4.7, reviewsCount: 15, verified: true, skills: ["painter", "cleaner"], subSkills: ["Wall Putty", "Whitewash", "Home Deep Clean"], available: true },
  { id: 5, name: "Deepak Sharma", phone: "9654321098", city: "Lucknow", pincode: "226010", dailyWage: 800, experience: 5, rating: 4.9, reviewsCount: 42, verified: true, skills: ["appliance", "electrician"], subSkills: ["AC Service", "Fridge Repair", "RO Purifier", "Inverter Fitting"], available: true }
];

const isDbReady = () => mongoose.connection.readyState === 1;

// 1. GET: सभी वर्कर्स प्राप्त करें
router.get("/", async (req, res) => {
  try {
    if (isDbReady()) {
      let workers = await Worker.find().sort({ id: -1 });
      if (workers.length === 0) {
        await Worker.insertMany(fallbackWorkers);
        workers = await Worker.find().sort({ id: -1 });
      }
      return res.json(workers);
    }
    res.json(fallbackWorkers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. POST: नया वर्कर रजिस्टर करें
router.post("/", async (req, res) => {
  try {
    const newWorker = {
      id: Date.now(),
      rating: 4.5,
      reviewsCount: 1,
      verified: true,
      available: true,
      ...req.body
    };

    if (isDbReady()) {
      const saved = await Worker.create(newWorker);
      return res.status(201).json(saved);
    }

    fallbackWorkers.unshift(newWorker);
    res.status(201).json(newWorker);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. PATCH: वर्कर का Available/Busy स्टेटस बदलें
router.patch("/:id/status", async (req, res) => {
  try {
    const workerId = Number(req.params.id);
    if (isDbReady()) {
      const worker = await Worker.findOne({ id: workerId });
      if (worker) {
        worker.available = !worker.available;
        await worker.save();
      }
      return res.json(worker);
    }

    fallbackWorkers = fallbackWorkers.map((w) =>
      w.id === workerId ? { ...w, available: !w.available } : w
    );
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 4. PATCH: वर्कर को Star Rating दें
router.patch("/:id/rate", async (req, res) => {
  try {
    const workerId = Number(req.params.id);
    const { stars } = req.body;

    if (isDbReady()) {
      const w = await Worker.findOne({ id: workerId });
      if (w) {
        const newCount = (w.reviewsCount || 1) + 1;
        w.rating = Number((((w.rating || 4.5) * (w.reviewsCount || 1) + stars) / newCount).toFixed(1));
        w.reviewsCount = newCount;
        await w.save();
      }
      return res.json(w);
    }

    fallbackWorkers = fallbackWorkers.map((w) => {
      if (w.id === workerId) {
        const newCount = (w.reviewsCount || 1) + 1;
        const newRating = (((w.rating || 4.5) * (w.reviewsCount || 1) + stars) / newCount).toFixed(1);
        return { ...w, rating: Number(newRating), reviewsCount: newCount };
      }
      return w;
    });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;