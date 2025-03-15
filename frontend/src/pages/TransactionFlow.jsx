import React, { useEffect, useState } from "react";
import axios from "axios";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch transaction history from backend
    axios
      .get("http://localhost:5002/api/transactions/history")
      .then((response) => {
        setTransactions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setError("Failed to load transactions.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>

      {loading && <p>Loading transactions...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && transactions.length === 0 && (
        <p>No transactions found.</p>
      )}

      {!loading && transactions.length > 0 && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn._id} className="text-center">
                <td className="border p-2">{txn._id}</td>
                <td className="border p-2">{txn.type}</td>
                <td className="border p-2">${txn.amount}</td>
                <td className="border p-2">{txn.status}</td>
                <td className="border p-2">{new Date(txn.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionHistory;
