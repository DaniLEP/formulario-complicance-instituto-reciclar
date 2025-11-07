// "use client"

import { useState } from "react"
import { ref, set, update } from "firebase/database"
import { db } from "../../firebase"
import { useTokenValidation } from "../../hooks/useTokenValidation"

export default function FormPage() {
  const params = new URLSearchParams(window.location.search)
  const token = params.get("token")

  const status = useTokenValidation(token)

  const perguntas = [
    { tipo: "texto", pergunta: "Como você avalia o ambiente físico da instituição?" },
    { tipo: "texto", pergunta: "Quais melhorias você sugeriria para o processo de ensino?" },
    { tipo: "texto", pergunta: "Como você avalia o relacionamento entre alunos e professores?" },
    { tipo: "texto", pergunta: "Comente sobre a qualidade do suporte administrativo oferecido." },
    { tipo: "texto", pergunta: "O que mais te motiva a participar das atividades da instituição?" },

    { tipo: "multipla", pergunta: "A comunicação institucional é clara e eficiente?", opcoes: ["Excelente", "Boa", "Regular", "Ruim"] },
    { tipo: "multipla", pergunta: "Como você avalia a qualidade do material didático?", opcoes: ["Excelente", "Boa", "Regular", "Ruim"] },
    { tipo: "multipla", pergunta: "O atendimento da secretaria é satisfatório?", opcoes: ["Sim, totalmente", "Parcialmente", "Não muito", "De forma alguma"] },
    { tipo: "multipla", pergunta: "Você recomendaria a instituição a outras pessoas?", opcoes: ["Com certeza", "Provavelmente", "Talvez", "Não"] },
    { tipo: "multipla", pergunta: "Os professores demonstram domínio do conteúdo?", opcoes: ["Sim", "Parcialmente", "Não"] },

    { tipo: "texto", pergunta: "Quais atividades extracurriculares você considera mais relevantes?" },
    { tipo: "multipla", pergunta: "Com que frequência você utiliza os recursos digitais da instituição?", opcoes: ["Diariamente", "Semanalmente", "Raramente", "Nunca"] },
    { tipo: "texto", pergunta: "Deixe um comentário livre sobre sua experiência geral." },
  ]

  const [paginaAtual, setPaginaAtual] = useState(0)
  const perguntasPorPagina = 5
  const totalPaginas = Math.ceil(perguntas.length / perguntasPorPagina)

  const [formData, setFormData] = useState(Object.fromEntries(perguntas.map((_, i) => [`pergunta${i + 1}`, ""])))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!Object.values(formData).every((v) => v.trim() !== "")) {
      alert("Preencha todas as perguntas antes de enviar!")
      return
    }

    setIsSubmitting(true)
    try {
      await set(ref(db, `responses/${token}`), {
        token,
        respostas: formData,
        dataEnvio: new Date().toISOString(),
      })

      await update(ref(db, `tokens/${token}`), {
        used: true,
        completedAt: new Date().toISOString(),
      })

      setSubmitted(true)
    } catch (err) {
      console.error(err)
      alert("Erro ao enviar o formulário!")
    } finally {
      setIsSubmitting(false)
    }
  }

  const proximaPagina = () => setPaginaAtual((p) => Math.min(p + 1, totalPaginas - 1))
  const paginaAnterior = () => setPaginaAtual((p) => Math.max(p, 0))

  if (status === "loading")
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-700 rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Carregando...</p>
        </div>
      </div>
    )

  if (status === "invalid")
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center border-l-4 border-red-500">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Token Inválido</h2>
          <p className="text-slate-600">O token fornecido não é válido ou expirou.</p>
        </div>
      </div>
    )

  if (status === "respondido")
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center border-l-4 border-amber-500">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Token Já Utilizado</h2>
          <p className="text-slate-600">Este token já foi usado para responder o formulário.</p>
        </div>
      </div>
    )

  if (submitted)
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50">
        <div className="bg-white p-12 rounded-xl shadow-xl max-w-md text-center border border-slate-200">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Respostas Enviadas com Sucesso</h1>
          <p className="text-slate-600">Obrigado por sua participação e contribuição valiosa.</p>
        </div>
      </div>
    )

  const inicio = paginaAtual * perguntasPorPagina
  const fim = inicio + perguntasPorPagina
  const perguntasVisiveis = perguntas.slice(inicio, fim)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50">
      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-700">Progresso do Formulário</h3>
          <span className="text-sm font-medium bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 bg-clip-text text-transparent">
            {paginaAtual + 1} de {totalPaginas}
          </span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 transition-all duration-300"
            style={{ width: `${((paginaAtual + 1) / totalPaginas) * 100}%` }}
          ></div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-10 rounded-xl shadow-lg border border-slate-200 space-y-8"
      >
        <div className="border-b border-slate-200 pb-8 mb-8">
          <h1 className="text-3xl font-bold text-slate-900 text-center mb-2">Formulário de Avaliação Institucional</h1>
          <p className="text-slate-600 text-center text-sm">Sua opinião é fundamental para nosso desenvolvimento</p>
        </div>

        {perguntasVisiveis.map((q, index) => {
          const nomeCampo = `pergunta${inicio + index + 1}`
          return (
            <div key={nomeCampo} className="space-y-3">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700 mb-1 block">
                  <span className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 bg-clip-text text-transparent font-bold">{inicio + index + 1}.</span> {q.pergunta}
                </span>
              </label>

              {q.tipo === "texto" ? (
                <textarea
                  name={nomeCampo}
                  value={formData[nomeCampo]}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-transparent transition resize-none"
                  placeholder="Digite sua resposta aqui..."
                  required
                />
              ) : (
                <div className="space-y-2">
                  {q.opcoes.map((opcao) => (
                    <label
                      key={opcao}
                      className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-white hover:bg-gradient-to-br hover:from-indigo-900 hover:via-purple-900 hover:to-pink-800 cursor-pointer transition group"
                    >
                      <input
                        type="radio"
                        name={nomeCampo}
                        value={opcao}
                        checked={formData[nomeCampo] === opcao}
                        onChange={handleChange}
                        className="w-5 h-5 text-indigo-900 border-slate-300 focus:ring-indigo-900 cursor-pointer"
                        required
                      />
                      <span className="text-slate-700 group-hover:text-white font-medium">{opcao}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )
        })}

        <div className="flex justify-between items-center pt-8 border-t border-slate-200">
          <button
            type="button"
            onClick={paginaAnterior}
            disabled={paginaAtual === 0}
            className="px-6 py-2.5 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Anterior
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPaginas }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPaginaAtual(i)}
                className={`w-2 h-2 rounded-full transition ${
                  i === paginaAtual
                    ? "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800"
                    : "bg-slate-300"
                }`}
              />
            ))}
          </div>

          {paginaAtual === totalPaginas - 1 ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md"
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </button>
          ) : (
            <button
              type="button"
              onClick={proximaPagina}
              className="px-6 py-2.5 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white font-semibold rounded-lg transition shadow-md"
            >
              Próxima
            </button>
          )}
        </div>
      </form>

     <p className="mt-8 text-sm text-slate-500 text-center">
      Seus dados estão protegidos e serão tratados com confidencialidade, em conformidade com a LGPD.
    </p>

    </div>
  )
}
