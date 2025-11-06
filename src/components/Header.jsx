export default function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        {/* Logo */}
        <div className="flex items-center justify-center sm:justify-start gap-3">
          <img
            src="/Logo.png"
            alt="Instituto Reciclar"
            className="h-12 w-auto sm:h-14 md:h-16 transition-all duration-300"
          />
        </div>

        {/* Título */}
        <h1 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-wide leading-snug max-w-[90%] sm:max-w-none">
          Formulário de Avaliação Institucional
        </h1>
      </div>
    </header>
  );
}
