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
      <div className=" max-w-full">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
            <tr>
              <th className="px-2 py-1 border-b text-center bg-red-100 rounded-tl-lg dark:bg-red-900 text-xs md:text-base">
                Sr No
              </th>
              <th className="px-2 py-1 border-b text-center bg-red-100 dark:bg-red-900 text-xs md:text-base">
                Title
              </th>
              <th className="px-2 py-1 border-b text-center bg-red-100 dark:bg-red-900 text-xs md:text-base">
                Club
              </th>
              <th className="px-2 py-1 border-b text-center bg-red-100 dark:bg-red-900 text-xs md:text-base">
                Faculty Coordinator
              </th>
              <th className="px-2 py-1 border-b text-center bg-red-100 dark:bg-red-900 text-xs md:text-base">
                Venue
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y text-center divide-gray-200 dark:divide-gray-700">
            {reports.map((report, index) => (
              <tr
                key={report.id}
                onClick={() => handleReportClick(report)}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-center"
              >
                <td className="px-6 py-4 whitespace-nowrap text-center">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">{report.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">{report.club}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {report.facultyCoordinator}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">{report.venue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-lg">
            <button
              onClick={handleAcceptReport}
              className="mt-2 px-4 py-2 bg-grees-500 text-white rounded"
            >
              Download Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;