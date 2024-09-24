import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LeftGraph = ({
  graphData,
  timeFrame,
  setTimeFrame,
  semesterType,
  setSemesterType,
}) => {
  const handleTimeFrameChange = (event) => {
    setTimeFrame(event.target.value);
  };

  const handleSemesterTypeChange = (event) => {
    setSemesterType(event.target.value);
  };

  const data = {
    labels: graphData.labels,
    datasets: [
      {
        label: "Accepted",
        data: graphData.accepted,
        backgroundColor: "rgba(34,197,94,0.2)", // Green
        borderColor: "rgba(34,197,94,1)",
        borderWidth: 1,
      },
      {
        label: "Rejected",
        data: graphData.rejected,
        backgroundColor: "rgba(239,68,68,0.2)", // Red
        borderColor: "rgba(239,68,68,1)",
        borderWidth: 1,
      },
      {
        label: "Modified",
        data: graphData.modified,
        backgroundColor: "rgba(251,146,60,0.2)", // Orange
        borderColor: "rgba(251,146,60,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        min: 1,
        max: 20,
        ticks: {
          stepSize: 2,
        },
      },
    },
  };

  return (
    <div className="w-full h-96 md:h-full p-4 overflow-x-auto flex justify-end">
      <div className="w-full h-full max-w-[1000px] max-h-[600px] overflow-auto border border-gray-300 dark:border-gray-700 rounded-lg p-2 relative bg-white dark:bg-gray-800">
        <div className="flex justify-between mb-4">
          <select
            value={timeFrame}
            onChange={handleTimeFrameChange}
            className="border border-gray-300 dark:border-gray-700 rounded p-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="Semester">Semester</option>
            <option value="Year">Year</option>
          </select>
          {timeFrame === "Semester" && (
            <select
              value={semesterType}
              onChange={handleSemesterTypeChange}
              className="border border-gray-300 dark:border-gray-700 rounded p-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="Even">Even Semester</option>
              <option value="Odd">Odd Semester</option>
            </select>
          )}
        </div>
        <div className="h-80 overflow-y-auto">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default LeftGraph;