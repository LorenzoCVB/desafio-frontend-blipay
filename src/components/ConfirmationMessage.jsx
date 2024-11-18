import React from "react";
import checkPositive from "../assets/check_positive.png";
import checkNegative from "../assets/check_negative.png";
import "../styles/Confirmation.css";

const ConfirmationMessage = ({ isApproved }) => (
  <div className="confirmation-message-container">
    {isApproved ? (
      <>
        <img src={checkPositive} alt="Aprovado" className="check-icon" />
        <h1 className="confirmation-message">Parabéns!</h1>
        <p className="confirmation-text">Sua conta foi aprovada com sucesso.</p>
      </>
    ) : (
      <>
        <img src={checkNegative} alt="Reprovado" className="check-icon" />
        <h1 className="confirmation-message">Não foi desta vez</h1>
        <p className="confirmation-text">
          Infelizmente, sua conta não foi aprovada. Tente novamente mais tarde.
        </p>
      </>
    )}
  </div>
);

export default ConfirmationMessage;
