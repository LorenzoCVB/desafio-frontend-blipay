/* Este componente HistoryPage renderiza uma página de histórico, 
exibindo consultas salvas que são armazenadas no localStorage. 
Quando o componente é montado, ele tenta carregar os dados armazenados 
e, se existirem, os exibe em forma de cards. 
Um botão permite que o usuário inicie uma nova consulta, navegando para a página inicial. */

import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/History.css";
import HistoryCard from "../components/HistoryCard";
import NoHistoryCard from "../components/NoHistoryCard";

// Componente principal para exibir o histórico de consultas
const HistoryPage = () => {
  const navigate = useNavigate(); // Hook para navegação entre páginas
  const [history, setHistory] = useState([]); // Estado para armazenar o histórico de consultas

  // Função para lidar com o clique no botão "Nova Consulta",
  // que navega de volta para a página inicial
  const handleClickNewClient = () => {
    navigate("/"); // Redireciona para a página inicial
  };

  // useEffect para carregar o histórico de consultas do localStorage assim que o componente é montado
  useEffect(() => {
    // Tenta buscar o histórico salvo no localStorage
    const storedHistory =
      JSON.parse(localStorage.getItem("consultHistory")) || [];
    // Atualiza o estado 'history' com os dados armazenados
    setHistory(storedHistory);
  }, []); // Dependência vazia para rodar apenas na montagem do componente

  return (
    <div className="history-container">
      <h2>Histórico de Consultas</h2>
      {/* Verifica se há histórico; se não houver, exibe o componente NoHistoryCard,
          caso contrário, exibe os cards de histórico */}
      {history.length === 0 ? (
        <NoHistoryCard /> // Componente para mostrar mensagem quando não há histórico
      ) : (
        <div className="history-cards">
          {/* Mapeia o histórico e renderiza um componente HistoryCard para cada item,
              passando 'formData' com os dados específicos de cada consulta */}
          {history.map((formData, index) => (
            <HistoryCard key={index} formData={formData} />
          ))}
        </div>
      )}

      {/* Botão para iniciar uma nova consulta, redirecionando para a página inicial */}
      <button className="confirm-button" onClick={handleClickNewClient}>
        Nova Consulta
      </button>
    </div>
  );
};

export default HistoryPage;
