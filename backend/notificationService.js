const notifications = [];

const addNotification = (userId, message) => {
    const notification = { userId, message, read: false, timestamp: new Date() };
    notifications.push(notification);
};

const getUnreadNotifications = (userId) => {
    return notifications.filter((n) => n.userId === userId && !n.read);
};

const markAsRead = (userId) => {
    notifications.forEach((n) => {
        if (n.userId === userId) {
            n.read = true;
        }
    });
};

module.exports = { addNotification, getUnreadNotifications, markAsRead };
