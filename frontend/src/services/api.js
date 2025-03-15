import axios from "axios";

const API_BASE_URL = "http://localhost:5002/api/transactions";  // Ensure this URL matches your backend

// Function to deposit money
export const deposit = async (amount, userId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/deposit`, {
      userId,
      amount,
    });
    return response.data;
  } catch (error) {
    console.error("Error making deposit:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to withdraw money
export const withdraw = async (amount, userId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/withdraw`, {
      userId,
      amount,
    });
    return response.data;
  } catch (error) {
    console.error("Error making withdrawal:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to transfer money
export const transfer = async (fromUserId, toUserId, amount) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/transfer`, {
      fromUserId,
      toUserId,
      amount,
    });
    return response.data;
  } catch (error) {
    console.error("Error making transfer:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to get transaction history
export const getTransactions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/history`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error.response ? error.response.data : error.message);
    throw error;
  }
};
