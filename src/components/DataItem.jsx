import React from "react";

const DataItem = ({ icon, label }) => (
  <div className="data-item">
    <img src={icon} alt={`${label} icon`} />
    <span>{label}</span>
  </div>
);

export default DataItem;
