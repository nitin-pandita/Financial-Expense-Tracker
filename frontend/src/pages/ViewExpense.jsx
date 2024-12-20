import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewExpense = () => {
  const [expenses, setExpense] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchExpense = async () => {
      const token = localStorage.getItem("token");
      try {
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
      console.error("Error deleting expense:", error.message);
      setMessage("Failed to delete expense");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">
        Your Expenses
      </h1>
      {message && (
        <p className="text-center text-lg text-green-600 mb-4">{message}</p>
      )}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {expenses.map((expense) => (
          <div
            key={expense._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {expense.title}
            </h2>
            <p className="text-gray-600">Amount: ₹{expense.amount}</p>
            <p className="text-gray-600">Category: {expense.category}</p>
            <div className="flex justify-between mt-4">
              <Link
                to={`/edit-expense/${expense._id}`}
                className="text-blue-500 hover:text-blue-700"
              >
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => handleDelete(expense._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {expenses.length === 0 && (
        <p className="text-center text-gray-600 mt-8">
          No expenses found. Add some to get started!
        </p>
      )}
    </div>
  );
};

export default ViewExpense;
