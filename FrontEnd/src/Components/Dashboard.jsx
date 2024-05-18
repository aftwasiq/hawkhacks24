import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
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
import { Line } from "react-chartjs-2";
import "./dashboard.css";
import { UserIcon } from "./svg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Dashboard = ({ data }) => {
  const { user, logout } = useContext(AuthContext);

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "May",
    "June",
    "July",
  ];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "",
      },
    },
  };
  const data2 = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [
          50, 100, 20, 203, 203, 483, 292, 50, 100, 20, 203, 203, 483, 292,
        ],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [
          50, 100, 20, 203, 403, 483, 292, 50, 100, 20, 203, 203, 483, 292,
        ],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div id="dashboredBackGround">
      <div id="dashboredNavbar">
        <h1> PredicTurf</h1>
        <div id="navbarUserIcon">
          <UserIcon />
        </div>
      </div>
      <div id="dashboredGraph">
        <Line options={options} data={data2} style={{ maxHeight: 330 }} />
      </div>
      <div id="dashboredBet"> </div>
    </div>
  );
};

export default Dashboard;
