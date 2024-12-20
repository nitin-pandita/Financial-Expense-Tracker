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
    budget: "",
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
      // Ensure that amount and budget are numbers
      const updatedData = {
        ...formData,
        amount: parseFloat(formData.amount),
        budget: parseFloat(formData.budget),
      };
      await axios.put(`http://localhost:3000/expenses/${id}`, updatedData, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      setMessage("Expense updated successfully!");
      navigate("/dashboard"); // Redirect to the expenses list
    } catch (error) {
      setMessage("Failed to update expense");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-10 px-4">
      <h2 className="text-3xl font-bold text-gray-700 mb-6">Edit Expense</h2>
      {message && (
        <p
          className={`text-lg font-medium mb-4 ${
            message.includes("successfully") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg w-full max-w-md p-6"
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-gray-700 font-medium mb-2"
          >
            Amount
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-gray-700 font-medium mb-2"
          >
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="budget"
            className="block text-gray-700 font-medium mb-2"
          >
            Budget
          </label>
          <input
            type="number"
            name="budget"
            id="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Budget"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Update Expense
        </button>
      </form>
    </div>
  );
};

export default EditExpense;
