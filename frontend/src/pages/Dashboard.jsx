import React from "react";
import TransactionHistory from "../components/TransactionHistory";
import Notifications from "../components/Notifications";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <TransactionHistory />
    </div>
  );
};

export default Dashboard;
