import React, { useState, useEffect, useRef } from "react";
import "./dataanalytics.css";
import Card from "./Card";
import KpiCard from "./KpiCard";
import TrackHeatmap from "./TrackHeatmap";
import DelayChart from "./DelayChart";
import ConflictTrendChart from "./ConflictTrendChart";
import EngineHealth from "./EngineHealth";
import mockApiData from "./mockApiData";

export function DataAnalytics() {
  const [filter, setFilter] = useState("Today");
  const [analyticsData, setAnalyticsData] = useState(mockApiData[filter]);
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");

  const ws = useRef(null);
  const reconnectTimeout = useRef(null);

  // 🔹 Initialize WebSocket once
  useEffect(() => {
    function connect() {
      ws.current = new WebSocket("ws://localhost:5000");

      ws.current.onopen = () => {
        console.log("✅ WebSocket connected");
        setConnectionStatus("Live");
        ws.current.send(JSON.stringify({ type: "subscribe", filter }));
      };

      ws.current.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === "analytics_update") {
            setAnalyticsData(msg.payload);
            setConnectionStatus("Live");
          }
        } catch (err) {
          console.error("Error parsing WS message:", err);
        }
      };

      ws.current.onerror = (err) => {
        console.error("❌ WebSocket error:", err);
        setConnectionStatus("Offline");
        setAnalyticsData(mockApiData[filter]); // fallback
      };

      ws.current.onclose = () => {
        console.log("❌ WebSocket disconnected");
        setConnectionStatus("Offline");
        setAnalyticsData(mockApiData[filter]); // fallback

        // Retry connection after 3 seconds
        reconnectTimeout.current = setTimeout(connect, 3000);
      };
    }

    connect();

    return () => {
      if (ws.current) ws.current.close();
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
    };
  }, []);

  // 🔹 Update filter subscription
  useEffect(() => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: "subscribe", filter }));
    } else {
      setAnalyticsData(mockApiData[filter]); // fallback if WS not ready
    }
  }, [filter]);

  const getStatusColorClass = () => {
    if (connectionStatus === "Live") return "status-online";
    if (connectionStatus === "Connecting...") return "status-degraded";
    if (connectionStatus === "Paused") return "status-paused";
    return "status-offline";
  };

  if (!analyticsData) return <p>Loading analytics...</p>;

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="header-title-group">
          <h1 className="main-title">Network Analytics & Performance</h1>
          <div className="connection-status">
            <div className={`status-dot ${getStatusColorClass()}`}></div>
            <span>
              Real-time data:{" "}
              <span className="font-semibold">{connectionStatus}</span>
            </span>
          </div>
        </div>
        <div className="filter-container">
          <select
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>Last 60 Minutes</option>
            <option>Today</option>
            <option>Last 7 Days</option>
          </select>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="kpi-grid">
        {analyticsData.kpi_cards.map((kpi) => (
          <KpiCard key={kpi.id} {...kpi} />
        ))}
      </div>

      {/* Charts & Cards */}
      <div className="main-grid">
        <div className="grid-col-left">
          <Card title="Live Track Congestion Heatmap">
            <TrackHeatmap data={analyticsData.track_heatmap_data} />
          </Card>
          <Card title="Root Causes of Delays">
            <DelayChart data={analyticsData.delay_cause_analysis} />
          </Card>
        </div>
        <div className="grid-col-right">
          <Card title="Engine Intervention Trend">
            <ConflictTrendChart data={analyticsData.conflict_trend} />
          </Card>
          <Card title="Live Engine Status">
            <EngineHealth data={analyticsData.engine_health} />
          </Card>
        </div>
      </div>
    </div>
  );
}
