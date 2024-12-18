const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// User contains the model for the user
const User = require("../models/user.model");

// use of router is to create routes

const router = express.Router();

// signup route
router.post("/signup", async (req, res) => {
  console.log(req.body);

  const { name, email, password } = req.body;
  try {
    // if user exits
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // creating a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    console.log("hey");
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check password
    console.log("hey");

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generating a web token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
