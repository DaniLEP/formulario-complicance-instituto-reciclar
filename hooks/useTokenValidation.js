// src/hooks/useTokenValidation.js
import { useEffect, useState } from "react";
import { ref, get, child } from "firebase/database";
import { db } from "../firebase";


export function useTokenValidation(token) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!token) return setStatus("invalid");

    const fetchToken = async () => {
      const snapshot = await get(child(ref(db), `tokens/${token}`));
      if (!snapshot.exists()) {
        setStatus("invalid");
      } else if (snapshot.val().respondido) {
        setStatus("respondido");
      } else {
        setStatus("valid");
      }
    };

    fetchToken();
  }, [token]);

  return status;
}