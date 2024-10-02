import React from "react";
import { motion } from "framer-motion";

const VenueDisplay = ({ show, onClose, onAgree, venueMessage }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-lg font-bold mb-4">Venue Availability</h2>
        <pre className="whitespace-pre-wrap">{venueMessage}</pre>{" "}
        {/* Display the venue message */}
        <div className="flex justify-end">
          <motion.button
            onClick={onAgree}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            OK
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default VenueDisplay;

