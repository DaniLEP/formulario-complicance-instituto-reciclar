import React, { useState } from "react";
import { ref, set, update } from "../../firebase";

export default function FormPage({ token }) {
  const [formData, setFormData] = useState(
    Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`pergunta${i + 1}`, ""]))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.values(formData).every((v) => v.trim() !== "")) {
      alert("Preencha todas as perguntas!");
      return;
    }

    setIsSubmitting(true);
    try {
      await set(ref(db, `responses/${token}`), {
        token,
        respostas: formData,
        dataEnvio: new Date().toISOString(),
      });

      await update(ref(db, `tokens/${token}`), {
        used: true,
        completedAt: new Date().toISOString(),
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar o formulário!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900">
        <div className="bg-white/5 backdrop-blur-xl p-12 rounded-2xl text-center shadow-2xl max-w-md border border-white/10">
          <div className="mb-4 text-4xl">✓</div>
          <h1 className="text-3xl font-bold text-white mb-3">Resposta enviada com sucesso</h1>
          <p className="text-blue-100 text-base leading-relaxed">
            Agradecemos sua colaboração e compromisso com o Compliance.
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6">
        {Object.keys(formData).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="text-lg font-semibold mb-1">{key}</label>
            <textarea
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="border rounded p-2"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Enviando..." : "Enviar Respostas"}
        </button>
      </form>
    </div>
  );
}
