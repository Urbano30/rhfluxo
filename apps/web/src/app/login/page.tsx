import Image from "next/image";
import { LoginForm } from "./components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-white overflow-hidden">
      {/* Lado Esquerdo - Formulário */}
      <div className="flex w-full lg:w-[40%] flex-col justify-center items-center p-8 sm:p-12">
        <div className="w-full max-w-[380px] space-y-8">
          <div className="flex flex-col items-center text-center">
            {/* Logo da marca */}
            <div className="flex items-center justify-center mb-6">
              <Image
                src="/logo.png"
                alt="rhfluxo"
                width={220}
                height={80}
                className="object-contain"
                priority
              />
            </div>

            <h2 className="text-3xl font-extrabold text-slate-800">
              Bem-vindo de volta!
            </h2>
            <p className="mt-2 text-base text-slate-500 font-medium">
              Faça login para continuar
            </p>
          </div>

          <LoginForm />

          <p className="text-sm text-slate-500 font-medium text-center pt-8">
            Versão 1.0.0
          </p>
        </div>
      </div>

      {/* Lado Direito - Imagem e Apresentação */}
      <div className="hidden lg:flex w-[60%] bg-[#f4f7f9] relative flex-col pl-16 pr-8 pt-20">
        <div className="max-w-2xl z-10 mb-8">
          <h2 className="text-4xl font-bold text-[#4ea5b9] leading-[1.2] mb-4">
            Gestão de pessoas
            <br />
            simples, completa e eficiente
          </h2>
          <p className="text-[1.1rem] text-slate-600 font-medium leading-relaxed">
            O <b> rhfluxo </b> conecta pessoas, processos e<br />
            informações em um só lugar.
          </p>
        </div>

        <div className="relative flex-1 w-full mt-4 flex justify-start items-start">
          <div className="relative w-[120%] max-w-[1000px] h-full">
            <Image
              src="/2-home_full.png"
              alt="Dashboard Preview do RHFLuXO"
              fill
              className="object-contain object-top object-left drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
