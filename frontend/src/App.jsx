import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import AddExpense from "./pages/AddExpense";
import Login from "./pages/Login";
import ViewExpense from "./pages/ViewExpense";
import EditExpense from "./pages/EditExpense";
import ExpenseCharts from "./pages/ExpenseChart";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/expense" element={<AddExpense />} />
        <Route path="/view-expense" element={<ViewExpense />} />
        <Route path="/edit-expense/:id" element={<EditExpense />} />
        <Route path="chart" element={<ExpenseCharts />} />
      </Routes>
    </Router>
  );
}

export default App;
