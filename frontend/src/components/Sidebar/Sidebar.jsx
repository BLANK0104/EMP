import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faCalendarAlt, faCalendarCheck, faUsers, faHistory } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
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

  const handleMouseMove = (e) => {
    if (e.clientX < 50) {
      setSidebarVisible(true);
    } else {
      setSidebarVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (isMobile) {
    return null; // Do not render the sidebar on mobile
  }

  return (
    <aside
      id="sidebar"
      className={`fixed top-16 left-0 mt-2 mb-1 flex flex-col h-[calc(100vh-4rem)] shadow-md shadow-slate-500 transition-transform duration-300 z-30 w-16 bg-gradient-to-r from-gray-900/70 to-gray-300/30 backdrop-blur-lg rounded-md ${sidebarVisible ? 'translate-x-0' : '-translate-x-full'}`}
    >
      {/* Sidebar Navigation */}
      <nav className="flex-grow flex flex-col items-center justify-center space-y-8">
        {[
          { name: "Dashboard", path: "/", icon: faTachometerAlt },
          { name: "Events", path: "/events", icon: faCalendarAlt },
          { name: "Calendar", path: "/calendar", icon: faCalendarCheck },
          { name: "Clubs", path: "/clubs", icon: faUsers },
          { name: "History", path: "/history", icon: faHistory },
        ].map((item, index) => (
          <div key={index} className="relative group">
            <li
              className={`text-black dark:text-gray-300 flex flex-col items-center space-y-2 px-4 py-2 transition duration-400 ${
                location.pathname === item.path ? "bg-red-500 rounded-md" : ""
              }`}
              onClick={() => navigate(item.path)}
            >
              <span
                className={`icon flex-shrink-0 w-8 h-8 transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-red-500 rounded-md"
                    : "group-hover:bg-red-500 group-hover:rounded-full"
                } flex items-center justify-center`}
              >
                <FontAwesomeIcon icon={item.icon} className="text-black dark:text-white" />
              </span>
            </li>
            <span className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:origin-left">
              {item.name}
            </span>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;