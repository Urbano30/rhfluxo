import { LoginForm } from "./components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-[#f7863a] inline-flex items-center">
              rh<span className="text-[#4ea5b9]">fluxo</span>
              <svg
                className="w-8 h-8 ml-1 text-[#f7863a]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
              </svg>
            </h1>
            <h2 className="mt-6 text-3xl font-bold text-slate-900">
              Bem-vindo de volta!
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Faça login para continuar
            </p>
          </div>

          <LoginForm />

          <p className="text-xs text-slate-400 text-center mt-12">
            Versão 1.0.0
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-[#4ea5b9] relative overflow-hidden flex-col justify-center p-12 text-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/10 rounded-full translate-y-1/3 -translate-x-1/4"></div>

        <div className="relative z-10 max-w-lg">
          <h2 className="text-4xl font-bold mb-4">
            Gestão de pessoas simples e eficiente
          </h2>
          <div className="w-12 h-1 bg-[#f7863a] mb-6"></div>
          <p className="text-lg text-teal-100 mb-12">
            O rhfluxo conecta pessoas, processos e informações para impulsionar
            o sucesso da sua empresa.
          </p>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[#f7863a] font-bold text-xl">
                rh<span className="text-white">fluxo</span>
              </span>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-white/40"></div>
                <div className="w-3 h-3 rounded-full bg-white/40"></div>
                <div className="w-3 h-3 rounded-full bg-white/40"></div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4 text-slate-800">
              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-slate-500 font-medium">
                  Colaboradores
                </p>
                <p className="text-2xl font-bold mt-1">128</p>
                <p className="text-[10px] text-green-600">Ativos</p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-slate-500 font-medium">Férias</p>
                <p className="text-2xl font-bold mt-1">32</p>
                <p className="text-[10px] text-orange-500">Em andamento</p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-slate-500 font-medium">Ponto</p>
                <p className="text-2xl font-bold mt-1">96%</p>
                <p className="text-[10px] text-slate-400">Presença mensal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
