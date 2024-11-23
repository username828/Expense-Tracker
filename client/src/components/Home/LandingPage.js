import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Welcome to Our App</h1>
        
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature Cards */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-blue-500 mb-4">Feature 1</h3>
            <p className="text-gray-700">A brief description of feature 1 goes here.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-blue-500 mb-4">Feature 2</h3>
            <p className="text-gray-700">A brief description of feature 2 goes here.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-blue-500 mb-4">Feature 3</h3>
            <p className="text-gray-700">A brief description of feature 3 goes here.</p>
          </div>
        </div>

        {/* Links to Login and Sign Up */}
        <div className="mt-8 text-center">
          <Link to="/login" className="text-blue-600 hover:text-blue-800 mr-4">Login</Link>
          <Link to="/signup" className="text-blue-600 hover:text-blue-800">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
