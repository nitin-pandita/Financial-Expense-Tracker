import React, { useState } from "react";
import axios from "axios";

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
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
          required
        />
        <button type="submit">Add Expense</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddExpense;
