import React, { useState } from "react";
import { Bar, Line, Pie, Radar, Doughnut, PolarArea, Bubble, Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
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
  const [chartType, setChartType] = useState("Bar");

  const handleTimeFrameChange = (event) => {
    setTimeFrame(event.target.value);
  };

  const handleSemesterTypeChange = (event) => {
    setSemesterType(event.target.value);
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const monthlyLabels = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const yearlyData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: "Accepted",
        data: graphData.yearlyAccepted,
        backgroundColor: "rgba(0,100,0,0.2)", // Dark Green
        borderColor: "rgba(0,100,0,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(0,100,0,0.5)",
      },
      {
        label: "Rejected",
        data: graphData.yearlyRejected,
        backgroundColor: "rgba(139,0,0,0.2)", // Dark Red
        borderColor: "rgba(139,0,0,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(139,0,0,0.5)",
      },
      {
        label: "Modified",
        data: graphData.yearlyModified,
        backgroundColor: "rgba(255,140,0,0.2)", // Dark Orange
        borderColor: "rgba(255,140,0,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,140,0,0.5)",
      },
    ],
  };

  const semesterData = {
    labels: graphData.labels,
    datasets: [
      {
        label: "Accepted",
        data: graphData.accepted,
        backgroundColor: "rgba(0,100,0,0.2)", // Dark Green
        borderColor: "rgba(0,100,0,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(0,100,0,0.5)",
      },
      {
        label: "Rejected",
        data: graphData.rejected,
        backgroundColor: "rgba(139,0,0,0.2)", // Dark Red
        borderColor: "rgba(139,0,0,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(139,0,0,0.5)",
      },
      {
        label: "Modified",
        data: graphData.modified,
        backgroundColor: "rgba(255,140,0,0.2)", // Dark Orange
        borderColor: "rgba(255,140,0,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,140,0,0.5)",
      },
    ],
  };

  const pieData = {
    labels: ["Accepted", "Rejected", "Modified"],
    datasets: [
      {
        data: [
          graphData.yearlyAccepted.reduce((a, b) => a + b, 0),
          graphData.yearlyRejected.reduce((a, b) => a + b, 0),
          graphData.yearlyModified.reduce((a, b) => a + b, 0),
        ],
        backgroundColor: [
          "rgba(0,100,0,0.2)", // Dark Green
          "rgba(139,0,0,0.2)", // Dark Red
          "rgba(255,140,0,0.2)", // Dark Orange
        ],
        borderColor: [
          "rgba(0,100,0,1)",
          "rgba(139,0,0,1)",
          "rgba(255,140,0,1)",
        ],
        borderWidth: 1,
        hoverBackgroundColor: [
          "rgba(0,100,0,0.5)",
          "rgba(139,0,0,0.5)",
          "rgba(255,140,0,0.5)",
        ],
      },
    ],
  };

  const radarData = {
    labels: ["Accepted", "Rejected", "Modified"],
    datasets: [
      {
        label: "Yearly Data",
        data: [
          graphData.yearlyAccepted.reduce((a, b) => a + b, 0),
          graphData.yearlyRejected.reduce((a, b) => a + b, 0),
          graphData.yearlyModified.reduce((a, b) => a + b, 0),
        ],
        backgroundColor: "rgba(0,100,0,0.2)", // Dark Green
        borderColor: "rgba(0,100,0,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(0,100,0,0.5)",
      },
    ],
  };

  const doughnutData = pieData;

  const polarData = pieData;

  const bubbleData = {
    datasets: [
      {
        label: "Accepted",
        data: graphData.yearlyAccepted.map((value, index) => ({
          x: index,
          y: value,
          r: value * 2,
        })),
        backgroundColor: "rgba(0,100,0,0.2)", // Dark Green
        borderColor: "rgba(0,100,0,1)",
        hoverBackgroundColor: "rgba(0,100,0,0.5)",
      },
      {
        label: "Rejected",
        data: graphData.yearlyRejected.map((value, index) => ({
          x: index,
          y: value,
          r: value * 2,
        })),
        backgroundColor: "rgba(139,0,0,0.2)", // Dark Red
        borderColor: "rgba(139,0,0,1)",
        hoverBackgroundColor: "rgba(139,0,0,0.5)",
      },
      {
        label: "Modified",
        data: graphData.yearlyModified.map((value, index) => ({
          x: index,
          y: value,
          r: value * 2,
        })),
        backgroundColor: "rgba(255,140,0,0.2)", // Dark Orange
        borderColor: "rgba(255,140,0,1)",
        hoverBackgroundColor: "rgba(255,140,0,0.5)",
      },
    ],
  };

  const scatterData = {
    datasets: [
      {
        label: "Accepted",
        data: graphData.yearlyAccepted.map((value, index) => ({
          x: index,
          y: value,
        })),
        backgroundColor: "rgba(0,100,0,0.2)", // Dark Green
        borderColor: "rgba(0,100,0,1)",
        hoverBackgroundColor: "rgba(0,100,0,0.5)",
      },
      {
        label: "Rejected",
        data: graphData.yearlyRejected.map((value, index) => ({
          x: index,
          y: value,
        })),
        backgroundColor: "rgba(139,0,0,0.2)", // Dark Red
        borderColor: "rgba(139,0,0,1)",
        hoverBackgroundColor: "rgba(139,0,0,0.5)",
      },
      {
        label: "Modified",
        data: graphData.yearlyModified.map((value, index) => ({
          x: index,
          y: value,
        })),
        backgroundColor: "rgba(255,140,0,0.2)", // Dark Orange
        borderColor: "rgba(255,140,0,1)",
        hoverBackgroundColor: "rgba(255,140,0,0.5)",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 10,
        ticks: {
          stepSize: 1,
          color: "#6B7280", // Gray-500
        },
        grid: {
          color: "#E5E7EB", // Gray-200
        },
      },
      x: {
        ticks: {
          color: "#6B7280", // Gray-500
        },
        grid: {
          color: "#E5E7EB", // Gray-200
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#6B7280", // Gray-500
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(31,41,55,0.9)", // Gray-800
        titleColor: "#F9FAFB", // Gray-50
        bodyColor: "#F9FAFB", // Gray-50
        borderColor: "#6B7280", // Gray-500
        borderWidth: 1,
      },
    },
    animation: {
      duration: 1500,
      easing: "easeInOutBounce",
      onComplete: () => {
        console.log("Animation complete!");
      },
    },
    hover: {
      animationDuration: 1000,
    },
    responsiveAnimationDuration: 1000,
  };

  const renderChart = () => {
    switch (chartType) {
      case "Bar":
        return <Bar data={yearlyData} options={options} />;
      case "Line":
        return <Line data={semesterData} options={options} />;
      case "Pie":
        return <Pie data={pieData} options={options} />;
      case "Radar":
        return <Radar data={radarData} options={options} />;
      case "Doughnut":
        return <Doughnut data={doughnutData} options={options} />;
      case "PolarArea":
        return <PolarArea data={polarData} options={options} />;
      case "Bubble":
        return <Bubble data={bubbleData} options={options} />;
      case "Scatter":
        return <Scatter data={scatterData} options={options} />;
      default:
        return <Bar data={yearlyData} options={options} />;
    }
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
              <option value="Even">Odd Semester</option>
              <option value="Odd">Even Semester</option>
            </select>
          )}
          <select
            value={chartType}
            onChange={handleChartTypeChange}
            className="border border-gray-300 dark:border-gray-700 rounded p-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="Bar">Bar</option>
            <option value="Line">Line</option>
            <option value="Pie">Pie</option>
            <option value="Radar">Radar</option>
            <option value="Doughnut">Doughnut</option>
            <option value="PolarArea">Polar Area</option>
            <option value="Bubble">Bubble</option>
            <option value="Scatter">Scatter</option>
          </select>
        </div>
        <div className="h-80 overflow-y-auto">
          {renderChart()}
        </div>
      </div>
    </div>
  );
};

export default LeftGraph;