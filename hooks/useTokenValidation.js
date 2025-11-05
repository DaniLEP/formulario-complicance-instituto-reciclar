import { useEffect, useState } from "react";
import { ref, get } from "../firebase";
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
        const snapshot = await get(ref(db, `tokens/${token}`));
        if (!snapshot.exists()) setStatus("invalid");
        else if (snapshot.val().used) setStatus("respondido");
        else setStatus("valid");
      } catch (err) {
        console.error(err);
        setStatus("invalid");
      }
    };

    fetchToken();
  }, [token]);

  return status;
}
