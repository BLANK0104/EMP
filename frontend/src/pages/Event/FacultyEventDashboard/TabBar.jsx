import React, { useEffect, useState } from "react";
// import RequestForm from "./RequestForm";
import RequestForm from "./RequestForm";
import Report from "./Report/Form";
const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const Tab = ({ label, isActive, onClick, isDisabled }) => {
  return (
    <div
      className={`relative flex-none w-1/3 text-center py-3 px-5 cursor-pointer transition-all duration-300 ${
        isDisabled
          ? "bg-stone-300 text-gray-500 cursor-not-allowed"
          : isActive
          ? "bg-white font-semibold text-black shadow-sm rounded-t-lg dark:text-white dark:bg-zinc-700"
          : "text-gray-700 hover:bg-white hover:rounded-t-md dark:text-white dark:hover:bg-zinc-900"
      }`}
      onClick={!isDisabled ? onClick : null}
    >
      {label}
    </div>
  );
};

const TabBar = () => {
  const [activeTab, setActiveTab] = useState("");
  const [canSubmitRequest, setCanSubmitRequest] = useState(null);
  const [canSubmitReport, setCanSubmitReport] = useState(null);

  useEffect(() => {
    async function fetchEventStatus() {
      try {
        const response = await fetch(`${backendUrl}/can-submit-request`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        // console.log(data);
        setCanSubmitRequest(data.canSubmitRequest);
        setCanSubmitReport(data.canSubmitReport);
        // console.log(canSubmitRequest);
      } catch (error) {
        console.error("Error checking request permission:", error);
      }
    }

    fetchEventStatus();
  }, []);

  useEffect(() => {
    if (canSubmitRequest === true) {
      setActiveTab("request");
    } else if (canSubmitReport === true) {
      setActiveTab("report");
    } else {
      setActiveTab("");
    }
  }, [canSubmitRequest]);

  console.log(activeTab);

  const tabs = [
    { id: "request", label: "Request" },
    { id: "report", label: "Report" },
    { id: "draft", label: "Draft" },
  ];

  return (
    <div className="flex flex-col border-2 border-slate-200 rounded-t-xl rounded-b-md">
      <div className="flex justify-center bg-red-200 dark:bg-zinc-500 w-full overflow-hidden shadow-md rounded-t-xl">
        {tabs.map((tab, index) => {
          const isRequestTabDisabled = !canSubmitRequest; // Disable request if it already exists in report
          const isReportTabDisabled = !canSubmitReport; // Disable report
          const isDraftTabDisabled = !canSubmitRequest; //Disable draft

          return (
            <Tab
              key={index}
              label={tab.label}
              isActive={activeTab === tab.id}
              isDisabled={
                (tab.id === "request" && isRequestTabDisabled) ||
                (tab.id === "report" && isReportTabDisabled) ||
                (tab.id === "draft" && isDraftTabDisabled)
              }
              onClick={() => setActiveTab(tab.id)}
            />
          );
        })}
      </div>
      <div className="bg-slate-50 dark:bg-zinc-700 w-full rounded-b-lg shadow-lg overflow-y-scroll max-h-screen">
        {activeTab === "" ? (
          <div className="bg-red-50 dark:bg-zinc-700 w-full px-6 py-4 flex justify-center items-center">
            <h1 className="text-red-700 text-lg">
              You can't access the forms until your request status is updated
            </h1>
          </div>
        ) : (
          <>
            {activeTab === "request" && canSubmitRequest && <RequestForm />}
            {activeTab === "report" && canSubmitReport && <Report />}
          </>
        )}
      </div>
    </div>
  );
};

export default TabBar;
