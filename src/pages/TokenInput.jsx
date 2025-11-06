"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ref, get } from "../../firebase"
import { db } from "../../firebase"
import Header from "../components/Header"

export default function TokenInputPage() {
  const [token, setToken] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token.trim()) return

    const validateToken = async () => {
      setLoading(true)
      setError(null)
      try {
        const snapshot = await get(ref(db, `tokens/${token}`))
        if (!snapshot.exists()) {
          setError("Token inválido!")
        } else if (snapshot.val().used) {
          setError("Seu formulário ja foi respondido!")
        } else {
          navigate(`/form?token=${token}`)
        }
      } catch (err) {
        console.error(err)
        setError("Erro ao validar token!")
      } finally {
        setLoading(false)
      }
    }

    validateToken()
  }, [token, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      {/* HEADER */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <Header />
      </div>

      {/* CONTEÚDO */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md border border-slate-100">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-3 rounded-lg border border-teal-200">
              <svg className="w-6 h-6 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center tracking-tight">Acesso Exclusivo</h2>
          <p className="text-slate-600 text-center mb-8 text-sm leading-relaxed">
            Insira seu token de acesso para continuar. Este código foi enviado diretamente a você.
          </p>

          <div className="relative mb-6">
            <label className="block text-xs font-semibold text-slate-700 mb-3 uppercase tracking-wide">
              Token de Acesso
            </label>
            <div className="relative">
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 transition duration-300 focus:bg-white focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-sm"
                placeholder="Cole seu token aqui"
                autoFocus
              />
              <div className="absolute right-4 top-10 text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4.242 4.242a4 4 0 105.656 5.656l4.242-4.242"
                  />
                </svg>
              </div>
            </div>
          </div>

          {loading && (
            <div className="flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-200 mb-0">
              <div className="animate-spin">
                <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v20m10-10H2" />
                </svg>
              </div>
              <p className="text-sm font-medium text-teal-700">Validando token...</p>
            </div>
          )}
          {error && (
            <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-red-50 to-rose-50 rounded-lg border border-red-200">
              <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm font-medium text-red-700">{error}</p>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-center text-slate-300 text-xs py-6 border-t border-slate-700">
        <p className="font-medium tracking-wide">
          © {new Date().getFullYear()} - Instituto de Reciclagem do Adolescente
        </p>
      </footer>
    </div>
  )
}
