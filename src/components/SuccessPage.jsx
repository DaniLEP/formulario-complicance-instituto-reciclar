// src/components/SuccessPage.jsx
import React from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function SuccessPage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center h-screen text-center bg-gray-50"
    >
      <CheckCircle className="text-green-600 w-24 h-24 mb-6" />
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        Resposta enviada com sucesso!
      </h2>
      <p className="text-gray-600 max-w-md">
        Agradecemos por dedicar um tempo para compartilhar sua avaliação.  
        Sua participação é fundamental para o aprimoramento institucional.
      </p>
    </motion.div>
  );
}
