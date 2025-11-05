import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import FormPage from "./pages/FormPage.jsx"; // 👈 importe a página do formulário
import ErrorPage from "./pages/ErrorPage.jsx"; // 👈 opcional, mas recomendado
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<App />} />

        {/* Página do formulário com token */}
        <Route path="/form" element={<FormPage />} />

        {/* Página de erro (opcional) */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
