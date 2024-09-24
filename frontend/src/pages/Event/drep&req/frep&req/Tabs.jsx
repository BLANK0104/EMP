import React, { useState } from "react";

const Tabs = ({ activeTab, handleTabClick }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <div className={`flex flex-col items-center ${isDarkMode ? "dark" : ""}`}>
      <div className="flex flex-col items-center bg-red-50 dark:bg-gray-800 p-1 w-full rounded-md">
        <div className="flex justify-center items-center">
          <button
            onClick={() => handleTabClick("requests")}
            className={`${
              activeTab === "requests"
                ? "text-red-500 dark:text-red-700"
                : "dark:text-white"
            } hover:text-red-500 mx-2 text-lg `}
          >
            Requests
          </button>
          <div className="border-l-2 border-gray-300 h-6 mx-2"></div>
          <button
            onClick={() => handleTabClick("reports")}
            className={`${
              activeTab === "reports"
                ? "text-red-500 dark:text-red-700"
                : "dark:text-white"
            } hover:text-red-500 mx-2 text-lg `}
          >
            Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
