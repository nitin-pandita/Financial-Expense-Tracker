import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ExpenseCharts from "./ExpenseChart";
const ViewExpense = () => {
  const [expenses, setExpense] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchExpense = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/expenses", {
        headers: {
          Authorization: token,
        },
      });
      setExpense(response.data);
    };
    fetchExpense();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/expenses/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setExpense(expenses.filter((expense) => expense._id !== id));
      setMessage("Expense deleted successfully!");
    } catch (error) {
      console.error("Error deleting expense", error.message);
      setMessage("Failed to delete expense");
    }
  };

  return (
    <div>
      Your Expense
      <div></div>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            <p>{expense.title}</p>
            <p>{expense.amount}</p>
            <p>{expense.category}</p>
            <Link to={`/edit-expense/${expense._id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDelete(expense._id)}>
              Delete Expense
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewExpense;
