import React from "react";

const EngineHealth = ({ data }) => {
  const getStatusColorClass = (status) => {
    if (status === "online") return "status-online";
    if (status === "degraded") return "status-degraded";
    return "status-offline";
  };

  return (
    <div className="engine-health-container">
      <div>
        <h4 className="engine-health-subtitle">API Status</h4>
        {data.api_status.map(({ name, status }) => (
          <div key={name} className="api-status-row">
            <span>{name}</span>
            <div className="api-status-indicator">
              <span
                className={`status-dot ${getStatusColorClass(status)}`}
              ></span>
              <span className="status-text">{status}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="engine-health-row">
        <span>Avg. Response Time</span>
        <span className="font-bold">{data.avg_response_time_ms} ms</span>
      </div>
      <div>
        <span>CPU Load</span>
        <div className="cpu-bar-background">
          <div
            className="cpu-bar"
            style={{ width: `${data.cpu_load_percent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default EngineHealth;
