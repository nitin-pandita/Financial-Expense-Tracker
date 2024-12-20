const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

const jwt = require("jsonwebtoken");

// middleware to verify the token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  console.log(token);
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// create an expense

router.post("/", verifyToken, async (req, res) => {
  const { title, amount, category, budget } = req.body;
  try {
    const expense = new Expense({
      userId: req.user.id,
      title,
      amount,
      category,
      budget,
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// getting all expenses
router.get("/", verifyToken, async (req, res) => {
  try {
    const expense = await Expense.find({ userId: req.user.id });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// getting a single expense
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// updating the expense

router.put("/:id", verifyToken, async (req, res) => {
  const { title, amount, category, budget } = req.body;
  try {
    const updateExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        title,
        amount,
        category,
        budget,
      },
      { new: true }
    );

    if (!updateExpense)
      return res.status(404).json({ message: "Expense not found" });
    res.status(200).json(updateExpense);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// deleting the expense
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleteExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deleteExpense)
      return res.status(404).json({ message: "Expense not found" });
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
