import React from "react";
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
// import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    // title: {
    //   display: true,
    //   text: "Datagraph of Payin and Payout",
    // },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Pay In",
      data: [1212, 232, 990, 1684, 231, 1200, 1223],
      borderColor: "rgb(153, 20, 125)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      yAxisID: "y1",
    },
    {
      label: "Pay Out",
      data: [132, 632, 990, 784, 1231, 1300, 1123],
      borderColor: "rgb(193, 90, 200)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      yAxisID: "y1",
    },
  ],
};

function MultiLineChart() {
  return (
    <div className="LineGraph sm:p-4 p-0  bg-slate-300 rounded-lg mb-3">
      <Line
        options={options}
        className=" m-0 sm:m-4 sm:w-[850px] w-[320px] text-xs"
        data={data}
      />
    </div>
  );
}
export default MultiLineChart;
