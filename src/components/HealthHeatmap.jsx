import React from "react";

const heatmapData = [
  ["Healthy", "Warning", "Critical"],
  ["Healthy", "Healthy", "Warning"],
  ["Critical", "Warning", "Healthy"],
];

const getColor = (status) => {
  switch (status) {
    case "Healthy":
      return "bg-green-400";
    case "Warning":
      return "bg-yellow-400";
    case "Critical":
      return "bg-red-400";
    default:
      return "bg-gray-300";
  }
};

const HealthHeatmap = () => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {heatmapData.flat().map((status, idx) => (
        <div
          key={idx}
          className={`w-24 h-24 flex items-center justify-center rounded-md text-white font-semibold shadow-md ${getColor(
            status
          )}`}
        >
          {status}
        </div>
      ))}
    </div>
  );
};

export default HealthHeatmap;
