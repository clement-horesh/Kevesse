import React, { useState, useEffect } from "react";
import Box from "../Box";
import { ethers } from "ethers";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-annotation"; // Import the plugin
import Chart from "chart.js/auto";

const DonatorsLine = ({ state, donations, fetchDonations }) => {
  const [chartOptions, setChartOptions] = useState({
    responsive: true, // Ensure the chart is responsive
    maintainAspectRatio: false, // Allows chart to resize in height as well
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: "line",
        },
      },
    },
    onResize: (chart) => {
      const chartContext = chart.ctx;
      const gradient = chartContext.createLinearGradient(0, 0, 0, chart.height);
      gradient.addColorStop(0, "rgba(76, 147, 241, 1)");
      gradient.addColorStop(1, "rgba(121, 49, 218, 1)");

      chart.data.datasets[0].borderColor = gradient;
      chart.update();
    },
  });
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Donation Amount (ETH)",
        data: [],
        borderWidth: 7,
        fill: false,
        lineTension: 0.1,
        pointRadius: 2,
      },
    ],
  });
  const prepareChartData = (donations) => {
    const dataMap = new Map();
    let totalAmount = 0;

    donations.forEach((donation) => {
      const date = new Date(donation.timestamp * 1000);
      const dateString = date.toLocaleDateString();

      const amountEth = parseFloat(ethers.utils.formatEther(donation.amount));
      totalAmount += amountEth; // Accumulate total amount
      dataMap.set(dateString, totalAmount);
    });

    const sortedData = Array.from(dataMap).sort(
      (a, b) => new Date(a[0]) - new Date(b[0])
    );

    // Create an array for the target line with the same length as the sortedData
    const targetLineData = sortedData.map(() => state.target);

    setChartData({
      labels: sortedData.map((item) => item[0]),
      datasets: [
        {
          ...chartData.datasets[0],
          data: sortedData.map((item) => item[1]),
        },
        {
          label: "Target",
          data: targetLineData,
          borderColor: "grey", // Style for the target line
          borderWidth: 2,
          borderDash: [5, 5],
          fill: false,
        },
      ],
    });
  };
  
  useEffect(() => {
    if (donations.length > 0) {
      prepareChartData(donations);
    }
  }, [donations]);

  return (
    <>
      <Box title="Donations Chart">
        <Line data={chartData} options={chartOptions} />
      </Box>
    </>
  );
};

export default DonatorsLine;
