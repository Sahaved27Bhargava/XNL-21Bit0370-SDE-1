require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5001;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Middleware
app.use(express.json());

// ✅ User Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes); // <-- Ensure this is correct

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 User Service running on port ${PORT}`);
});
