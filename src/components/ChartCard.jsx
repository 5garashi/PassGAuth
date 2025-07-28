// src/components/ChartCard.jsx
import React from "react";

export default function ChartCard({ title, children }) {
  return (
    <div style={{
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
      padding: "16px"
    }}>
      <h3 style={{ marginBottom: "12px", fontSize: "1.1rem", color: "#333" }}>{title}</h3>
      {children}
    </div>
  );
}
