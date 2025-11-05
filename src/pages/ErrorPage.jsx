import React from "react";

export default function ErrorPage({ message }) {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <h1 className="text-4xl font-bold text-slate-900">{message}</h1>
    </div>
  );
}
