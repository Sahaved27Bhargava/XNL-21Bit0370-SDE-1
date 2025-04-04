const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 User-Service is running on port ${PORT}`);
});
