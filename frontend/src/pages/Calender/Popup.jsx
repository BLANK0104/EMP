import React from "react";

export default function Popup({ eventDetails, onClose }) {
  if (!eventDetails) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-100 z-50">
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <h2 className="text-xl font-bold mb-4">{eventDetails.title}</h2>
        <p>
          <strong>Club Name:</strong> {eventDetails.clubName}
        </p>
        <p>
          <strong>Faculty Coordinator:</strong>{" "}
          {eventDetails.facultyCoordinator}
        </p>
        <p>
          <strong>Venue:</strong> {eventDetails.venue}
        </p>
        <p>
          <strong>Date:</strong> {eventDetails.date}
        </p>
        <p>
          <strong>Time:</strong> {eventDetails.time}
        </p>
        <p>
          <strong>Event Type:</strong> {eventDetails.eventType}
        </p>
        <button
          className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}