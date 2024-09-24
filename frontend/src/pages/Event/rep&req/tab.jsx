import React, { useState } from "react";
import App1 from "./rep/Rep.jsx";
import App2 from "./req/Req.jsx";
//import App3 from './draft/Draft.jsx';

const TabBar = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  

  return (
    <div className="flex flex-col">
      {/* Tab headers */}
      

      {/* Tab content */}
      <div className="flex-1 bg-red-100">
        {activeTab === "tab1" && <App1 />}
        {activeTab === "tab2" && <App2 />}
        {activeTab === "tab3" && <App3 />}
      </div>
    </div>
  );
};

export default TabBar;
