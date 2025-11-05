// src/components/FormStep1.jsx
import React, { useState } from "react";
import RatingStars from "./RatingStars";
import { motion } from "framer-motion";

export default function FormStep1({ onSubmit }) {
  const [formData, setFormData] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: [],
    q8: [],
    q9: 0,
    q10: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((v) => v !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allFilled = Object.values(formData).every(
      (v) => (Array.isArray(v) ? v.length > 0 : v !== "" && v !== 0)
    );
    if (!allFilled) {
      alert("Por favor, preencha todas as perguntas antes de enviar.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto p-6 bg-white shadow-2xl rounded-2xl mt-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Etapa 1 — Avaliação Geral
      </h2>

      {/* Perguntas Objetivas */}
      <div className="space-y-4">
        <p className="font-semibold">1. A comunicação interna é eficaz?</p>
        {["Sim", "Não", "Parcialmente"].map((opt) => (
          <label key={opt} className="block">
            <input
              type="radio"
              name="q1"
              value={opt}
              onChange={handleChange}
              className="mr-2"
            />
            {opt}
          </label>
        ))}

        <p className="font-semibold">
          2. Os objetivos institucionais estão claros para você?
        </p>
        {["Sim", "Não", "Parcialmente"].map((opt) => (
          <label key={opt} className="block">
            <input
              type="radio"
              name="q2"
              value={opt}
              onChange={handleChange}
              className="mr-2"
            />
            {opt}
          </label>
        ))}

        <p className="font-semibold">
          3. Você considera o ambiente de trabalho colaborativo?
        </p>
        {["Sim", "Não", "Parcialmente"].map((opt) => (
          <label key={opt} className="block">
            <input
              type="radio"
              name="q3"
              value={opt}
              onChange={handleChange}
              className="mr-2"
            />
            {opt}
          </label>
        ))}
      </div>

      {/* Dissertativas */}
      <div className="space-y-4">
        <label className="block font-semibold">
          4. Como você descreveria a cultura da instituição?
          <textarea
            name="q4"
            onChange={handleChange}
            className="w-full mt-2 border rounded-lg p-2"
            rows={3}
          />
        </label>

        <label className="block font-semibold">
          5. O que poderia ser melhorado na comunicação?
          <textarea
            name="q5"
            onChange={handleChange}
            className="w-full mt-2 border rounded-lg p-2"
            rows={3}
          />
        </label>

        <label className="block font-semibold">
          6. Quais sugestões você daria para aprimorar a gestão?
          <textarea
            name="q6"
            onChange={handleChange}
            className="w-full mt-2 border rounded-lg p-2"
            rows={3}
          />
        </label>
      </div>

      {/* Múltipla Escolha */}
      <div className="space-y-4">
        <p className="font-semibold">
          7. Quais áreas você considera mais fortes na instituição?
        </p>
        {["Gestão", "Educação", "Comunicação", "Infraestrutura"].map((opt) => (
          <label key={opt} className="block">
            <input
              type="checkbox"
              name="q7"
              value={opt}
              onChange={handleChange}
              className="mr-2"
            />
            {opt}
          </label>
        ))}

        <p className="font-semibold">
          8. Quais valores você mais identifica na equipe?
        </p>
        {["Empatia", "Responsabilidade", "Inovação", "Transparência"].map(
          (opt) => (
            <label key={opt} className="block">
              <input
                type="checkbox"
                name="q8"
                value={opt}
                onChange={handleChange}
                className="mr-2"
              />
              {opt}
            </label>
          )
        )}
      </div>

      {/* Avaliações */}
      <div className="space-y-4">
        <p className="font-semibold">9. Avalie o clima organizacional:</p>
        <RatingStars
          value={formData.q9}
          onChange={(val) => setFormData({ ...formData, q9: val })}
        />

        <p className="font-semibold">10. Avalie o suporte da liderança:</p>
        <RatingStars
          value={formData.q10}
          onChange={(val) => setFormData({ ...formData, q10: val })}
        />
      </div>

      <div className="pt-6">
        <button
          type="submit"
          className="w-full bg-indigo-900 hover:bg-indigo-800 text-white font-semibold py-3 rounded-xl text-lg transition"
        >
          Enviar Respostas
        </button>
      </div>
    </motion.form>
  );
}
