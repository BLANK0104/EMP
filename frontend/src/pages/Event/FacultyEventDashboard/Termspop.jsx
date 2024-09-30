import React from "react";
import { motion } from "framer-motion";

const TermsPopup = ({ show, onClose, onAgree }) => {
  if (!show) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 bg-opacity-90">
        <h2 className="text-lg font-bold mb-4">Terms and Conditions</h2>
        <p className="mb-4">
          For the smooth conduction of the event and the safety and cleanliness
          of the venue, the faculty coordinator(s) are instructed to:<br />
          1. Maintain discipline throughout the event<br />
          2. Make security arrangements if required<br />
          3. Ensure that eatables and drinks are not allowed<br />
          4. Ensure the safety of all the resources used<br />
          5. Ensure strict adherence to the approved timing<br />
          of the event
        </p>
        <div className="flex justify-end">
          <motion.button
            onClick={onAgree}
            className="mt-4 px-4 py-2 bg-blue-600 rounded-lg mr-2 hover:bg-blue-500 transition duration-200"
          >
            Agree and Submit
          </motion.button>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-red-600 dark:bg-red-700 rounded-lg hover:bg-red-500 dark:hover:bg-red-600 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsPopup;
