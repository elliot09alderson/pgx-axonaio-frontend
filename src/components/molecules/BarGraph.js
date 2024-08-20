import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ barData }) => {
  console.log("inside barData", barData)
  const chartData = {
    labels: barData?.map((data) => data._id),
    datasets: [
      {
        label: 'GTV',
        data: barData?.map((data) => data.gtv_amount),
        backgroundColor: 'rgba(255, 99, 132, 0.6)'
      },
      {
        label: 'Transaction Count',
        data: barData?.map((data) => data.tran_count),
        backgroundColor: 'rgba(54, 162, 235, 0.6)'
      }
    ]
  };

  const options = {
    title: {
      display: true,
      text: 'Gtv vs TransactionCount',
      fontSize: 25
    },
    legend: {
      display: true,
      position: 'top'
    },
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          displayFormats: {
            month: 'MMM YYYY',
            day: 'DD-MM-YYYY'
          },
          unit: 'day'
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: 'Amount ($)'
        }
      }]
    }
  };

  return (
    <div className="myBarChart">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
