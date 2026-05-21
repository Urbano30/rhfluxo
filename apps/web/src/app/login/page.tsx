import Image from "next/image";
import { LoginForm } from "./components/LoginForm";
import { LoginShowcase } from "./components/LoginShowcase";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-[#eef5f9] overflow-hidden relative lg:p-4 gap-4">
      {/* Lado Esquerdo - Apresentação */}
      <div className="hidden lg:flex w-full lg:w-[70%] relative flex-col overflow-hidden rounded-3xl">
        <LoginShowcase />
      </div>

      {/* Lado Direito - Formulário */}
      <div className="flex w-full lg:w-[30%] bg-white lg:rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.05)] flex-col justify-center items-center p-8 sm:p-12 z-20 relative">
        <div className="w-full max-w-[380px] space-y-8">
          <div className="flex flex-col items-center text-center">
            {/* Logo da marca */}
            <div className="flex items-center justify-center mb-6">
              <Image
                src="/logo.png"
                alt="rhfluxo"
                width={200}
                height={72}
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
    </div>
  );
}
