import React, { useState } from "react";

const FinancialCalculator = () => {
  // Loan Calculator States
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  // Interest Calculator States
  const [depositAmount, setDepositAmount] = useState("");
  const [savingsRate, setSavingsRate] = useState("");
  const [years, setYears] = useState("");
  const [finalAmount, setFinalAmount] = useState(null);

  // Currency Converter States
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);

  // Sample currency exchange rates
  const exchangeRates = {
    USD: { INR: 82, EUR: 0.91, GBP: 0.78 },
    INR: { USD: 0.012, EUR: 0.011, GBP: 0.0095 },
    EUR: { USD: 1.1, INR: 89.5, GBP: 0.86 },
    GBP: { USD: 1.28, INR: 105, EUR: 1.16 },
  };

  // Loan Calculator Function
  const calculateLoan = () => {
    const r = interestRate / 100 / 12;
    const n = loanTenure * 12;
    const payment = (loanAmount * r) / (1 - Math.pow(1 + r, -n));
    setMonthlyPayment(payment.toFixed(2));
  };

  // Interest Calculator Function
  const calculateSavings = () => {
    const rate = savingsRate / 100;
    const final = depositAmount * Math.pow(1 + rate, years);
    setFinalAmount(final.toFixed(2));
  };

  // Currency Converter Function
  const convertCurrency = () => {
    if (exchangeRates[fromCurrency] && exchangeRates[fromCurrency][toCurrency]) {
      const rate = exchangeRates[fromCurrency][toCurrency];
      setConvertedAmount((amount * rate).toFixed(2));
    } else {
      setConvertedAmount("Invalid Conversion");
    }
  };

  return (
    <div className="financial-calculator">
      <h2>Financial Calculators</h2>

      {/* Loan Calculator */}
      <div className="calculator-section">
        <h3>Loan Calculator</h3>
        <input type="number" placeholder="Loan Amount" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
        <input type="number" placeholder="Interest Rate (%)" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
        <input type="number" placeholder="Loan Tenure (years)" value={loanTenure} onChange={(e) => setLoanTenure(e.target.value)} />
        <button onClick={calculateLoan}>Calculate</button>
        {monthlyPayment && <p>Monthly Payment: ${monthlyPayment}</p>}
      </div>

      {/* Interest Calculator */}
      <div className="calculator-section">
        <h3>Interest Calculator</h3>
        <input type="number" placeholder="Deposit Amount" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
        <input type="number" placeholder="Interest Rate (%)" value={savingsRate} onChange={(e) => setSavingsRate(e.target.value)} />
        <input type="number" placeholder="Years" value={years} onChange={(e) => setYears(e.target.value)} />
        <button onClick={calculateSavings}>Calculate</button>
        {finalAmount && <p>Final Amount: ${finalAmount}</p>}
      </div>

      {/* Currency Converter */}
      <div className="calculator-section">
        <h3>Currency Converter</h3>
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="INR">INR</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="INR">INR</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
        <button onClick={convertCurrency}>Convert</button>
        {convertedAmount && <p>Converted Amount: {convertedAmount} {toCurrency}</p>}
      </div>
    </div>
  );
};

export default FinancialCalculator;
