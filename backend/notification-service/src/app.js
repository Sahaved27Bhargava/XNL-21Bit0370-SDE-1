const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Notification Schema & Model
const NotificationSchema = new mongoose.Schema({
  userId: String,
  message: String,
  status: String,
}, { timestamps: true });

const Notification = mongoose.model("Notification", NotificationSchema);

// **Fix: Default GET Route**
app.get("/", (req, res) => {
  res.send("✅ Notification Service is running!");
});

// **Fix: POST Route for Sending Notifications**
app.post("/notifications/send", async (req, res) => {
  try {
    const { userId, message, status } = req.body;
    if (!userId || !message || !status) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const notification = new Notification({ userId, message, status });
    const savedNotification = await notification.save();

    console.log("✅ Notification saved:", savedNotification);

    res.status(201).json({ success: true, data: savedNotification });
  } catch (error) {
    console.error("❌ Error saving notification:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// **Fix: GET Route for Fetching Notifications**
app.get("/notifications", async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    console.error("❌ Error fetching notifications:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// **Fix: Correct Port Handling**
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`🚀 Notification Service running on port ${PORT}`);
});
