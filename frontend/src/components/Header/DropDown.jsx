import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "/dashboard.svg";
import EventsIcon from "/event.svg";
import CalendarIcon from "/calendar.svg";
import ClubsIcon from "/clubs.svg";
import HistoryIcon from "/history.svg";

const DropDown = ({ isVisible, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300); // Match the duration of the CSS transition
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isAnimating && !isVisible) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`absolute top-16 left-0 w-48 bg-white dark:bg-gray-800 shadow-lg z-20 transform transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        } rounded-bl-lg rounded-br-lg`}
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="flex-grow">
          <ul id="menuItems" className="space-y-2 pt-4 sm:pt-2">
            {[
              { name: "Dashboard", path: "/", icon: DashboardIcon },
              { name: "Events", path: "/events", icon: EventsIcon },
              { name: "Calendar", path: "/calendar", icon: CalendarIcon },
              { name: "Clubs", path: "/clubs", icon: ClubsIcon },
              { name: "History", path: "/history", icon: HistoryIcon },
            ].map((item, index) => (
              <li
                key={index}
                className={`text-black dark:text-gray-300 flex items-center space-x-2 px-2 py-1 hover:bg-red-500 hover:rounded-md transition duration-400 ${
                  location.pathname === item.path ? "bg-red-500 rounded-md" : ""
                }`}
                onClick={() => {
                  navigate(item.path);
                  onClose();
                }}
              >
                <span className="icon flex-shrink-0">
                  <img
                    src={item.icon}
                    alt={`${item.name} icon`}
                    className="w-4 h-4 transition-all duration-200 filter invert dark:invert-0"
                  />
                </span>
                <span className="text">{item.name}</span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default DropDown;