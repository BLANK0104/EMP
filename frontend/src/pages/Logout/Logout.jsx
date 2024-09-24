import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/logout", {
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
