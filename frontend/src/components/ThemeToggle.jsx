// ThemeToggle.jsx
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react"; // Assuming you're using lucide-react for icons

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    // Get initial theme from local storage or default to 'light'
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    // Apply the theme to the document's root element
    document.documentElement.className = theme;
    // Save the theme to local storage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md focus:outline-none hover:ring-2 focus:ring-offset-2 hover:ring-gray-500 "
      aria-label="Toggle Dark Mode"
    >
      {theme === "light" ? (
        <Moon className="w-6 h-6" />
      ) : (
        <Sun className="w-6 h-6" />
      )}
    </button>
  );
}
