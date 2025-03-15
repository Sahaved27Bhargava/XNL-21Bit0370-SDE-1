const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ["unread", "read", "sent"], default: "unread" },
}, { timestamps: true });

module.exports = mongoose.model("Notification", NotificationSchema);
