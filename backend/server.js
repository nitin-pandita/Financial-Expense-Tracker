const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

const expenseRoutes = require("./routes/Expense");
app.use("/expenses", expenseRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to Mongo Db");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Backend server is running!");
});
