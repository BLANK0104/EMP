import React, { useState, useEffect } from "react";
import TopBox from "./top_box";
import LeftGraph from "./left_graph";
import RightUpcomingEvents from "./right_upcoming_events";
const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const App = () => {
  const [accepted, setAccepted] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [modified, setModified] = useState(0);
  const [role, setRole] = useState("Admin");
  const [currentStatus, setCurrentStatus] = useState("");
  const [timeFrame, setTimeFrame] = useState("Semester");
  const [semesterType, setSemesterType] = useState("Even");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [graphData, setGraphData] = useState({
    labels: [],
    accepted: [],
    rejected: [],
    modified: [],
    yearlyAccepted: [],
    yearlyRejected: [],
    yearlyModified: [],
  });

  useEffect(() => {
    fetch(`${backendUrl}/dashboard`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA:",  data);
        let acceptedCount = 0;
        let rejectedCount = 0;
        let modifiedCount = 0;
        const events = data.data.map((event) => {
          if (event.status === "Approved") acceptedCount++;
          if (event.status === "Rejected") rejectedCount++;
          if (event.status === "Modified") modifiedCount++;
          return {
            title: event.event_name,
            date: event.event_date,
            status: event.status,
          };
        });
        setAccepted(acceptedCount);
        setRejected(rejectedCount);
        setModified(modifiedCount);
        setRole(data.username);
        if (data.upcomingevent === undefined) {
          setUpcomingEvents([]);
        } else {
          setUpcomingEvents(data.upcomingevent);
        }
        console.log("latestDATA: ", data.latestData)

        console.log("latest: ", data);
        if (data.role === "faculty" || data.role === "centralAuthority") {
          if(data.latestData === undefined){
            setCurrentStatus("No request pending")
          }else if (data.latestData.status === "Rejected") {
            setCurrentStatus("Rejected");
          } else if (data.latestData.status === "Modified") {
            setCurrentStatus(
              `Modified - Reason: ${data.latestData.modification_reason}`
            );
          } else if (data.latestData.status === "Approved" && data.nextevent) {
            setCurrentStatus("Event approved, awaiting event date");
          } else if (data.reportStatus === false) {
            setCurrentStatus("Please submit the report of the event");
          } else if (data.latestData.status === "Approved" && !data.nextevent) {
            setCurrentStatus("Event approved");
          } else if (
            data.latestData.status === "Pending" &&
            data.latestData.username
          ) {
            // For pending approvals, showing the current approver
            setCurrentStatus(
              `${data.latestData.status} by ${data.latestData.username}`
            );
          } else {
            setCurrentStatus("No request pending");
          }
        } else {
          if (
            data.currentStatusValue === 0 ||
            data.currentStatusValue === undefined
          ) {
            setCurrentStatus(`No pending requests`);
          } else {
            setCurrentStatus(`${data.currentStatusValue} pending requests`);
          }
        }
        console.log(data.currentStatusValue);
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const monthCounts = { accepted: {}, rejected: {}, modified: {} };

        data.data.forEach((event) => {
          const month = new Date(event.event_date).getMonth();
          const monthName = monthNames[month];

          if (!monthCounts.accepted[monthName])
            monthCounts.accepted[monthName] = 0;
          if (!monthCounts.rejected[monthName])
            monthCounts.rejected[monthName] = 0;
          if (!monthCounts.modified[monthName])
            monthCounts.modified[monthName] = 0;

          if (event.status === "Approved") monthCounts.accepted[monthName]++;
          if (event.status === "Rejected") monthCounts.rejected[monthName]++;
          if (event.status === "Modified") monthCounts.modified[monthName]++;
        });

        const filteredMonths =
          semesterType === "Even"
            ? ["July", "August", "September", "October", "November", "December"]
            : ["January", "February", "March", "April", "May", "June"];

        const labels = filteredMonths;
        const acceptedData = labels.map(
          (month) => monthCounts.accepted[month] || 0
        );
        const rejectedData = labels.map(
          (month) => monthCounts.rejected[month] || 0
        );
        const modifiedData = labels.map(
          (month) => monthCounts.modified[month] || 0
        );

        const yearlyAcceptedData = monthNames.map(
          (month) => monthCounts.accepted[month] || 0
        );
        const yearlyRejectedData = monthNames.map(
          (month) => monthCounts.rejected[month] || 0
        );
        const yearlyModifiedData = monthNames.map(
          (month) => monthCounts.modified[month] || 0
        );

        setGraphData({
          labels,
          accepted: acceptedData,
          rejected: rejectedData,
          modified: modifiedData,
          yearlyAccepted: yearlyAcceptedData,
          yearlyRejected: yearlyRejectedData,
          yearlyModified: yearlyModifiedData,
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [semesterType]);

  return (
    <div className="flex flex-col items-center w-full space-y-4">
      <TopBox
        accepted={accepted}
        rejected={rejected}
        modified={modified}
        role={role}
        currentStatus={currentStatus}
      />
      <div className="flex flex-col w-full space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <LeftGraph
          graphData={graphData}
          timeFrame={timeFrame}
          setTimeFrame={setTimeFrame}
          semesterType={semesterType}
          setSemesterType={setSemesterType}
        />
        <RightUpcomingEvents events={upcomingEvents} />
      </div>
    </div>
  );
};

export default App;
