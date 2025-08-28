import React, { useState } from "react";
import ReactApexChart from "react-apexcharts"; // assuming you're importing the chart

const TotalUserGraph = () => {
  const [chartData] = useState({
    series: [
      {
        name: "Last Year",
        // data: [45, 52, 38, 24, 33, 26, 21],
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Application Submitted",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "This Year",
        // data: [87, 57, 74, 99, 75, 38, 62],
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ],
    options: {
      chart: {
        height: 265,
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          tools: {
            download: false,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [2, 2, 2],
        curve: "smooth",
        dashArray: [5, 0, 0],
      },
      //   title: {
      //     text: "Page Statistics",
      //     align: "left",
      //   },
      legend: {
        show: false,
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val + "";
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val + "";
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val;
              },
            },
          },
        ],
      },
      grid: {
        borderColor: "#f1f1f1",
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={265}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default TotalUserGraph;
