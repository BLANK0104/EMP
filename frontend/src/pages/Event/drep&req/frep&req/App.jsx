import React, { useEffect, useState } from "react";
import Tabs from "./Tabs";
import Request from "./Requests";
import Report from "./Reports";

const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const App = () => {
  const [activeTab, setActiveTab] = useState("requests");
  const [requests, setRequests] = useState([]);
  const [reports, setReports] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`${backendUrl}/requests`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }
        // console.log(response);
        const data = await response.json();
        // console.log(data);
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, []); // Add an empty dependency array to run this effect only once on mount

  return (
    <div>
      <Tabs activeTab={activeTab} handleTabClick={handleTabClick} />
      {activeTab === "requests" && (
        <Request
          requests={requests}
          selectedRequest={selectedRequest}
          setSelectedRequest={setSelectedRequest}
        />
      )}
      {activeTab === "reports" && (
        <Report
          reports={reports}
          selectedReport={selectedReport}
          setSelectedReport={setSelectedReport}
        />
      )}
    </div>
  );
};

export default App;
