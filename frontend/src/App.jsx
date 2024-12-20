import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import AddExpense from "./pages/AddExpense";
import Login from "./pages/Login";
import ViewExpense from "./pages/ViewExpense";
import EditExpense from "./pages/EditExpense";
import ExpenseCharts from "./pages/ExpenseChart";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import Demo from "./pages/Demo";
import ProtectedRoute from "./pages/ProtectedRoute";
import Navbar from "./pages/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/demo" element={<Demo />} /> */}

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/expense" element={<AddExpense />} />
        <Route path="/view-expense" element={<ViewExpense />} />
        <Route path="/edit-expense/:id" element={<EditExpense />} />
        <Route path="chart" element={<ExpenseCharts />} />
      </Routes>
    </Router>
  );
}

export default App;
