import React, { useState, useEffect, useRef } from "react";

const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const Report = ({ selectedReport, setSelectedReport }) => {
  const [reports, setReports] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(`${backendUrl}/reporttab`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }

        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  const handleReportClick = (report) => {
    setSelectedReport(report);
    setShowPopup(true);
  };

  const handleAcceptReport = () => {
    // Handle the acceptance logic here
    setShowPopup(false);
  };

  const handleDownloadReport = async (reportTitle) => {
    const fileName = `${reportTitle}.pdf`;
    const fileUrl = `/Reports/${fileName}`;

    try {
      const response = await fetch(fileUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to download report");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();

      // Remove the downloaded report from the reports state
      setReports((prevReports) =>
        prevReports.filter((report) => report.title !== reportTitle)
      );
      setShowPopup(false);
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };

  return (
    <div className={`p-4 `}>
      <div className="max-w-full ">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
          <thead>
            <tr>
              <th
                className={`px-2 py-1 border-b text-center bg-red-100 dark:bg-red-900 text-xs md:text-base dark:text-white  text-black`}
              >
                Sr No
              </th>
              <th
                className={`px-2 py-1 border-b text-center bg-red-100 dark:bg-red-900 text-xs md:text-base dark:text-white text-black
                }`}
              >
                Title
              </th>
              <th
                className={`px-2 py-1 border-b text-center bg-red-100 dark:bg-red-900 text-xs md:text-base dark:text-white text-black`}
              >
                Club
              </th>
              <th
                className={`px-2 py-1 border-b text-center bg-red-100 dark:bg-red-900 text-xs md:text-base dark:text-white text-black`}
              >
                Faculty Coordinator
              </th>
              <th
                className={`px-2 py-1 border-b text-center bg-red-100 dark:bg-red-900 text-xs md:text-base dark:text-white text-black`}
              >
                Venue
              </th>
            </tr>
          </thead>
          <tbody
            className={`bg-white dark:bg-gray-900 divide-y text-center divide-gray-200 dark:divide-gray-700 dark:text-white text-black`}
          >
            {reports.map((report, index) => (
              <tr
                key={report.id}
                onClick={() => {
                  handleReportClick(report);
                  console.log(
                    `Title: ${report.title}, Club: ${report.clubs}, Venue: ${report.venue}`
                  );
                }}
                className={`hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-center dark:text-white  text-black`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {report.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {report.clubs}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {report.facultyCoordinator}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {report.venue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            ref={popupRef}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow-lg"
          >
            <button
              onClick={() => handleDownloadReport(selectedReport.title)}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
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
