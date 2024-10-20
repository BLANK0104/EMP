import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClubSelector from './ClubSelector';
import TableView from './TableView';
import PopupView from './PopupView';
import Header from '../../components/Header/Header';

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const MainApp = () => {
  const [selectedTable, setSelectedTable] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

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

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <ClubSelector
        selectedTable={selectedTable}
        setSelectedTable={setSelectedTable}
        tables={tables}
      />
      <button
        className="w-1/8 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 mt-4"
        onClick={fetchData}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      {/* Render table for desktop */}
      <TableView data={data} />

      {/* Render popup for mobile */}
      {isPopupOpen && <PopupView data={data} closePopup={closePopup} />}
      
      {data.length === 0 && !loading && <p className="mt-8 text-gray-500">No data to display.</p>}
    </div>
  );
};

export default MainApp;