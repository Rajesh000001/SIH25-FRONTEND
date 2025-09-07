import React from "react";

const Card = ({ title, children }) => (
  <div className="card">
    <h3 className="card-title">{title}</h3>
    {children}
  </div>
);

export default Card;
