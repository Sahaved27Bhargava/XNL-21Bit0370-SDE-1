import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Styled Components
const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #2b5876, #4e4376);
`;

const DashboardContainer = styled.div`
    width: 500px;
    padding: 30px;
    border-radius: 15px;
    background: white;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    text-align: center;
`;

const Title = styled.h2`
    color: #333;
    margin-bottom: 20px;
`;

const Input = styled.input`
    width: 80%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Button = styled.button`
    padding: 10px 15px;
    margin: 5px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    transition: background 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const LogoutButton = styled(Button)`
    background-color: #dc3545;
    width: 100%;
    margin-top: 20px;

    &:hover {
        background-color: #c82333;
    }
`;

const TransactionList = styled.ul`
    list-style: none;
    padding: 0;
    margin-top: 10px;
`;

const TransactionItem = styled.li`
    padding: 10px;
    border-bottom: 1px solid #ddd;
    font-size: 16px;
    color: black; /* Ensuring text is black */
    background: #f8f9fa;
    border-radius: 5px;
    margin-bottom: 5px;
`;

const ErrorMessage = styled.p`
    color: red;
`;

const TransactionHistory = () => {
    const [userId, setUserId] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Navigation hook

    const fetchTransactions = async () => {
        if (!userId.trim()) {
            setError("Please enter a valid User ID.");
            return;
        }

        try {
            setError("");
            const response = await axios.get(`http://localhost:5002/api/transactions/${userId}`);
            setTransactions(response.data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
            setError("Failed to fetch transactions.");
        }
    };

    const handleDeposit = async () => {
        if (!userId.trim()) {
            setError("User ID is required.");
            return;
        }

        const amount = prompt("Enter deposit amount:");
        if (!amount || isNaN(amount) || amount <= 0) {
            alert("Invalid amount.");
            return;
        }

        try {
            await axios.post("http://localhost:5002/api/transactions/deposit", {
                userId: userId.trim(),
                amount: parseFloat(amount),
            });

            alert("Deposit successful!");
            fetchTransactions();
        } catch (error) {
            console.error("Deposit error:", error);
            setError("Deposit failed.");
        }
    };

    const handleWithdraw = async () => {
        if (!userId.trim()) {
            setError("User ID is required.");
            return;
        }

        const amount = prompt("Enter withdrawal amount:");
        if (!amount || isNaN(amount) || amount <= 0) {
            alert("Invalid amount.");
            return;
        }

        try {
            await axios.post("http://localhost:5002/api/transactions/withdraw", {
                userId: userId.trim(),
                amount: parseFloat(amount),
            });

            alert("Withdrawal successful!");
            fetchTransactions();
        } catch (error) {
            console.error("Withdraw error:", error);
            setError("Withdrawal failed.");
        }
    };

    const handleTransfer = async () => {
        if (!userId.trim()) {
            setError("User ID is required.");
            return;
        }

        const recipientId = prompt("Enter recipient User ID:");
        if (!recipientId.trim()) {
            alert("Recipient ID cannot be empty.");
            return;
        }

        const amount = prompt("Enter transfer amount:");
        if (!amount || isNaN(amount) || amount <= 0) {
            alert("Invalid amount.");
            return;
        }

        try {
            await axios.post("http://localhost:5002/api/transactions/transfer", {
                userId: userId.trim(),
                recipientId: recipientId.trim(),
                amount: parseFloat(amount),
            });

            alert("Transfer successful!");
            fetchTransactions();
        } catch (error) {
            console.error("Transfer error:", error);
            setError("Transfer failed.");
        }
    };

    const handleLogout = () => {
        navigate("/"); // Redirect to Home
    };

    return (
        <PageContainer>
            <DashboardContainer>
                <Title>Transaction History</Title>
                <Input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter User ID"
                />
                <Button onClick={fetchTransactions}>Load Transactions</Button>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <h3 style={{ color: "black" }}>Your Transactions</h3>
                {transactions.length === 0 ? (
                    <p style={{ color: "black" }}>No transactions found.</p>
                ) : (
                    <TransactionList>
                        {transactions.map((txn) => (
                            <TransactionItem key={txn._id}>
                                {txn.type.toUpperCase()}: ${txn.amount} <br />
                                {txn.recipientId ? `To: ${txn.recipientId}` : ""}
                            </TransactionItem>
                        ))}
                    </TransactionList>
                )}

                <h3 style={{ color: "black" }}>Make a Transaction</h3>
                <Button onClick={handleDeposit}>Deposit</Button>
                <Button onClick={handleWithdraw}>Withdraw</Button>

                <h3 style={{ color: "black" }}>Transfer Money</h3>
                <Button onClick={handleTransfer}>Transfer</Button>

                {/* Logout Button */}
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </DashboardContainer>
        </PageContainer>
    );
};

export default TransactionHistory;
