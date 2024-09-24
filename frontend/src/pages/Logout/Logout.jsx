import React from "react";
import { useNavigate } from "react-router-dom";
const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${backendUrl}/logout`, {
        method: "POST",
        credentials: "include", // Include cookies with the request
      });

      if (response.ok) {
        // Clear any local state if necessary
        // Redirect to login page or another page
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout} className="w-full">
        Logout
      </button>
    </div>
  );
};

export default Logout;
