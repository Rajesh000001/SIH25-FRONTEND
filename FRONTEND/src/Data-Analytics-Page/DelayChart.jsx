import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const DelayChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={200}>
    <BarChart
      data={data}
      layout="vertical"
      margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
    >
      <XAxis type="number" stroke="#9CA3AF" />
      <YAxis
        type="category"
        dataKey="name"
        stroke="#9CA3AF"
        tickLine={false}
        axisLine={false}
        width={120}
      />
      <Tooltip cursor={{ fill: "rgba(255,255,255,0.1)" }} />
      <Bar dataKey="incidents" fill="#3B82F6" barSize={20} />
    </BarChart>
  </ResponsiveContainer>
);

export default DelayChart;
