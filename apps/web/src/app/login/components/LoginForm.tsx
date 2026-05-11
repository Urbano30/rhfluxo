"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, User } from "lucide-react";
// import { useAuthStore } from "@repo/auth";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-6 w-full" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="text-base font-semibold text-slate-800"
        >
          Usuário
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-slate-400 stroke-[1.5]" />
          </div>
          <Input
            id="email"
            type="text"
            placeholder="Digite seu usuário"
            className="pl-11 h-12 rounded-xl border-slate-200 text-base placeholder:text-slate-400 focus-visible:ring-[#f7863a]"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="password"
          className="text-base font-semibold text-slate-800"
        >
          Senha
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-slate-400 stroke-[1.5]" />
          </div>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            className="pl-11 pr-11 h-12 rounded-xl border-slate-200 text-base placeholder:text-slate-400 focus-visible:ring-[#f7863a]"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 stroke-[1.5]" />
            ) : (
              <Eye className="h-5 w-5 stroke-[1.5]" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center pt-2">
        <a
          href="#"
          className="text-sm font-bold text-[#4ea5b9] hover:underline"
        >
          Esqueceu sua senha?
        </a>
      </div>

      <Button
        type="submit"
        className="w-full h-12 mt-2 bg-[#f7863a] hover:bg-[#e6752b] text-white text-base font-bold rounded-xl transition-colors"
      >
        Entrar
      </Button>
    </form>
  );
}
