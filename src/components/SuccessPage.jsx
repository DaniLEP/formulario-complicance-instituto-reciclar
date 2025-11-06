"use client"
import { CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function SuccessPage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 px-6"
    >
      {/* Background accent elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-teal-50 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-cyan-50 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-2xl text-center">
        {/* Icon with animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 100 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-200 to-cyan-200 rounded-full blur-lg opacity-60"></div>
            <CheckCircle className="relative w-28 h-28 text-teal-600 drop-shadow-lg" />
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight tracking-tight"
        >
          Resposta enviada com sucesso!
        </motion.h2>

        {/* Subtitle/Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg md:text-xl text-slate-600 leading-relaxed mb-12 font-light"
        >
          Agradecemos por dedicar um tempo para compartilhar sua avaliação. Sua participação é fundamental para o
          aprimoramento institucional.
        </motion.p>

        {/* Accent line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "80px" }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full"
        ></motion.div>
      </div>
    </motion.div>
  )
}
