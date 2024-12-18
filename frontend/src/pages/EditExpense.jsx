import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditExpense = () => {
  const { id } = useParams(); // Get the expense ID from the URL
  const navigate = useNavigate(); // For navigation after successful update

  // State for form data
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
  });
  const [message, setMessage] = useState("");

  // Fetch the expense details when the component mounts
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/expenses/${id}`,
          {
            headers: { Authorization: token },
          }
        );
        setFormData(response.data); // Pre-fill the form with fetched data
      } catch (error) {
        setMessage("Failed to load expense details");
      }
    };

    fetchExpense();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for updating the expense
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3000/expenses/${id}`, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      setMessage("Expense updated successfully!");
      navigate("/"); // Redirect to the expenses list
    } catch (error) {
      setMessage("Failed to update expense");
    }
  };

  return (
    <div>
      <h2>Edit Expense</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="amount"
          value={formData.amount}
          placeholder="Amount"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          placeholder="Category"
          onChange={handleChange}
          required
        />
        <button type="submit">Update Expense</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditExpense;
