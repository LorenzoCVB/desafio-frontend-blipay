import React from "react";
import "../styles/Form.css";

const SubmitButton = ({ onClick }) => (
  <div className="submit-container">
    <button className="submit" onClick={onClick}>
      Consultar
    </button>
  </div>
);

export default SubmitButton;
