"use client"

import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { db, ref, get, set, update } from "../../firebase"
import Header from "../components/Header"

export default function FormPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")

  const [isValidToken, setIsValidToken] = useState(null)
  const [formData, setFormData] = useState({
    pergunta1: "",
    pergunta2: "",
    pergunta3: "",
    pergunta4: "",
    pergunta5: "",
    pergunta6: "",
    pergunta7: "",
    pergunta8: "",
    pergunta9: "",
    pergunta10: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // 🔍 Validação do token no Firebase
  useEffect(() => {
    const validateToken = async () => {
      if (!token) return setIsValidToken(false)

      const tokenRef = ref(db, `tokens/${token}`)
      const snapshot = await get(tokenRef)

      if (snapshot.exists()) {
        const tokenData = snapshot.val()
        if (!tokenData.used) {
          setIsValidToken(true)
        } else {
          setIsValidToken("used")
        }
      } else {
        setIsValidToken(false)
      }
    }

    validateToken()
  }, [token])

  // 🧠 Manipulação das respostas
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // 📤 Envio para Firebase
  const handleSubmit = async (e) => {
    e.preventDefault()

    const allFilled = Object.values(formData).every((value) => value.trim() !== "")
    if (!allFilled) {
      alert("Por favor, preencha todas as perguntas antes de enviar.")
      return
    }

    setIsSubmitting(true)

    try {
      const formRef = ref(db, `responses/${token}`)
      await set(formRef, {
        token,
        respostas: formData,
        dataEnvio: new Date().toISOString(),
      })

      const tokenRef = ref(db, `tokens/${token}`)
      await update(tokenRef, { used: true, completedAt: new Date().toISOString() })

      setSubmitted(true)
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
      alert("Ocorreu um erro ao enviar suas respostas. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // --- TELAS DE VALIDAÇÃO ---
  if (isValidToken === null)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-700 text-lg font-medium">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          Validando token...
        </div>
      </div>
    )

  if (isValidToken === false)
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-slate-900">Token inválido</h1>
          <p className="text-slate-600 text-lg">Verifique se o link está correto.</p>
        </div>
      </div>
    )

  if (isValidToken === "used")
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-slate-900">Formulário já respondido</h1>
          <p className="text-slate-600 text-lg">Esse link já foi utilizado anteriormente.</p>
        </div>
      </div>
    )

  if (submitted)
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900">
        <div className="bg-white/5 backdrop-blur-xl p-12 rounded-2xl text-center shadow-2xl max-w-md border border-white/10">
          <div className="mb-4 text-4xl">✓</div>
          <h1 className="text-3xl font-bold text-white mb-3">Resposta enviada com sucesso</h1>
          <p className="text-blue-100 text-base leading-relaxed">
            Agradecemos sua colaboração e compromisso com o Compliance.
          </p>
        </div>
      </div>
    )

  // --- FORMULÁRIO PRINCIPAL ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      {/* HEADER FIXO */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/80 shadow-sm border-b border-slate-200/50">
        <Header />
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex-1 flex flex-col items-center py-16 px-4">
        <form onSubmit={handleSubmit} className="w-full max-w-4xl space-y-10">
          {/* TÍTULO DO FORMULÁRIO */}
          <div className="text-center space-y-3 mb-12">
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Formulário de Avaliação</h1>
            <p className="text-slate-600 text-lg">Complete todas as questões abaixo com atenção</p>
          </div>

          {/* SEÇÃO 1: PERGUNTAS DISSERTATIVAS */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Parte 1</h2>
              <p className="text-slate-600 font-medium">Questões Dissertativas</p>
              <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
            </div>

            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-3">
                <label className="block text-lg font-semibold text-slate-900">Questão {i}</label>
                <textarea
                  name={`pergunta${i}`}
                  value={formData[`pergunta${i}`]}
                  onChange={handleChange}
                  required
                  placeholder="Digite sua resposta com clareza e objetividade..."
                  className="w-full px-5 py-4 rounded-lg bg-slate-50 border-2 border-slate-200 text-slate-900 placeholder-slate-500 text-base focus:outline-none focus:border-blue-500 focus:bg-white transition-all resize-none h-28 font-normal"
                />
              </div>
            ))}
          </div>

          {/* SEÇÃO 2: MÚLTIPLA ESCOLHA */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Parte 2</h2>
              <p className="text-slate-600 font-medium">Questões de Múltipla Escolha</p>
              <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
            </div>

            {[6, 7, 8, 9, 10].map((i) => (
              <div key={i} className="space-y-3">
                <label className="block text-lg font-semibold text-slate-900">Questão {i}</label>
                <select
                  name={`pergunta${i}`}
                  value={formData[`pergunta${i}`]}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 rounded-lg bg-slate-50 border-2 border-slate-200 text-slate-900 text-base focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-normal appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231e293b' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    paddingRight: "2.5rem",
                  }}
                >
                  <option value="">Selecione uma opção</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                  <option value="Parcialmente">Parcialmente</option>
                  <option value="Prefiro não responder">Prefiro não responder</option>
                </select>
              </div>
            ))}
          </div>

          {/* BOTÃO DE ENVIO */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-400 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Enviando respostas..." : "Enviar Respostas"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
