import React, { useState } from "react";

const Report = ({ reports, selectedReport, setSelectedReport }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const handleReportClick = (report) => {
    setSelectedReport(report);
    setShowPopup(true);
  };

  const handleAcceptReport = () => {
    // Handle the acceptance logic here
    setShowPopup(false);
  };

  return (
    <div className={`p-4 ${isDarkMode ? "dark" : ""}`}>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Sno
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Club
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Faculty Coordinator
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Venue
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {reports.map((report, index) => (
            <tr
              key={report.id}
              onClick={() => handleReportClick(report)}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{report.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{report.club}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {report.facultyCoordinator}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{report.venue}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-lg">
            <p className="dark:text-white">Detailed Report goes here</p>
            <button
              onClick={handleAcceptReport}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
