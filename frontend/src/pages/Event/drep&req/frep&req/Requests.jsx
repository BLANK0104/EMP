import React, { useState } from "react";

const Request = ({ requests, selectedRequest, setSelectedRequest }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modification, setModification] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  console.log(requests);
  const handleAccept = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/accept", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId: selectedRequest.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to accept the request");
      }

      const data = await response.json();
      console.log("Request accepted:", data);
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleReject = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/reject", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId: selectedRequest.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to reject the request");
      }

      const data = await response.json();
      console.log("Request rejected:", data);
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const handleModify = async () => {
    const newModification = prompt("Enter the modification:", modification);
    if (newModification !== null) {
      setModification(newModification);
      console.log(newModification);
    }
    try {
      const response = await fetch("http://localhost:5000/api/modify", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId: selectedRequest.id,
          modification: newModification,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to modify the request");
      }

      const data = await response.json();
      console.log("Request modified:", data);
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className={`p-4 dark:text-white text-black`}>
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
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {requests.map((request, index) => (
            <tr
              key={request.id}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => handleRequestClick(request)}
            >
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{request.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {request.username}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {/* Faculty Coordinator - Add later */}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {request.event_dates.length > 0
                  ? request.event_dates[0].venues[0]
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 dark:bg-opacity-80"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 dark:text-white">
              Request Details
            </h2>
            <p className="dark:text-gray-300">
              <strong>Title:</strong> {selectedRequest.title}
            </p>
            <p className="dark:text-gray-300">
              <strong>Type:</strong> {selectedRequest.eventtype}
            </p>
            <p className="dark:text-gray-300">
              <strong>Description:</strong> {selectedRequest.description}
            </p>
            <p className="dark:text-gray-300">
              <strong>Objectives:</strong> {selectedRequest.objectives}
            </p>
            <p className="dark:text-gray-300">
              <strong>Target Audience:</strong> {selectedRequest.TAudience}
            </p>
            <p className="dark:text-gray-300">
              <strong>Branch:</strong> {selectedRequest.school_audience.branch}
            </p>
            <p className="dark:text-gray-300">
              <strong>Classes:</strong> {selectedRequest.school_audience.class}
            </p>
            <p className="dark:text-gray-300">
              <strong>Year:</strong> {selectedRequest.school_audience.year}
            </p>
            <p className="dark:text-gray-300">
              <strong>Max Audience:</strong> {selectedRequest.audience}
            </p>
            <p className="dark:text-gray-300">
              <strong>Club:</strong> {selectedRequest.username}
            </p>
            <p className="dark:text-gray-300">
              <strong>Faculty Coordinator:</strong> {/* Add later */}
            </p>
            <p className="dark:text-gray-300">
              <strong>Venue:</strong>{" "}
              {selectedRequest.event_dates.map((event, idx) => (
                <span key={idx}>{event.venues.join(", ")}</span>
              ))}
            </p>
            <p className="dark:text-gray-300">
              <strong>Event Start Date:</strong>{" "}
              {selectedRequest.event_dates[0]?.date}
            </p>
            <p className="dark:text-gray-300">
              <strong>Event Start Time:</strong>{" "}
              {selectedRequest.event_dates[0]?.start_time}
            </p>
            <p className="dark:text-gray-300">
              <strong>Event End Time:</strong>{" "}
              {selectedRequest.event_dates[0]?.end_time}
            </p>
            <p className="dark:text-gray-300">
              <strong>Resources Required:</strong> {selectedRequest.resources}
            </p>
            <p className="dark:text-gray-300">
              <strong>Collaborators:</strong> {selectedRequest.clubs}
            </p>
            <div className="mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleAccept}
              >
                Accept
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleReject}
              >
                Reject
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleModify}
              >
                Modify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Request;
