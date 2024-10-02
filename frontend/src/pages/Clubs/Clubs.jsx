import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const App = () => {
  const [selectedTable, setSelectedTable] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // For popup visibility
  const popupRef = useRef(); // For detecting clicks outside the popup

  const tables = [
    { value: 'app_development_club', label: 'App Development Club' },
    { value: 'atrangi_club', label: 'Atrangi Club' },
    { value: 'coding_club', label: 'Coding Club' },
    { value: 'competitive_preparation', label: 'Competitive Preparation' },
    { value: 'computer_society_of_india', label: 'Computer Society of India' },
    { value: 'crs_ilc', label: 'CRS ILC' },
    { value: 'cultural_activity_forum', label: 'Cultural Activity Forum' },
    { value: 'eoso', label: 'EOSO' },
    { value: 'ieee', label: 'IEEE' },
    { value: 'iste', label: 'ISTE' },
    { value: 'learn_tech', label: 'Learn Tech' },
    { value: 'nmmun', label: 'NMMUN' },
    { value: 's4ds', label: 'S4DS' },
    { value: 'soft_skill_club', label: 'Soft Skill Club' },
    { value: 'team_uas_nmims', label: 'Team UAS NMIMS' },
    { value: 'the_writers_hub', label: 'The Writers Hub' },
  ];

  const fetchData = async () => {
    if (!selectedTable) {
      setError("Please select a Club");
      return;
    }
    
    const data = { table: selectedTable };
  
    setLoading(true);
    setError(null);
  
    try {
      const token = localStorage.getItem("token");
      
      const response = await axios.post(
        `${backendUrl}/fetch-data`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
  
      setData(response.data);

      if (window.innerWidth < 640) {
        // Open popup only for mobile devices
        setIsPopupOpen(true);  
      }
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Detect click outside the popup to close it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };

    if (isPopupOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isPopupOpen]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Select a Club</h2>
        <select
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
        >
          <option value="">-- Select a table --</option>
          {tables.map((table) => (
            <option key={table.value} value={table.value}>
              {table.label}
            </option>
          ))}
        </select>
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={fetchData}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Fetch Data'}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      {/* For PC view: Render table normally */}
      <div className="hidden md:block mt-8 w-full max-w-5xl overflow-x-auto">
        {data.length > 0 && (
          <div className="w-full h-full overflow-x-auto overflow-y-auto">
            <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border">ID</th>
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Role</th>
                  <th className="py-2 px-4 border">Objectives</th>
                  <th className="py-2 px-4 border">Outcomes</th>
                  <th className="py-2 px-4 border">Functions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4 border">{row.id}</td>
                    <td className="py-2 px-4 border">{row.name}</td>
                    <td className="py-2 px-4 border">{row.role}</td>
                    <td className="py-2 px-4 border">{row.objectives}</td>
                    <td className="py-2 px-4 border">{row.outcomes}</td>
                    <td className="py-2 px-4 border">{row.functions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Popup for mobile devices */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 sm:block md:hidden">
          <div
            ref={popupRef}
            className="relative bg-white w-full max-w-xs h-3/4 rounded-lg overflow-hidden"
          >
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
            >
              X
            </button>
            <div className="p-4 h-full w-full overflow-x-auto overflow-y-auto">
              <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4 border">ID</th>
                    <th className="py-2 px-4 border">Name</th>
                    <th className="py-2 px-4 border">Role</th>
                    <th className="py-2 px-4 border">Objectives</th>
                    <th className="py-2 px-4 border">Outcomes</th>
                    <th className="py-2 px-4 border">Functions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4 border">{row.id}</td>
                      <td className="py-2 px-4 border">{row.name}</td>
                      <td className="py-2 px-4 border">{row.role}</td>
                      <td className="py-2 px-4 border">{row.objectives}</td>
                      <td className="py-2 px-4 border">{row.outcomes}</td>
                      <td className="py-2 px-4 border">{row.functions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {data.length === 0 && !loading && <p className="mt-8 text-gray-500">No data to display.</p>}
    </div>
  );
};

export default App;
