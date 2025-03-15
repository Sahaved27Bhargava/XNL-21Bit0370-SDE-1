const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

// Define Routes
router.post("/send", notificationController.sendNotification);
router.get("/", notificationController.getAllNotifications);
router.patch("/:id", notificationController.markAsRead);
router.delete("/:id", notificationController.deleteNotification);

module.exports = router;
