import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpenseCharts from "./ExpenseChart";
import EditExpense from "./EditExpense";
import AddExpense from "./AddExpense";
const Dashboard = () => {
  const [expenses, setExpense] = useState([]);
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/expenses", {
          headers: {
            Authorization: token,
          },
        });
        setExpense(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error.message);
      }
    };
    fetchExpense();
  }, []);
  return (
    <div>
      <AddExpense expense={expenses} setExpense={setExpense} />
      <ExpenseCharts expenses={expenses} />
    </div>
  );
};

export default Dashboard;
