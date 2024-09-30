import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "/dashboard.svg";
import EventsIcon from "/event.svg";
import CalendarIcon from "/calendar.svg";
import ClubsIcon from "/clubs.svg";
import HistoryIcon from "/history.svg";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true); // Set initial state to true
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the width as needed for your breakpoint
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSidebarToggle = () => {
    setCollapsed(!collapsed); // Toggles the collapsed state on desktop
  };

  if (isMobile) {
    return null; // Do not render the sidebar on mobile
  }

  return (
    <>
      {/* Overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20" // Increased z-index to 20
          onClick={handleSidebarToggle}
        ></div>
      )}

      <aside
        id="sidebar"
        className={`rounded-md mt-2 mb-1 flex flex-col min-h-screen shadow-md shadow-slate-500 transition-all duration-300 z-30 bg-gradient-to-br from-white to-slate-50 dark:from-gray-800 dark:to-gray-700 ${
          collapsed ? "lg:w-16 w-64" : "w-64 absolute inset-x-0 top-18" // Lowered position when not collapsed
        }`}
      >
        {/* Sidebar Toggle Button - Hidden on Mobile (shown on desktop and above) */}
        <button
          id="sidebarToggle"
          className="p-3 focus:outline-none hidden lg:block" // Hidden on mobile
          onClick={handleSidebarToggle}
        >
          <svg
            id="sidebarIcon"
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 text-black dark:text-white transition-transform duration-300 ease-in-out ${
              collapsed ? "rotate-180" : ""
            }`}
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

        {/* Sidebar Navigation */}
        <nav className="flex-grow">
          <ul id="menuItems" className="space-y-2 pt-6 sm:pt-2">
            {[
              { name: "Dashboard", path: "/", icon: DashboardIcon },
              { name: "Events", path: "/events", icon: EventsIcon },
              { name: "Calendar", path: "/calendar", icon: CalendarIcon },
              { name: "Clubs", path: "/clubs", icon: ClubsIcon },
              { name: "History", path: "/history", icon: HistoryIcon },
            ].map((item, index) => (
              <div key={index} className="flex flex-col px-1">
                <li
                  className={`text-black dark:text-gray-300 flex items-center space-x-4 px-4 py-2 hover:bg-red-500 hover:rounded-md transition duration-400 ${
                    location.pathname === item.path ? "bg-red-500 rounded-md" : ""
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <span className="icon flex-shrink-0">
                    <img
                      src={item.icon}
                      alt={`${item.name} icon`}
                      className="w-5 h-5 transition-all duration-200 filter invert dark:invert-0" // Fixed size for icons
                    />
                  </span>
                  {/* Hide text when collapsed on desktop, but always show on mobile */}
                  <span
                    className={`text transition-all ${
                      collapsed ? "lg:opacity-0 lg:w-0" : "opacity-100 w-auto"
                    }`}
                  >
                    {item.name}
                  </span>
                </li>
                <div className="w-full flex items-center justify-center mt-2">
                  <div
                    className={`${
                      collapsed ? "w-10" : "w-11/12 px-8"
                    } flex flex-wrap border-slate-600 border-dotted border-b-2`}
                  ></div>
                </div>
              </div>
            ))}
          </ul>
        </nav>

        {/* Version number, hidden when collapsed */}
        {!collapsed ? (
          <div className="version-number text-gray-600 dark:text-gray-300 text-xs text-center py-2 mb-5">
            Version 1.0
          </div>
        ) : null}
      </aside>
    </>
  );
};

export default Sidebar;