// Importa dependências necessárias para o componente e ícones
import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Form.css"; // Importa os estilos específicos
import { FormContext } from "../FormContext"; // Contexto que gerencia dados do formulário
import person_icon from "../assets/person.png";
import calendar_icon from "../assets/calendar.png";
import coin_icon from "../assets/coin.png";
import city_icon from "../assets/city.png";
import id_icon from "../assets/id-card.png";

// Importa componentes para estruturar o layout
import Header from "../components/Header";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";

// Função principal do componente da página de formulário
const FormPage = () => {
  const location = useLocation(); // Obtém a localização atual para determinar o tipo de conta
  const navigate = useNavigate(); // Hook para navegação entre páginas
  const accountType = location.state?.accountType || "Pessoa Física"; // Define o tipo de conta, com fallback para "Pessoa Física"

  // Obtém dados do formulário e erros de validação do contexto global
  const { formData, setFormData, errors, setErrors } = useContext(FormContext);

  // useEffect é usado para inicializar os dados do formulário e limpar erros ao carregar a página
  useEffect(() => {
    setFormData({
      name: "",
      document: "",
      age: "",
      income: "",
      city: "",
    });
    setErrors({});
  }, []);

  // Função para validar os campos do formulário com base no tipo de conta e regras específicas
  const validateFields = () => {
    const newErrors = {}; // Inicializa objeto de erros

    // Verificações de erro por campo e adiciona um marcador "*" se inválido
    if (formData.name.length < 8) newErrors.name = "*";
    if (accountType === "person" && formData.document.length < 11)
      newErrors.document = "*";
    if (accountType === "company" && formData.document.length < 14)
      newErrors.document = "*";
    if (accountType === "person" && !formData.age) newErrors.age = "*";
    if (!formData.city) newErrors.city = "*";
    if (!formData.income) newErrors.income = "*";

    // Atualiza o estado de erros e retorna 'true' se não houver erros
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função para formatar CPF ou CNPJ de acordo com o número de dígitos
  const formatCPFOrCNPJ = (value) => {
    value = value.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (value.length > 14) value = value.substring(0, 14); // Limita a 14 caracteres
    // Aplica formatação de CPF se ≤ 11 caracteres, caso contrário, CNPJ
    return value.length <= 11
      ? value
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d{2})$/, "$1-$2")
      : value
          .replace(/(\d{2})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1/$2")
          .replace(/(\d{4})(\d{2})$/, "$1-$2");
  };

  // Função de controle para manipular alterações nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Formata o CPF ou CNPJ se for o campo 'document', caso contrário, apenas atualiza o valor
    setFormData({
      ...formData,
      [name]: name === "document" ? formatCPFOrCNPJ(value) : value,
    });
  };

  // Função para processar o clique no botão 'Consultar'
  const handleConsultClick = () => {
    // const url =
    //   accountType === "person"
    //     ? "/credit-score/person"
    //     : "/credit-score/company";
    // const payload = {
    //   income: formData.income,
    //   city: formData.city,
    //   name: formData.name,
    //   ...(accountType === "person"
    //     ? { age: formData.age, document: formData.document }
    //     : { revenue: formData.income, document: formData.document }),
    // };

    //   try {
    //     const response = await fetch(url, {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(payload),
    //     });

    //     const data = await response.json();

    //     if (data.status === "APPROVED") {
    //       navigate("/confirmation", {
    //         state: { isApproved: true, maxAmount: data.max_amount },
    //       });
    //     } else {
    //       navigate("/confirmation", { state: { isApproved: false } });
    //     }
    //   } catch (error) {
    //     console.error("Erro ao consultar o score:", error);
    //     alert(
    //       "Ocorreu um erro ao consultar o score. Tente novamente mais tarde."
    //     );
    //   }

    // Valida os campos; se válidos, simula resposta de aprovação ou negação de crédito
    if (validateFields()) {
      const mockResponse =
        accountType === "person" && formData.income > 0 && formData.age > 18
          ? { status: "APPROVED", max_amount: 10000 }
          : accountType === "company" && formData.income >= 500
          ? { status: "APPROVED", max_amount: 10000 }
          : { status: "DENIED" };

      // Atraso simulado antes de salvar no localStorage e redirecionar para a página de confirmação
      setTimeout(() => {
        const formDataToSave = {
          ...formData,
          accountType,
          status: mockResponse.status,
          maxAmount: mockResponse.max_amount,
        };

        // Armazena histórico de consultas no localStorage para futura referência
        const existingHistory =
          JSON.parse(localStorage.getItem("consultHistory")) || [];
        existingHistory.push(formDataToSave);
        localStorage.setItem("consultHistory", JSON.stringify(existingHistory));

        // Navega para a página de confirmação com dados de aprovação ou negação
        navigate("/confirmation", {
          state: {
            isApproved: mockResponse.status === "APPROVED",
            maxAmount: mockResponse.max_amount,
          },
        });
      }, 100);
    }
  };

  // Estrutura de renderização da página de formulario com componentes customizados
  return (
    <div className="container">
      {/* Componente do cabeçalho */}
      <Header />
      <div className="inputs">
        {/* Campos de entrada para cada dado do formulário com validação de erro */}
        <InputField
          iconSrc={person_icon}
          type="text"
          name="name"
          placeholder={accountType === "person" ? "Nome" : "Razão Social"}
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />

        {/* Campo 'Idade' só é exibido se o tipo de conta for "Pessoa Física" */}
        {accountType === "person" && (
          <InputField
            iconSrc={calendar_icon}
            type="number"
            name="age"
            placeholder="Idade"
            value={formData.age}
            onChange={handleChange}
            error={errors.age}
          />
        )}

        {/* Campo para CPF ou CNPJ com formatação e validação */}
        <InputField
          iconSrc={id_icon}
          type="text"
          name="document"
          placeholder={accountType === "person" ? "CPF" : "CNPJ"}
          value={formData.document}
          onChange={handleChange}
          error={errors.document}
        />

        {/* Campo para renda ou faturamento baseado no tipo de conta */}
        <InputField
          iconSrc={coin_icon}
          type="number"
          name="income"
          placeholder={accountType === "person" ? "Renda" : "Faturamento"}
          value={formData.income}
          onChange={handleChange}
          error={errors.income}
        />

        {/* Campo para cidade com validação */}
        <InputField
          iconSrc={city_icon}
          type="text"
          name="city"
          placeholder="Cidade"
          value={formData.city}
          onChange={handleChange}
          error={errors.city}
        />
      </div>

      {/* Botão de submissão que chama handleConsultClick ao ser clicado */}
      <SubmitButton onClick={handleConsultClick} />
    </div>
  );
};

// Exporta o componente LoginSignupPage para ser utilizado em outras partes do aplicativo
export default FormPage;
