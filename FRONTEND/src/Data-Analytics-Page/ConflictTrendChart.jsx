import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const ConflictTrendChart = ({ data }) => {
  const chartData = data.labels.map((label, i) => ({
    name: label,
    conflicts: data.data[i],
  }));
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="name" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "1px solid #374151",
          }}
        />
        <Line
          type="monotone"
          dataKey="conflicts"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ConflictTrendChart;
