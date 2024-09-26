import React, { useState, useEffect } from "react";
import Logout from "../../pages/Logout/Logout";
import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";
import DropDown from "./DropDown"; // Import the DropDown component

const Header = () => {
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [notificationDropdownVisible, setNotificationDropdownVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility

  const handleProfileButtonClick = () => {
    setProfileMenuVisible(!profileMenuVisible);
    setNotificationDropdownVisible(false);
  };

  const handleNotificationButtonClick = () => {
    setNotificationDropdownVisible(!notificationDropdownVisible);
    setProfileMenuVisible(false);
  };

  const handleSidebarToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest("#profileButton") &&
        !event.target.closest("#profileMenu")
      ) {
        setProfileMenuVisible(false);
      }
      if (
        !event.target.closest("#notificationButton") &&
        !event.target.closest("#notificationDropdown")
      ) {
        setNotificationDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      id="empBar"
      className="shadow-md shadow-slate-400 dark:shadow-slate-700 flex justify-between items-center bg-gradient-to-br from-red-800 to-brand-light dark:from-red-800 dark:to-brand-dark text-white p-3 md:p-4 z-20 mb-1"
    >
      {/* Sidebar Toggle (Mobile Only) */}
      <button
        id="sidebarToggle"
        className="lg:hidden p-2 focus:outline-none"
        onClick={handleSidebarToggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Logo */}
      <a href="/" className="flex items-center ml-4 sm:ml-10 md:ml-20 lg:ml-0">
        <img
          src="/Picture1.jpg"
          alt="NMIMS Logo"
          className="rounded-lg w-10 sm:w-12 md:w-16 lg:w-20"
        />
      </a>

      {/* Title */}
      <h1 className="text-xs sm:text-sm md:text-lg lg:text-xl font-bold text-center flex-grow truncate px-2">
        Event Management System
      </h1>

      {/* Notification & Profile Section */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <ThemeToggle />

        {/* Notification Icon */}
        <div className="relative">
          <button
            id="notificationButton"
            className="p-2 rounded-full hover:bg-gray-600 dark:hover:bg-gray-700 flex items-center justify-center"
            onClick={handleNotificationButtonClick}
          >
            <img
              src="/bell-03.svg"
              alt="bell"
              className="w-6 h-6 sm:w-6 sm:h-6"
            />
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

        {/* Profile Icon */}
        <div className="relative">
          <button
            id="profileButton"
            className="flex items-center focus:outline-none"
            onClick={handleProfileButtonClick}
          >
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="rounded-full w-6 h-6 sm:w-6 sm:h-6"
            />
          </button>
          {profileMenuVisible && (
            <div
              id="profileMenu"
              className="absolute right-0 mt-2 w-32 md:w-36 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-lg overflow-hidden z-30"
            >
              <Link
                to="/settings"
                className="block px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-center w-full"
              >
                Settings
              </Link>
              <div className="block px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 w-full text-left">
                <Logout />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DropDown Component */}
      <DropDown isVisible={dropdownVisible} onClose={() => setDropdownVisible(false)} />
    </header>
  );
};

export default Header;