import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null); // Initial state as null to represent loading state
  const [loading, setLoading] = useState(true); // To manage loading state

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/verify", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          // console.log("Fetched authentication data:", data);

          // Assuming your server returns `authenticate: true` when user is authenticated
          if (data.authenticate) {
            setAuth(true);
          } else {
            setAuth(false);
          }
        } else {
          console.error("Failed to verify authentication status");
          setAuth(false);
        }
      } catch (error) {
        console.error("Error fetching authentication status:", error);
        setAuth(false);
      } finally {
        setLoading(false);
      }
    };

    fetchAuth();
  }, []);

  // Show a loading screen while checking authentication status
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  // Render child components if authenticated
  return children;
};

export default ProtectedRoute;