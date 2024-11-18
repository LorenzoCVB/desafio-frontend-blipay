import React from "react";

const ConfirmationButtons = ({ onNewClientClick, onHistoryClick }) => (
  <div className="confirmation-buttons">
    <button className="confirm-button" onClick={onNewClientClick}>
      Nova Consulta
    </button>
    <button className="confirm-button" onClick={onHistoryClick}>
      Histórico de Consultas
    </button>
  </div>
);

export default ConfirmationButtons;
