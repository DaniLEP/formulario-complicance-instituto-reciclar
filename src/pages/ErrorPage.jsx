// src/pages/ErrorPage.jsx
import React from "react";

export default function ErrorPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Token inválido 🚫</h1>
      <p className="text-gray-700">
        O link do formulário é inválido, expirado ou já foi utilizado.
      </p>
    </div>
  );
}
