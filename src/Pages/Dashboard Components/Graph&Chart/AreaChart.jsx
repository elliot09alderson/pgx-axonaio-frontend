import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
      grid: { display: false },
    },
    x: {
      beginAtZero: true,
      grid: { display: false },
    },
  },
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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const AreaChart = ({ title_1, data_1, data_2, title_2 }) => {
  const data = {
    labels,
    datasets: [
      {
        label: title_1,
        data: data_1,
        backgroundColor: "#a3b1cc",
        barThickness: "flex",
        barPercentage: 1,
        categoryPercentage: 0.4,
      },
      {
        label: title_2,
        data: data_2,
        backgroundColor: "##a5bde1",
        barThickness: "flex",
        barPercentage: 1,
        categoryPercentage: 0.4,
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export default AreaChart;
