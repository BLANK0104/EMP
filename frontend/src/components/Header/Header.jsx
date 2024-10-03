import React, { useState, useEffect } from "react";
import Logout from "../../pages/Logout/Logout";
import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";
import DropDown from "./DropDown"; // Import the DropDown component
import Logo from "./Logo";
import Title from "./Title";
import NotificationIcon from "./NotificationIcon";
import ProfileIcon from "./ProfileIcon";
const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const Header = () => {
  const [profileMenuVisible, setProfileMenuVisible] = useState(false); // Profile dropdown state
  const [notificationDropdownVisible, setNotificationDropdownVisible] =
    useState(false); // Notification dropdown state
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const api = await fetch(`${backendUrl}/header`, {
          method: "GET",
          credentials: "include"
        });
        const data = await api.json(); // Parse response as JSON
        console.log("Header: ", data);
        setImage(data[0].username)
      } catch (error) {
        console.error("Error fetching header: ", error);
      }
    };
  
    fetchHeader();
  }, []);
  

  const handleSidebarToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Toggle profile dropdown and close notification dropdown if open
  const toggleProfileMenu = () => {
    setProfileMenuVisible((prev) => !prev);
    setNotificationDropdownVisible(false); // Close notification if open
  };

  // Toggle notification dropdown and close profile dropdown if open
  const toggleNotificationDropdown = () => {
    setNotificationDropdownVisible((prev) => !prev);
    setProfileMenuVisible(false); // Close profile menu if open
  };

 
  // Close both dropdowns if clicking outside
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
  console.log("header image:", image)

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
      <Logo />

      {/* Title */}
      <Title />

      {/* Notification & Profile Section */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <ThemeToggle />

        {/* Notification Icon */}
        {/* <div id="notificationButton">
          <NotificationIcon
            notificationDropdownVisible={notificationDropdownVisible}
            toggleNotificationDropdown={toggleNotificationDropdown}
          />
        </div> */}

        {/* Profile Icon */}
        <ProfileIcon
          profileMenuVisible={profileMenuVisible} // Pass state as prop
          toggleProfileMenu={toggleProfileMenu} // Pass toggle function as prop
          image={image}
        />
      </div>

      {/* DropDown Component */}
      <DropDown
        isVisible={dropdownVisible}
        onClose={() => setDropdownVisible(false)}
      />
    </header>
  );
};

export default Header;
