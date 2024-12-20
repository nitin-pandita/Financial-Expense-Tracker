import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpenseCharts from "./ExpenseChart";
import EditExpense from "./EditExpense";
import AddExpense from "./AddExpense";
import Navbar from "./Navbar";
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
        console.log("Hey buddy light weigh");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error.message);
      }
    };
    fetchExpense();
  }, []);

  return (
    <div>
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between p-6 bg-gray-100 gap-6">
        <div className="w-full lg:w-3/5 bg-white shadow-lg rounded-lg p-6">
          <ExpenseCharts expenses={expenses} />
        </div>
        <div className="w-full lg:w-2/5 bg-white shadow-lg rounded-lg p-6">
          <AddExpense expense={expenses} setExpense={setExpense} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
