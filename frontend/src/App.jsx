import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import './App.css';

function App() {
  const location = useLocation();
  const hide = location.pathname === "/login";
  const settings = location.pathname === "/settings";
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the width as needed for your breakpoint
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-slate-200 dark:bg-black">
      {!hide && <Header />}
      <div className={`flex min-h-screen ${collapsed && !isMobile ? "sidebar-open" : ""}`}>
        {!hide && !settings && !isMobile && <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />}
        <div className={`main-content ${hide || settings ? "flex-grow" : "flex-grow px-4 pt-2"}`}>
          <Outlet />
        </div>
      </div>
      {!hide && <Footer />}
    </div>
  );
}

export default App;