import React from "react";
import { useSearchParams } from "react-router-dom";
import { useTokenValidation } from "../hooks/useTokenValidation";
import FormPage from "./pages/FormPage";
import ErrorPage from "./pages/ErrorPage";

export default function App() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const status = useTokenValidation(token);

  if (status === "loading")
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Carregando...
      </div>
    );

  if (status !== "valid") return <ErrorPage />;
  return <FormPage token={token} />;
}
