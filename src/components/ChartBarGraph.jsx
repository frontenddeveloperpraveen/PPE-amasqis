import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChartBarGraph({
  data,
  dataKey,
  valueKey,
  barColor,
  horizontal = false,
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout={horizontal ? "vertical" : "horizontal"}>
        <CartesianGrid strokeDasharray="3 3" />
        {horizontal ? (
          <>
            <YAxis type="category" dataKey={dataKey} />
            <XAxis type="number" />
          </>
        ) : (
          <>
            <XAxis dataKey={dataKey} />
            <YAxis />
          </>
        )}
        <Tooltip />
        <Bar dataKey={valueKey} fill={barColor} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
