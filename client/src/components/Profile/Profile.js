import React, { useState } from 'react';
import { useSelector } from 'react-redux'; 

const UserProfile = (props) => {
  //const user = useSelector((state) => state.auth.user); // Access user from Redux store
  const user=props.user
  const [isPasswordChange, setIsPasswordChange] = useState(false);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile</h2>
      <div className="mb-4">
        <p className="text-lg font-medium text-gray-700">Name: {user.name}</p>
        <p className="text-lg text-gray-700">Email: {user.email}</p>
      </div>

      <button
        onClick={() => setIsPasswordChange(!isPasswordChange)}
        className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4"
      >
        {isPasswordChange ? 'Cancel Change' : 'Change Password'}
      </button>

      {isPasswordChange && (
        <div className="mt-4">
          <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700">New Password</label>
          <input
            type="password"
            id="newPassword"
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter new password"
          />
          <button
            className="w-full p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 mt-4"
          >
            Update Password
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
