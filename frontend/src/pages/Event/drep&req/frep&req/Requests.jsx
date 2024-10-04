import React, { useState } from "react";
const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const Request = ({ requests, selectedRequest, setSelectedRequest }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modification, setModification] = useState("");
  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  console.log(requests);
  const handleAccept = async () => {
    try {
      const response = await fetch(`${backendUrl}/accept`, {
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
      const response = await fetch(`${backendUrl}/reject`, {
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
      const response = await fetch(`${backendUrl}/modify`, {
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
    <div className={`p-4 pl-6 dark:text-white text-black`}>
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
        <tbody className="bg-white dark:bg-gray-900 text-center divide-y divide-gray-200 dark:divide-gray-700">
          {requests && requests.length > 0 ? (
            requests.map((request, index) => (
              <tr
                key={request.id}
                className="hover:bg-gray-100 text-center dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => handleRequestClick(request)}
              >
                <td className="px-6 py-4 pl-4 whitespace-nowrap text-center">
                  {index + 1}
                </td>
                <td className="px-6 py-4 pl-4 whitespace-nowrap text-center">
                  {request.title}
                </td>
                <td className="px-6 py-4 pl-4 whitespace-nowrap text-center">
                  {request.username}
                </td>
                <td className="px-6 py-4 pl-4 whitespace-nowrap text-center">
                  {request.coordinator}
                </td>
                <td className="px-6 py-4 pl-4 whitespace-nowrap text-wrap max-w-36  text-center">
                  {request.event_dates.length > 0 &&
                  request.event_dates[0].venues.length > 0 ? (
                    <>
                      {request.event_dates[0].venues
                        .slice(0, 3)
                        .map((venue, index) => (
                          <span key={index}>
                            {venue}
                            {index <
                            Math.min(
                              2,
                              request.event_dates[0].venues.length - 1
                            )
                              ? ", "
                              : ""}
                          </span>
                        ))}
                      {request.event_dates[0].venues.length > 3 && (
                        <span>...</span>
                      )}
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center">
                No requests available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 dark:bg-opacity-80"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-3xl max-h-96 overflow-auto"
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
              <strong>Objectives:</strong>{" "}
              {Array.isArray(selectedRequest.objectives)
                ? selectedRequest.objectives.map((objective, idx) => (
                    <span key={idx}>
                      <br />
                      {idx + 1}. {objective}
                    </span>
                  ))
                : selectedRequest.objectives}
            </p>
            <p className="dark:text-gray-300">
              <strong>Target Audience:</strong> {selectedRequest.TAudience}
            </p>
            {/* Branch */}
            {selectedRequest.school_audience.branch &&
              selectedRequest.school_audience.branch.length > 0 && (
                <p className="dark:text-gray-300 ml-24">
                  <strong>Branch:</strong>{" "}
                  {selectedRequest.school_audience.branch.join(", ")}
                </p>
              )}

            {/* Classes */}
            {selectedRequest.school_audience.class &&
              selectedRequest.school_audience.class.length > 0 && (
                <p className="dark:text-gray-300 ml-24">
                  <strong>Classes:</strong>{" "}
                  {selectedRequest.school_audience.class.join(", ")}
                </p>
              )}

            {/* Year */}
            {selectedRequest.school_audience.year &&
              selectedRequest.school_audience.year.length > 0 && (
                <p className="dark:text-gray-300 ml-24">
                  <strong>Year:</strong>{" "}
                  {selectedRequest.school_audience.year.join(", ")}
                </p>
              )}

            {/* External Audience */}
            {selectedRequest.externalInput &&
              selectedRequest.externalInput.length > 0 && (
                <p className="dark:text-gray-300">
                  <strong>External Audience:</strong>{" "}
                  {selectedRequest.school_audience.externalInput}
                </p>
              )}

            {/* Max Audience */}
            <p className="dark:text-gray-300">
              <strong>Max Audience:</strong> {selectedRequest.audience || "N/A"}
            </p>

            {/* Club */}
            <p className="dark:text-gray-300">
              <strong>Club:</strong> {selectedRequest.username || "N/A"}
            </p>

            {/* Faculty Coordinator */}
            <p className="dark:text-gray-300">
              <strong>Faculty Coordinator:</strong>{" "}
              {selectedRequest.coordinator || "N/A"}
            </p>

            {/* Venue */}
            <p className="dark:text-gray-300">
              <strong>Venue:</strong>{" "}
              {selectedRequest.event_dates.length > 0 &&
              selectedRequest.event_dates[0].venues.length > 0
                ? selectedRequest.event_dates[0].venues.join(", ")
                : "N/A"}
            </p>

            {/* Event Start Date */}
            <p className="dark:text-gray-300">
              <strong>Event Start Date:</strong>{" "}
              {selectedRequest.event_dates[0]?.date || "N/A"}
            </p>

            {/* Event Start Time */}
            <p className="dark:text-gray-300">
              <strong>Event Start Time:</strong>{" "}
              {selectedRequest.event_dates[0]?.start_time || "N/A"}
            </p>

            {/* Event End Time */}
            <p className="dark:text-gray-300">
              <strong>Event End Time:</strong>{" "}
              {selectedRequest.event_dates[0]?.end_time || "N/A"}
            </p>

            {/* Resources Required */}
            <p className="dark:text-gray-300">
              <strong>Resources Required:</strong>{" "}
              {Array.isArray(selectedRequest.resources) &&
              selectedRequest.resources.length > 0
                ? selectedRequest.resources.join(", ")
                : "N/A"}
            </p>

            {/* Collaborators */}
            <p className="dark:text-gray-300">
              <strong>Clubs Collaborators:</strong>{" "}
              {selectedRequest.clubs && selectedRequest.clubs.length > 0
                ? selectedRequest.clubs.map((club, idx) => (
                    <span key={idx}>
                      {idx + 1}. {club}
                      <br />
                    </span>
                  ))
                : "N/A"}
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
