import React, { useState } from "react";
import axios from "axios";

const UserProfile = (props) => {
  const user = props.user;
  const id = user._id;
  const [isPasswordChange, setIsPasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${process.ENV.BASE_URL}/api/change-password`,
        {
          id,
          currentPassword,
          newPassword,
          confirmPassword,
        },

        { withCredentials: true }
      );
      console.log(response.data);
      setSuccess(response.data.message);
      setError("");
    } catch (error) {
      setError(error.response.data.message || "An error occurred");
      setSuccess("");
    }
  };

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
        {isPasswordChange ? "Cancel Change" : "Change Password"}
      </button>

      {isPasswordChange && (
        <div className="mt-4">
          <label
            htmlFor="currentPassword"
            className="block text-sm font-semibold text-gray-700"
          >
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <label
            htmlFor="newPassword"
            className="block text-sm font-semibold text-gray-700 mt-4"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <label
            htmlFor="confirmPassword"
            className="block text-sm font-semibold text-gray-700 mt-4"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}

          <button
            onClick={handlePasswordChange}
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
