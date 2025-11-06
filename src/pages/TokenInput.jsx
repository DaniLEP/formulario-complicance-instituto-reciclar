import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ref, get } from "../../firebase";
import { db } from "../../firebase";

export default function TokenInputPage() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Validação automática quando o token muda
  useEffect(() => {
    if (!token.trim()) return;

    const validateToken = async () => {
      setLoading(true);
      setError(null);
      try {
        const snapshot = await get(ref(db, `tokens/${token}`));
        if (!snapshot.exists()) {
          setError("Token inválido!");
        } else if (snapshot.val().used) {
          setError("Token já utilizado!");
        } else {
          // Token válido → redireciona para formulário
          navigate(`/form?token=${token}`);
        }
      } catch (err) {
        console.error(err);
        setError("Erro ao validar token!");
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="flex flex-col space-y-4 w-full max-w-md">
        <label className="text-lg font-semibold">Cole seu token:</label>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="border p-2 rounded"
          placeholder="Digite ou cole o token"
          autoFocus
        />

        {loading && <p className="text-blue-600">Validando token...</p>}
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
}
