import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormPage from "./pages/FormPage";
import ErrorPage from "./pages/ErrorPage";
import { useTokenValidation } from "../hooks/useTokenValidation";

function FormWrapper() {
  // Captura token da query string
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  // Valida token no Firebase
  const status = useTokenValidation(token);

  if (status === "loading")
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Carregando...
      </div>
    );

  if (status === "invalid")
    return <ErrorPage message="Token inválido ou não encontrado." />;

  if (status === "respondido")
    return <ErrorPage message="Este formulário já foi preenchido." />;

  return <FormPage token={token} />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rota dedicada para o formulário */}
        <Route path="/form" element={<FormWrapper />} />

        {/* Rota coringa para páginas inexistentes */}
        <Route path="*" element={<ErrorPage message="Página não encontrada." />} />
      </Routes>
    </Router>
  );
}
