// backend/server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const workerRoutes = require("./routes/workerRoutes");
const workRequestRoutes = require("./routes/workRequestRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// API Routes
app.use("/api/workers", workerRoutes);
app.use("/api/jobs", workRequestRoutes);
app.use("/api/bookings", bookingRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.send("🛠️ KaamWala Backend API is Running!");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});