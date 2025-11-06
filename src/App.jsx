import React from "react";
import { Routes, Route } from "react-router-dom";
import TokenInputPage from "./pages/TokenInput";
import FormPage from "./pages/FormPage";
import ErrorPage from "./pages/ErrorPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TokenInputPage />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="*" element={<ErrorPage message="Página não encontrada." />} />
    </Routes>
  );
}
