import "./App.css";
import React from "react";
import { useEffect } from "react";
import { FormProvider } from "./FormContext";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AccountTypePage from "./pages/AccountTypePage";
import ConfirmationPage from "./pages/ConfirmationPage";
import FormPage from "./pages/formPage";
import HistoryPage from "./pages/HistoryPage";

function App() {
  useEffect(() => {
    // Verifica se o localStorage já foi limpo nesta sessão
    if (!sessionStorage.getItem("historyCleared")) {
      localStorage.removeItem("consultHistory");
      sessionStorage.setItem("historyCleared", "true"); // Marca como limpo nesta sessão
    }
  }, []);

  return (
    <FormProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AccountTypePage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Router>
    </FormProvider>
  );
}

export default App;
