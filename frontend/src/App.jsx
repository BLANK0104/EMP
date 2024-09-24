import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const location = useLocation();
  const hide = location.pathname === "/login";
  const settings = location.pathname === "/settings";

  // console.log("Current Path:", location.pathname); // Debugging log

  return (
    <div className="bg-slate-200 dark:bg-black">
      {!hide && <Header />}
      <div className="flex min-h-screen">
        {!hide && !settings && <Sidebar />}
        <div className={hide || settings ? "flex-grow" : "flex-grow px-4 pt-2"}>
          <Outlet />
        </div>
      </div>
      {!hide && <Footer />}
    </div>
  );
}

export default App;
