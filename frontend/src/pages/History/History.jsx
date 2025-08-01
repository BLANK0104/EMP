import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { FaDownload } from "react-icons/fa";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const History = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [semester, setSemester] = useState("All");
  const [selectedEntries, setSelectedEntries] = useState([]);
  const entriesPerPage = 6;

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const isEvenSemester = (date) => {
    const month = new Date(date).getMonth() + 1;
    return month >= 1 && month <= 5;
  };

  const isOddSemester = (date) => {
    const month = new Date(date).getMonth() + 1;
    return month >= 7 && month <= 12;
  };

  const filteredData = data.filter((item) => {
    const statusMatch = filter === "All" || item.status === filter;
    const dateMatch =
      (!startDate || new Date(item.date) >= new Date(startDate)) &&
      (!endDate || new Date(item.date) <= new Date(endDate));
    const semesterMatch =
      semester === "All" ||
      (semester === "Even" && isEvenSemester(item.date)) ||
      (semester === "Odd" && isOddSemester(item.date));
    return statusMatch && dateMatch && semesterMatch;
  });

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentEntries = filteredData.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  const handleCheckboxChange = (item) => {
    setSelectedEntries((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((i) => i !== item)
        : [...prevSelected, item]
    );
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`History Page`, 10, 10);
    doc.text(`Filter: ${filter}`, 10, 20);
    doc.text(`Start Date: ${startDate}`, 10, 30);
    doc.text(`End Date: ${endDate}`, 10, 40);
    doc.text(`Semester: ${semester}`, 10, 50);
    selectedEntries.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.club} - ${item.event} - ${item.date} - ${
          item.venue
        } - ${item.status}`,
        10,
        60 + index * 10
      );
    });
    doc.save("history.pdf");
  };

  const handleDownload = async (fileName) => {
    if (!fileName) {
      alert("Report has yet to be generated");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/download-pdf/${fileName}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to download PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert("Error downloading report");
    }
  };

  return (
    <div className="container mx-auto p-4 text-lg dark:text-gray-200 max-w-full">
      <h1 className="text-3xl font-bold mb-4 dark:text-gray-200">History</h1>
      <div className="flex flex-wrap justify-between items-center mb-4 space-y-4 md:space-y-0">
        <div className="w-full md:w-auto flex flex-wrap justify-center space-x-2">
          <div className="w-full md:w-auto max-w-xs">
            <label htmlFor="statusFilter" className="mr-2 dark:text-gray-200">
              Filter by Status:
            </label>
            <select
              id="statusFilter"
              value={filter}
              onChange={handleFilterChange}
              className="px-2 py-1 border rounded w-full md:w-auto dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            >
              <option value="All">All</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Modified">Modified</option>
            </select>
          </div>
          <div className="w-full md:w-auto max-w-xs">
            <label htmlFor="startDate" className="mr-2 dark:text-gray-200">
              From:
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={handleStartDateChange}
              className="px-2 py-1 border rounded w-full md:w-auto dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          </div>
          <div className="w-full md:w-auto max-w-xs">
            <label htmlFor="endDate" className="mr-2 dark:text-gray-200">
              To:
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={handleEndDateChange}
              className="px-2 py-1 border rounded w-full md:w-auto dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          </div>
          <div className="w-full md:w-auto max-w-xs">
            <label htmlFor="semesterFilter" className="mr-2 dark:text-gray-200">
              Filter by Semester:
            </label>
            <select
              id="semesterFilter"
              value={semester}
              onChange={handleSemesterChange}
              className="px-2 py-1 border rounded w-full md:w-auto dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            >
              <option value="All">All</option>
              <option value="Even">Even</option>
              <option value="Odd">Odd</option>
            </select>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <thead>
            <tr>
              <th className="px-2 py-1 border-b text-center bg-red-100 rounded-tl-lg dark:bg-red-900 text-xs md:text-base">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedEntries(currentEntries);
                    } else {
                      setSelectedEntries([]);
                    }
                  }}
                />
              </th>
              <th className="px-2 py-1 border-b text-center bg-red-100 dark:bg-red-900 text-xs md:text-base">
                Sr No
              </th>
              <th className="px-2 py-1 border-b text-center bg-red-100 dark:bg-red-900 text-xs md:text-base">
                Club
              </th>
              <th className="px-2 py-1 border-b text-center bg-red-100 dark:bg-red-900 text-xs md:text-base">
                Event
              </th>
              <th className="px-2 py-1 border-b text-center bg-red-100 dark:bg-red-900 text-xs md:text-base">
                Date
              </th>
              <th className="px-2 py-1 border-b text-center bg-red-100 dark:bg-red-900 text-xs md:text-base">
                Venue
              </th>
              <th className="px-2 py-1 border-b text-center bg-red-100 dark:bg-red-900 text-xs md:text-base">
                Status
              </th>
              <th className="px-2 py-1 border-b text-center bg-red-100 rounded-tr-lg dark:bg-red-900 text-xs md:text-base">
                Download Report
              </th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((item, index) => {
              const eventDate = new Date(item.date);
              const currentDate = new Date();
              return (
                <tr
                  key={index}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="px-2 py-1 border-b text-center align-middle dark:border-gray-600">
                    <input
                      type="checkbox"
                      checked={selectedEntries.includes(item)}
                      onChange={() => handleCheckboxChange(item)}
                    />
                  </td>
                  <td className="px-2 py-1 border-b text-center align-middle dark:border-gray-600">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-2 py-1 border-b text-center align-middle dark:border-gray-600">
                    {item.club}
                  </td>
                  <td className="px-2 py-1 border-b text-center align-middle dark:border-gray-600">
                    {item.event}
                  </td>
                  <td className="px-2 py-1 border-b text-center align-middle dark:border-gray-600">
                    {Array.isArray(item.date) ? item.date[0] : item.date}
                  </td>
                  <td className="px-2 py-1 border-b text-center align-middle dark:border-gray-600">
                    {Array.isArray(item.venue) ? (
                      item.venue.map((venue, i) => (
                        <span key={i}>
                          {venue}
                          {i < item.venue.length - 1 && ", "}
                          {i % 2 === 1 && <br />}
                        </span>
                      ))
                    ) : (
                      item.venue
                    )}
                  </td>
                  <td className="px-2 py-1 border-b text-center align-middle dark:border-gray-600">
                    {item.status}
                  </td>
                  <td className="px-2 py-1 border-b text-center align-middle dark:border-gray-600">
                    {item.status === "Approved" &&
                      currentDate > new Date(Array.isArray(item.date) ? item.date[0] : item.date) && (
                        <button
                          onClick={() => handleDownload(item.pdf_file_path)}
                          className="text-blue-500 hover:underline cursor-pointer"
                        >
                          Download
                        </button>
                      )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handlePreviousPage}
          className="px-2 py-1 mx-1 bg-gray-200 rounded hover:bg-gray-300 text-red-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
          disabled={currentPage === 1}
        >
          &larr;
        </button>
        <span className="px-2 py-1 dark:text-gray-200">{currentPage}</span>
        <button
          onClick={handleNextPage}
          className="px-2 py-1 mx-1 bg-gray-200 rounded hover:bg-gray-300 text-red-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
          disabled={currentPage === totalPages}
        >
          &rarr;
        </button>
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={generatePDF}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default History;