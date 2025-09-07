import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

const TrackHeatmap = ({ data }) => {
  const getHeatmapColor = (level) => {
    if (level > 0.9) return "#DC2626";
    if (level > 0.7) return "#F97316";
    if (level > 0.5) return "#FACC15";
    return "#22C55E";
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          <p>{`${payload[0].name} : ${(payload[0].value * 100).toFixed(
            1
          )}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
      >
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="name"
          stroke="#9CA3AF"
          width={60}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: "rgba(255,255,255,0.1)" }}
        />
        <Bar dataKey="usage" barSize={15}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getHeatmapColor(entry.usage)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TrackHeatmap;
