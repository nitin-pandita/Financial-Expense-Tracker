import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserLoggedIn(true);
    }
  }, []);

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-semibold">
          <Link to="/dashboard" className="text-white hover:text-gray-200">
            Expense Tracker
          </Link>
        </div>

        {/* Nav Links */}
        {userLoggedIn ? (
          <div className="space-x-4 hidden md:flex">
            <Link
              to="/dashboard"
              className="hover:text-gray-200 transition-colors duration-300"
            >
              Home
            </Link>

            <Link
              to="/view-expense"
              className="hover:text-gray-200 transition-colors duration-300"
            >
              View Expenses
            </Link>
          </div>
        ) : null}

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white hover:text-gray-200"
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && userLoggedIn && (
        <div className="md:hidden bg-blue-600 text-white space-y-4 py-4 px-6">
          <Link
            to="/dashboard"
            className="block hover:text-gray-200 transition-colors duration-300"
            onClick={toggleMobileMenu}
          >
            Home
          </Link>

          <Link
            to="/view-expense"
            className="block hover:text-gray-200 transition-colors duration-300"
            onClick={toggleMobileMenu}
          >
            View Expenses
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
