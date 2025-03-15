import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:5003"); // Make sure this matches your backend URL

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Check if the socket is connected
    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket Server");
    });

    // Listen for deposit notifications
    socket.on("depositNotification", (message) => {
      console.log("📩 New Notification:", message);
      setNotifications((prev) => [...prev, message]);
    });

    return () => {
      socket.off("depositNotification"); // Clean up
    };
  }, []);

  return (
    <div>
      <h3>Notifications</h3>
      {notifications.length === 0 ? (
        <p>No notifications yet</p>
      ) : (
        <ul>
          {notifications.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
