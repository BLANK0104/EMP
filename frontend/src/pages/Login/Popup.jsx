import React from "react";
const email = import.meta.env.VITE_EMAIL;

const Popup = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <p>Please contact the EMS team at {email} for further assistance.</p>
      </div>
    </div>
  );
};

export default Popup;
