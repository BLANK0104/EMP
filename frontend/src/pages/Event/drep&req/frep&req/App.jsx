import React, { useState } from 'react';
import Tabs from './Tabs';
import Request from './Requests';
import Report from './Reports';

const App = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [requests, setRequests] = useState([]);
  const [reports, setReports] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div >
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