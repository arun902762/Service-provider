// backend/routes/workRequestRoutes.js
const express = require("express");
const mongoose = require("mongoose");
const WorkRequest = require("../models/WorkRequest");

const router = express.Router();

let fallbackJobs = [
  { id: 101, title: "बाथरूम की टंकी और 2 नए नल फिट कराने हैं", category: "plumber", budget: 800, city: "Alambagh, Lucknow", customerPhone: "9988776655", postedAt: "2 घंटे पहले" },
  { id: 102, title: "छत पर ईंट और सीमेंट चढ़ाने के लिए 2 लेबर चाहिए", category: "labour", budget: 1000, city: "Kalyanpur, Kanpur", customerPhone: "9876501234", postedAt: "आज सुबह" }
];

const isDbReady = () => mongoose.connection.readyState === 1;

// 1. GET: सभी पोस्ट किए गए काम प्राप्त करें
router.get("/", async (req, res) => {
  try {
    if (isDbReady()) {
      let jobs = await WorkRequest.find().sort({ id: -1 });
      if (jobs.length === 0) {
        await WorkRequest.insertMany(fallbackJobs);
        jobs = await WorkRequest.find().sort({ id: -1 });
      }
      return res.json(jobs);
    }
    res.json(fallbackJobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. POST: नया काम पोस्ट करें
router.post("/", async (req, res) => {
  try {
    const newJob = {
      id: Date.now(),
      postedAt: "अभी-अभी",
      ...req.body
    };

    if (isDbReady()) {
      const saved = await WorkRequest.create(newJob);
      return res.status(201).json(saved);
    }

    fallbackJobs.unshift(newJob);
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;