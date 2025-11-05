// src/hooks/useTokenValidation.js
import { useEffect, useState } from "react";
import { ref, get, child } from "firebase/database";
import { db } from "../firebase";


export function useTokenValidation(token) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    const fetchToken = async () => {
      try {
        const snapshot = await get(child(ref(db), `tokens/${token}`));

        if (!snapshot.exists()) {
          setStatus("invalid");
        } else if (snapshot.val().respondido) {
          setStatus("respondido");
        } else {
          setStatus("valid");
        }
      } catch (error) {
        console.error("Erro ao validar token:", error);
        setStatus("invalid"); // fallback em caso de erro
      }
    };

    fetchToken();
  }, [token]);

  return status;
}
