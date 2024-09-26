import React from "react";

const NotificationIcon = ({ notificationDropdownVisible, toggleNotificationDropdown }) => {
  return (
    <div className="relative">
      <button
        id="notificationButton"
        className="p-2 rounded-full hover:bg-gray-600 dark:hover:bg-gray-700 flex items-center justify-center"
        onClick={toggleNotificationDropdown} // Use the toggle function passed as a prop
      >
        <img src="/bell-03.svg" alt="bell" className="w-6 h-6 sm:w-6 sm:h-6" />
      </button>
      {notificationDropdownVisible && (
        <div
          id="notificationDropdown"
          className="absolute right-0 mt-2 w-40 md:w-48 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-lg overflow-hidden z-30"
        >
          <a
            href="#"
            className="block px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Notification 1
          </a>
          <a
            href="#"
            className="block px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Notification 2
          </a>
          <a
            href="#"
            className="block px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Notification 3
          </a>
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;