// import React from "react";
// import { useSearchParams } from "react-router-dom";
// import { useTokenValidation } from "../hooks/useTokenValidation";
// import FormPage from "./pages/FormPage";
// import ErrorPage from "./pages/ErrorPage";

// export default function App() {
//   const [params] = useSearchParams();
//   const token = params.get("token");
//   const status = useTokenValidation(token);

//   if (status === "loading")
//     return (
//       <div className="flex items-center justify-center h-screen text-gray-600">
//         Carregando...
//       </div>
//     );

//   if (status !== "valid") return <ErrorPage />;
//   return <FormPage token={token} />;
// }


// src/App.jsx
import React from "react";
import { useSearchParams } from "react-router-dom";
import { useTokenValidation } from "../hooks/useTokenValidation";
import FormPage from "./pages/FormPage";
import ErrorPage from "./pages/ErrorPage";

export default function App() {
  // Pega o token da query string: ?token=XYZ
  const [params] = useSearchParams();
  const token = params.get("token");

  // Valida o token usando Firebase
  const status = useTokenValidation(token);

  // Tela de carregamento enquanto valida
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Carregando...
      </div>
    );
  }

  // Token inválido ou não fornecido
  if (status === "invalid") {
    return <ErrorPage message="Token inválido ou não encontrado." />;
  }

  // Token já utilizado
  if (status === "respondido") {
    return <ErrorPage message="Este formulário já foi preenchido." />;
  }

  // Token válido → renderiza formulário
  return <FormPage token={token} />;
}