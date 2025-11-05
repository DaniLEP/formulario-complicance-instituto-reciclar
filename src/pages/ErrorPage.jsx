// src/pages/ErrorPage.jsx
import React from "react";

export default function ErrorPage({ message }) {
  return (
    <div className="flex items-center justify-center h-screen bg-red-50">
      <div className="bg-white p-8 rounded shadow text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Ops!</h1>
        <p className="text-gray-700">{message || "Ocorreu um erro."}</p>
      </div>
    </div>
  );
}
