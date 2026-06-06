import Image from "next/image";
import { LoginForm } from "./components/LoginForm";

export default function LoginPage() {
  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen flex flex-col md:flex-row overflow-hidden relative">
      {/* Left Brand Area (Desktop Only) */}
      <div
        className="hidden md:flex flex-1 relative bg-[#006879] text-white overflow-hidden justify-center p-12 items-start"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("/login-bg.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="relative z-10 max-w-lg text-center md:text-left space-y-6 pt-12">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight select-none">
            Gestão de pessoas simples, completa e eficiente.
          </h1>
          <p className="text-lg md:text-xl text-[#95e9ff] select-none font-medium">
            O rhfluxo conecta pessoas, processos e informações em um só lugar.
            Human-centric efficiency at its best.
          </p>
        </div>
      </div>

      {/* Right Login Area */}
      <div className="flex-1 flex flex-col justify-between bg-white relative z-10 shadow-[-20px_0_40px_-10px_rgba(0,0,0,0.05)] md:rounded-l-3xl h-screen overflow-y-auto">
        <div className="flex-grow flex flex-col justify-center items-center p-6 md:p-12 w-full max-w-md mx-auto">
          {/* Mobile Header/Logo */}
          <div className="md:hidden flex flex-col items-center mb-12 w-full">
            <div className="flex items-center gap-1 mb-2">
              <span className="text-[#9a4600] text-3xl font-extrabold select-none">
                rh
              </span>
              <span className="text-[#006879] text-3xl font-bold select-none">
                Fluxo
              </span>
              <span
                className="material-symbols-outlined text-[#9a4600] text-3xl select-none"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                data_usage
              </span>
            </div>
          </div>

          {/* Login Container */}
          <div className="w-full bg-white md:bg-transparent rounded-xl md:rounded-none p-8 md:p-0 shadow-[0_4px_24px_rgba(0,0,0,0.02)] md:shadow-none border border-[#e0c0b2] md:border-none">
            <div className="flex justify-center mb-12 pt-1">
              <Image
                src="/logo.png"
                alt="rhFluxo Logo"
                width={200}
                height={64}
                className="h-16 w-auto object-contain"
                priority
              />
            </div>
            <div className="text-center mb-12 space-y-2">
              <h2 className="text-2xl font-bold text-[#191c1e]">
                Bem-vindo de volta!
              </h2>
              <p className="text-base text-[#584237]/80 font-medium">
                Faça login para continuar
              </p>
            </div>

            <LoginForm />

            <div className="mt-12 text-center">
              <p className="text-xs text-[#584237]/60 font-semibold opacity-60">
                Versão 1.0.0
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full flex flex-col md:flex-row justify-between items-center px-6 py-8 bg-white border-t border-[#e0c0b2]/30 mt-auto">
          <div className="mb-4 md:mb-0">
            <span className="text-xs text-[#584237]/60 font-semibold flex items-center">
              <Image
                src="/logo-icon.png"
                alt="rhFluxo Icon"
                width={16}
                height={16}
                className="inline-block h-4 w-auto mr-2"
              />
              © 2026 rhfluxo. Human-centric efficiency.
            </span>
          </div>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-[#584237]/60 font-semibold hover:text-[#006879] underline transition-all duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-[#584237]/60 font-semibold hover:text-[#006879] underline transition-all duration-200"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-xs text-[#584237]/60 font-semibold hover:text-[#006879] underline transition-all duration-200"
            >
              Support
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
