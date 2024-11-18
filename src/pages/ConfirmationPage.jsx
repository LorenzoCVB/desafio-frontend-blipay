/* Esse componente ConfirmationPage exibe uma mensagem de confirmação para o usuário, 
indicando se a consulta foi aprovada ou negada, 
e dois botões: um para iniciar uma nova consulta 
e outro para visualizar o histórico de consultas anteriores.

A variável isApproved é passada para o componente ConfirmationMessage, 
que ajusta a mensagem de acordo com o status da consulta. 
A navegação para a página inicial ou para o histórico
é gerenciada pelos métodos handleClickNewClient e handleHistoryClick. */

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Confirmation.css";

import ConfirmationMessage from "../components/ConfirmationMessage";
import ConfirmationButtons from "../components/ConfirmationButtons";

// Componente principal que exibe a página de confirmação
const ConfirmationPage = () => {
  const location = useLocation(); // Hook para acessar o estado enviado pela navegação
  const navigate = useNavigate(); // Hook para controlar a navegação entre páginas

  // Obtém a informação se a consulta foi aprovada ou não, com valor padrão `false`
  const { isApproved } = location.state || { isApproved: false };

  // Função para redirecionar o usuário para a página inicial ao clicar no botão "Nova Consulta"
  const handleClickNewClient = () => {
    navigate("/"); // Redireciona para a página inicial
  };

  // Função para redirecionar o usuário para a página de histórico ao clicar no botão "Ver Histórico"
  const handleHistoryClick = () => {
    navigate("/history"); // Redireciona para a página de histórico
  };

  return (
    <div className="confirmation-container">
      {/* Componente responsável por exibir a mensagem de aprovação ou negação */}
      <ConfirmationMessage isApproved={isApproved} />

      {/* Componente que renderiza os botões de ação para "Nova Consulta" e "Ver Histórico" */}
      <ConfirmationButtons
        onNewClientClick={handleClickNewClient} // Evento para iniciar nova consulta
        onHistoryClick={handleHistoryClick} // Evento para ver o histórico de consultas
      />
    </div>
  );
};

export default ConfirmationPage;
