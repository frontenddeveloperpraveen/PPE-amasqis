
import React from "react";

const ChartLineGraph = ({ className = "", color = "#B78D2A" }) => {
  // This is a simplified SVG to simulate a line chart
  return (
    <div className={`w-full h-40 ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,150 C50,120 100,170 150,140 C200,110 250,180 300,150 C350,120 400,80 450,100 C500,120 550,60 600,80 C650,100 700,40 750,60 C800,80 850,150 900,130"
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default ChartLineGraph;
