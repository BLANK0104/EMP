import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import lock from "../../assets/lock.svg";
import user from "../../assets/user.svg";
import { Link } from "react-router-dom";
import eye from "../../assets/eye.svg";
import eyeOff from "../../assets/eye-off.svg";
const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${backendUrl}/verify`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          navigate("/"); // Redirect to home if already logged in
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backendUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/");
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-nmims bg-cover bg-center min-h-screen flex items-center justify-center relative backdrop-blur-sm">
      {/* Overlay */}
      <div className="absolute inset-0 bg-white opacity-20"></div>
      <div className="absolute top-2 right-3">
        <div className="w-full p-1">
          <Link to="#" className="font-bold text-md hover:text-red-500">
            About Us
          </Link>
          <span className="m-2">|</span>
          <Link to="#" className="font-bold text-md hover:text-red-500 ">
            Contact Us
          </Link>
        </div>
      </div>

      {/* Form Container */}
      <div className="relative z-10 bg-white rounded-lg shadow-gray-700 shadow-2xl p-10 flex flex-col items-center justify-center w-80 max-w-full font-serif">
        <img src="nmims.svg" alt="nmims-logo" className="mb-4" />
        <h2 className="text-2xl font-bold mt mb-6 text-center text-gray-800">
          Event Management System
        </h2>
        <form onSubmit={handleLogin} className="w-full">
          <div className="relative mb-4">
            <img
              src={user}
              alt="user-icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-600 rounded p-2 pl-10 w-full focus:outline-none focus:border-gray-950"
              aria-label="Username"
            />
          </div>
          <div className="relative mb-4">
            <img
              src={lock}
              alt="lock-icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-600 rounded p-2 pl-10 w-full focus:outline-none focus:border-gray-950"
              aria-label="Password"
            />
            <img
              src={showPassword ? eye : eyeOff}
              alt="eye-symbol"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded w-full transition duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Login
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        <Link
          to="#"
          className="mt-4 text-gray-600 text-sm w-full text-right transition duration-300 hover:text-red-500"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
};

export default Login;
