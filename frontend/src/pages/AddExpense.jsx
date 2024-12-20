import axios from "axios";
import React, { useState } from "react";
const AddExpense = ({ expense, setExpense }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    // Update state with form data
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("User not logged in");
        return;
      }

      // Send POST request to backend
      const response = await axios.post(
        "http://localhost:3000/expenses", // Adjust the URL as needed
        formData,
        {
          headers: {
            Authorization: token, // Use the token directly, no need to parse it
            "Content-Type": "application/json",
          },
        }
      );
      setExpense([...expense, response.data]);
      setMessage("Expense Data Added Successfully");

      console.log(response.data); // For debugging purposes, log the response
    } catch (error) {
      // Log the error to get more information
      console.error(
        "Error adding expense:",
        error.response?.data || error.message
      );
      setMessage("Failed to Add Expense Data");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Add Expense</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-gray-50 p-6 rounded-lg shadow-lg"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          onChange={handleChange}
          required
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
          required
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Add Expense
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
};

export default AddExpense;
