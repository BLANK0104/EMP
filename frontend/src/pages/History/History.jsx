import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { FaDownload } from "react-icons/fa"; // Import FontAwesome download icon

const History = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [semester, setSemester] = useState("All");
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
  const selectedEntries = filteredData.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`History Page`, 10, 10);
    doc.text(`Filter: ${filter}`, 10, 20);
    doc.text(`Start Date: ${startDate}`, 10, 30);
    doc.text(`End Date: ${endDate}`, 10, 40);
    doc.text(`Semester: ${semester}`, 10, 50);
    selectedEntries.forEach((item, index) => {
      doc.text(
        `${startIndex + index + 1}. ${item.club} - ${item.event} - ${
          item.date
        } - ${item.venue} - ${item.status}`,
        10,
        60 + index * 10
      );
    });
    doc.save("history.pdf");
  };

  const handleDownload = (item) => {
    // Replace with actual backend call
    fetch(`/api/download/${item.id}`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${item.club}-${item.event}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
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
            {selectedEntries.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
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
                  {item.date}
                </td>
                <td className="px-2 py-1 border-b text-center align-middle dark:border-gray-600">
                  {item.venue}
                </td>
                <td className="px-2 py-1 border-b text-center align-middle dark:border-gray-600">
                  {item.status}
                </td>
                <td className="px-2 py-1 border-b text-center align-middle dark:border-gray-600">
  <a
    href={`/Reports/${item.event}.pdf`}
    download
    className="text-blue-500 hover:underline"
    onClick={(e) => {
      e.preventDefault();
      fetch(`/Reports/${item.event}.pdf`, { method: 'HEAD' })
        .then((response) => {
          if (response.ok) {
            window.location.href = `/Reports/${item.event}.pdf`;
          } else {
            alert("Report has yet to be generated");
          }
        })
        .catch(() => {
          alert("Report has yet to be generated");
        });
    }}
  >
    Download
  </a>
</td>
              </tr>
            ))}
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