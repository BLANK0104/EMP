import React, { useState, useEffect, useRef } from 'react';
import './index.css'; // Make sure to import your Tailwind CSS file

const App = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [requests, setRequests] = useState([
    { id: 1, info: 'Request 1: Fix login issue' },
    { id: 2, info: 'Request 2: Update user profile' },
  ]);
  const [reports, setReports] = useState([
    { id: 1, info: 'Report 1: Monthly sales report' },
    { id: 2, info: 'Report 2: User activity report' },
  ]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const modalRef = useRef(null);
  const secondModalRef = useRef(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <div className="flex justify-center items-center space-x-4">
        <button 
          className={`px-4 py-2 ${activeTab === 'requests' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
          onClick={() => handleTabClick('requests')}
        >
          Requests
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'reports' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
          onClick={() => handleTabClick('reports')}
        >
          Reports
        </button>
      </div>
      {activeTab === 'requests' && (
        <div>
          {/* Render requests */}
          {requests.map((request) => (
            <div key={request.id}>
              {request.info}
              <button onClick={() => setSelectedRequest(request)}>View</button>
            </div>
          ))}
          {selectedRequest && (
            <div>
              <div>
                <h2>{selectedRequest.info}</h2>
                <button onClick={handleModalToggle}>Toggle Modal</button>
                {isModalOpen && (
                  <div ref={modalRef}>
                    <div>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleModalToggle}>
                        Accept Report
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      {activeTab === 'reports' && (
        <div>
          {/* Render reports */}
          {reports.map((report) => (
            <div key={report.id}>
              {report.info}
              <button onClick={() => setSelectedReport(report)}>View</button>
            </div>
          ))}
          {selectedReport && (
            <div>
              <div>
                <h2>{selectedReport.info}</h2>
                <button onClick={handleModalToggle}>Toggle Modal</button>
                {isModalOpen && (
                  <div ref={modalRef}>
                    <div>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleModalToggle}>
                        Accept Report
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;