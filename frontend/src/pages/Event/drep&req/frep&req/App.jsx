import React, { useState, useRef, useEffect } from "react";
import Tabs from "./Tabs.jsx";
import Request from "./Requests.jsx";
import Report from "./Reports.jsx";

const App = () => {
  const [activeTab, setActiveTab] = useState("requests");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // fetch data from API
    const fetchRequests = async () => {
      const response = await fetch("http://localhost:5000/api/requests", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setRequests(data);
      setLoading(false);
      // console.log(requests);
      // console.log(data);
    };
    fetchRequests();
  }, []);

  // if (loading) {
  //   return <div>Loading Requests...</div>;
  // }

  const [reports, setReports] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const modalRef = useRef(null);
  const secondModalRef = useRef(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-white min-h-screen p-4 rounded-xl dark:bg-gray-900">
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
