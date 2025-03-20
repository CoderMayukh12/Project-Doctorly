import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FileUpload from "../components/FileUpload";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [trendData, setTrendData] = useState(null);

  // Example dummy trend data for demonstration
  const sampleTrendData = {
    labels: ["Report 1", "Report 2", "Report 3"],
    datasets: [
      {
        label: "Hemoglobin",
        data: [13, 14, 13.5],
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
      {
        label: "WBC Count",
        data: [5000, 5500, 5300],
        borderColor: "rgba(153,102,255,1)",
        fill: false,
      },
    ],
  };

  useEffect(() => {
    // In a real app, fetch trend data for the user from your backend here.
    setTrendData(sampleTrendData);
  }, []);

  const handleLogout = () => {
    // Clear any stored user session data then redirect to landing
    console.log("Logging out");
    navigate("/");
  };

  const handleUploadComplete = (uploadedFiles) => {
    setReports([...reports, ...uploadedFiles]);
    // After upload, update trendData accordingly based on your processing logic
    console.log("New files uploaded:", uploadedFiles);
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <button onClick={handleLogout}>Logout</button>
        <h2>Dashboard</h2>
        <FileUpload onUploadComplete={handleUploadComplete} />
        <div className="chart-container">
          {trendData ? (
            <Line data={trendData} />
          ) : (
            <p>No trend data available yet.</p>
          )}
        </div>
        <div className="table-container">
          <h3>Blood Parameters</h3>
          <table>
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Report 1</th>
                <th>Report 2</th>
                <th>Report 3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hemoglobin</td>
                <td>13</td>
                <td>14</td>
                <td>13.5</td>
              </tr>
              <tr>
                <td>WBC Count</td>
                <td>5000</td>
                <td>5500</td>
                <td>5300</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="ai-commentary">
          <h3>AI Insights</h3>
          <p>
            Based on the trends, your hemoglobin levels are stable while the WBC
            count shows a slight increase. Monitor your levels regularly for any
            significant changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
