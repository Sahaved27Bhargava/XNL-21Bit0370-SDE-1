const Notification = require("../models/notification");

// ✅ Send Notification
exports.sendNotification = async (req, res) => {
  try {
    const { userId, message, status } = req.body;
    if (!userId || !message) {
      return res.status(400).json({ success: false, error: "Missing userId or message" });
    }

    const notification = new Notification({
      userId,
      message,
      status: ["unread", "read", "sent"].includes(status) ? status : "unread",
    });

    const savedNotification = await notification.save();
    console.log("✅ Notification sent:", savedNotification);

    res.status(201).json({ success: true, data: savedNotification });
  } catch (error) {
    console.error("❌ Error sending notification:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Fetch All Notifications
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    console.error("❌ Error fetching notifications:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Mark as Read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, { status: "read" }, { new: true });

    if (!notification) {
      return res.status(404).json({ success: false, error: "Notification not found" });
    }

    res.status(200).json({ success: true, data: notification });
  } catch (error) {
    console.error("❌ Error updating notification:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Delete Notification
exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNotification = await Notification.findByIdAndDelete(id);

    if (!deletedNotification) {
      return res.status(404).json({ success: false, error: "Notification not found" });
    }

    res.status(200).json({ success: true, message: "Notification deleted" });
  } catch (error) {
    console.error("❌ Error deleting notification:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
