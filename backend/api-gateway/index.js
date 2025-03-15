const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`🔄 Proxying request: ${req.method} ${req.url}`);
    next();
});

// ✅ Fix API Gateway routes
app.use("/api/users", createProxyMiddleware({ target: "http://localhost:5001", changeOrigin: true }));
app.use("/api/transactions", createProxyMiddleware({ target: "http://localhost:5002", changeOrigin: true }));
app.use("/api/risk", createProxyMiddleware({ target: "http://localhost:5003", changeOrigin: true }));
app.use("/api/notifications", createProxyMiddleware({ target: "http://localhost:5004", changeOrigin: true }));

// Default route
app.get("/", (req, res) => {
    res.send("🚀 API Gateway is running! Use /api/users, /api/transactions, /api/risk, /api/notifications");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 API Gateway running on port ${PORT}`));
