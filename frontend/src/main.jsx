import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login/Login.jsx";
import Dashboard from "./pages/Dashboard/app.jsx";
import ProtectedRoute from "./components/Protected.jsx";
import SettingsPage from "./pages/Settings/Settings.jsx";
import History from "./pages/History/app.jsx";
import Calendar from "./pages/Calender/cal.jsx";
import Clubs from "./pages/Clubs/Clubs.jsx";
import TabBar from "./pages/Event/FacultyEventDashboard/TabBar.jsx";
import Tabs from "./pages/Event/drep&req/frep&req/App.jsx";
const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

// Root component that handles role fetching and routing
function RootComponent() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "calendar",
          element: (
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          ),
        },
        {
          path: "events",
          element: (
            <>
              <ProtectedRoute allowedRoles={["faculty", "centralAuthority"]}>
                <TabBar />
              </ProtectedRoute>
              <ProtectedRoute allowedRoles={["dean", "director"]}>
                <Tabs />
              </ProtectedRoute>
            </>
          ),
        },
        {
          path: "history",
          element: (
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          ),
        },
        {
          path: "clubs",
          element: (
            <ProtectedRoute>
              <Clubs />
            </ProtectedRoute>
          ),
        },
        {
          path: "settings",
          element: (
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

// Creating the root outside of any render or component function to avoid re-initialization
const container = document.getElementById("root");
const root = createRoot(container);

// Render the application using the already created root
root.render(
  <StrictMode>
    <RootComponent />
  </StrictMode>
);
