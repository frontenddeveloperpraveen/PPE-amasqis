import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", detections: 12 },
  { day: "Tue", detections: 18 },
  { day: "Wed", detections: 8 },
  { day: "Thu", detections: 15 },
  { day: "Fri", detections: 10 },
  { day: "Sat", detections: 20 },
  { day: "Sun", detections: 6 },
];

const DetectionBarGraph = () => {
  return (
    <div className="w-full h-72 bg-white p-4 rounded-lg border shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="detections" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DetectionBarGraph;
