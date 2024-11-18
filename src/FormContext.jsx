import React, { createContext, useState } from "react";

// Cria o contexto FormContext para compartilhar dados entre componentes
const FormContext = createContext();

// Componente provedor (provider) que envolve a árvore de componentes
// e fornece o estado compartilhado para os filhos
const FormProvider = ({ children }) => {
  // Define o estado inicial para os dados do formulário
  const [formData, setFormData] = useState({
    name: "", // Nome ou razão social
    age: "", // Idade (ou outro dado conforme o tipo de conta)
    document: "", // CPF ou CNPJ
    income: "", // Renda ou faturamento
    city: "", // Cidade
  });

  // Define o estado inicial para os erros de validação
  const [errors, setErrors] = useState({});

  // Adiciona o histórico de consultas para armazenar as respostas anteriores do formulário
  const [formHistory, setFormHistory] = useState([]); // Adicionando o histórico

  return (
    // O FormContext.Provider envolve os filhos e passa os dados compartilhados
    <FormContext.Provider
      value={{
        formData, // Dados do formulário
        setFormData, // Função para atualizar os dados do formulário
        formHistory, // Histórico das consultas
        setFormHistory, // Função para atualizar o histórico
        errors, // Erros de validação do formulário
        setErrors, // Função para atualizar os erros de validação
      }}
    >
      {/* Renderiza os componentes filhos que terão acesso aos dados do contexto */}
      {children}
    </FormContext.Provider>
  );
};

// Exporta tanto o contexto quanto o provedor para uso em outros componentes
export { FormContext, FormProvider };
