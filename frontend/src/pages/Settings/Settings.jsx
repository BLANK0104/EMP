import React, { useEffect, useState } from "react";
import { Camera, Edit3 } from "lucide-react";
const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const SettingsPage = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const response = await fetch(`${backendUrl}/settings`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user settings.");
        }

        const data = await response.json();
        console.log(data);
        setName(data.username.username);
        setEmail(data.email);
        setImage(`/Club_logo/${data.username.username}.jpg`);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user settings:", error);
        setError("Failed to fetch user settings.");
        setLoading(false);
      }
    };

    fetchUserSettings();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/change-password`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to change password.");
      }

      const result = await response.json();
      alert("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Failed to change password:", error);
      setError("Failed to change password.");
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // Implement logout functionality
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    alert(error);
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="container mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-2xl flex-1 max-w-4xl">
        <h1 className="text-transparent font-bold bg-clip-text bg-gradient-to-r from-red-500 to-red-700 dark:from-red-600 dark:to-red-800 text-2xl sm:text-3xl text-center mb-6 sm:mb-8">
          Settings
        </h1>
        {/* Profile Section */}
        <div className="mb-6 sm:mb-8 bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center">
            <img
              src={image}
              alt="Profile Photo"
              className="w-24 sm:w-36 h-24 sm:h-36 rounded-full object-cover mb-4 sm:mb-0 sm:mr-7"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-lg sm:text-xl font-semibold">Hi, {name}!</h2>
              <p className="text-md sm:text-lg text-gray-800 dark:text-gray-200">
                {email}
              </p>
              <button className="mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-md flex items-center hover:bg-red-700 transition-colors">
                <Camera size={18} className="mr-2" />
                Change Profile Picture
              </button>
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="mb-6 sm:mb-8 bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
          <h3 className="text-xl sm:text-2xl mb-4 sm:mb-5 text-gray-900 dark:text-gray-100">
            Change Password
          </h3>
          <form onSubmit={handleChangePassword}>
            <label
              htmlFor="current-password"
              className="block mb-2 text-gray-900 dark:text-gray-100 text-md sm:text-lg"
            >
              Current Password:
            </label>
            <input
              type="password"
              id="current-password"
              className="w-full p-3 border border-gray-400 dark:border-gray-600 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />

            <label
              htmlFor="new-password"
              className="block mb-2 mt-4 text-gray-900 dark:text-gray-100 text-md sm:text-lg"
            >
              New Password:
            </label>
            <input
              type="password"
              id="new-password"
              className="w-full p-3 border border-gray-400 dark:border-gray-600 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <label
              htmlFor="confirm-password"
              className="block mb-2 mt-4 text-gray-900 dark:text-gray-100 text-md sm:text-lg"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full p-3 border border-gray-400 dark:border-gray-600 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full mt-6 py-2 sm:py-3 bg-gradient-to-r from-red-500 to-red-700 dark:from-red-700 dark:to-red-900 text-white rounded-md hover:from-red-600 hover:to-red-800 dark:hover:from-red-800 dark:hover:to-red-900 transition-all duration-300"
            >
              Change Password
            </button>
          </form>
        </div>

        {/* Logout Section */}
        <div className="mb-6 sm:mb-8 bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full py-2 sm:py-3 bg-gradient-to-r from-red-600 to-red-800 dark:from-red-800 dark:to-red-900 text-white rounded-md hover:from-red-700 hover:to-red-900 dark:hover:from-red-900 dark:hover:to-red-950 transition-all duration-300"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;