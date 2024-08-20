import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const options = {
  title: {
    display: true,
    text: "My Pie Chart",
  },
  legend: {
    display: true,
    position: "right",
  },
};

function PieChart({ chartData }) {
  return <Pie options={options} data={chartData} />;
}

export default PieChart;
