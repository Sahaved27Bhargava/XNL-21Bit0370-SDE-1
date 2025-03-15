const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const riskRoutes = require("./routes/riskRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Default Route
app.get("/", (req, res) => {
    res.send("API Gateway is Running!");
});

// Microservices Routes
app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);
app.use("/risks", riskRoutes);
app.use("/notifications", notificationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
