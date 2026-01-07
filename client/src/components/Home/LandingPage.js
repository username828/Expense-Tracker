import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import {
  FaBars,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaGithub,
} from "react-icons/fa"; // Font Awesome icons

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center">
        {/* <div className="flex items-center space-x-4">
          <button onClick={toggleSidebar} className="text-2xl">
            <FaBars />
          </button>
          
        </div> */}
        <h1 className="text-xl font-bold">Expense Tracker</h1>
        <div className="space-x-4">
          <button
            className="hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="hover:underline"
            onClick={() => navigate("/signUp")}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="bg-gray-200 p-6 flex-grow">
        <p className="text-green-700 text-2xl text-center font-semibold mb-6">
          Welcome to Expense Tracker App
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            id="add-expense"
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 hover:translate-y-2 transition-all duration-300 min-h-[300px] hover:cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-center mb-4">
              Add Expense
            </h3>
            <img
              src="/expense1.jpg"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-center">Log your daily expenses easily</p>
          </div>

          <div
            id="view-expenses"
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 hover:translate-y-2 transition-all duration-300 min-h-[300px] hover:cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-center mb-4">
              View Expenses
            </h3>
            <img
              src="/expense2.jpg"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-center">
              View a detailed breakdown of your expenses
            </p>
          </div>

          <div
            id="budget-management"
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 hover:translate-y-2 transition-all duration-300 min-h-[300px] hover:cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-center mb-4">
              Budget Management
            </h3>
            <img
              src="/budget.jpeg"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-center">Set and track your budget goals</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-4 mt-auto">
        <div className="flex justify-center space-x-6 mb-2">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-xl hover:text-gray-300" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-xl hover:text-gray-300" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-xl hover:text-gray-300" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-xl hover:text-gray-300" />
          </a>
        </div>
        <p className="text-center">
          &copy; 2024 Expense Tracker. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
