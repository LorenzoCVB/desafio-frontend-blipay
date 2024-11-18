/* Esse componente AccountTypePage permite que o usuário escolha 
entre dois tipos de conta: Pessoa Física e Pessoa Jurídica. 
Quando o usuário clica em uma das opções, 
a função handleChoice salva o tipo de conta no sessionStorage 
e redireciona para a página do Formulario, 
passando o tipo de conta selecionado através do state. */

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AccountType.css";
import building from "../assets/building.png";
import person from "../assets/person.png";

// Componente principal que exibe a página de seleção do tipo de conta
function AccountTypePage() {
  const navigate = useNavigate(); // Hook para controle de navegação

  // Função que define o tipo de conta escolhido pelo usuário e navega para a página de Formulário
  const handleChoice = (accountType) => {
    sessionStorage.setItem("accountType", accountType); // Armazena o tipo de conta escolhido no sessionStorage
    navigate("/form", { state: { accountType } }); // Navega para a próxima página e passa o tipo de conta pelo estado
  };

  return (
    <div className="choice-page">
      {/* Título e descrição para orientar o usuário sobre a escolha do tipo de conta */}
      <h1>Escolha o tipo de conta</h1>
      <p>Selecione o tipo de conta que você deseja criar.</p>

      {/* Container para os cards de escolha de conta */}
      <div className="choice-container">
        {/* Card para a escolha de conta de Pessoa Física */}
        <div className="choice-card" onClick={() => handleChoice("person")}>
          <img src={person} alt="Person" />
          <h2>Pessoa Física</h2>
          <p>Para contas pessoais com CPF.</p>
        </div>

        {/* Card para a escolha de conta de Pessoa Jurídica */}
        <div className="choice-card" onClick={() => handleChoice("company")}>
          <img src={building} alt="Building" />
          <h2>Pessoa Jurídica</h2>
          <p>Para empresas com CNPJ.</p>
        </div>
      </div>
    </div>
  );
}

export default AccountTypePage;
