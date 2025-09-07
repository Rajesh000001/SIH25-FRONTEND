import React from "react";

const KpiCard = ({ label, value, unit, trend, trend_direction }) => {
  const trendColorClass = trend_direction === "up" ? "trend-up" : "trend-down";
  const trendIcon = trend_direction === "up" ? "▲" : "▼";
  return (
    <div className="kpi-card">
      <p className="kpi-label">{label}</p>
      <p className="kpi-value">
        {value} <span className="kpi-unit">{unit}</span>
      </p>
      <p className={`kpi-trend ${trendColorClass}`}>
        {trendIcon} {trend}
      </p>
    </div>
  );
};

export default KpiCard;
