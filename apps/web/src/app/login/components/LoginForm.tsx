"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-6 w-full" onSubmit={(e) => e.preventDefault()}>
      {/* User Input */}
      <div className="space-y-1">
        <Label
          htmlFor="username"
          className="text-xs font-semibold text-[#191c1e] block"
        >
          Usuário
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-[#584237]/60 text-xl select-none">
              person
            </span>
          </div>
          <Input
            id="username"
            type="text"
            placeholder="Digite seu usuário"
            className="w-full pl-10 pr-4 py-3 h-12 bg-[#f7f9fb] border border-[#e0c0b2] rounded-lg text-base text-[#191c1e] placeholder:text-[#584237]/50 focus-visible:ring-2 focus-visible:ring-[#006879] focus-visible:border-[#006879] focus-visible:ring-offset-0 focus-visible:outline-none transition-all"
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="space-y-1">
        <Label
          htmlFor="password"
          className="text-xs font-semibold text-[#191c1e] block"
        >
          Senha
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-[#584237]/60 text-xl select-none">
              lock
            </span>
          </div>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            className="w-full pl-10 pr-10 py-3 h-12 bg-[#f7f9fb] border border-[#e0c0b2] rounded-lg text-base text-[#191c1e] placeholder:text-[#584237]/50 focus-visible:ring-2 focus-visible:ring-[#006879] focus-visible:border-[#006879] focus-visible:ring-offset-0 focus-visible:outline-none transition-all"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#584237]/60 hover:opacity-70 transition-opacity cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            <span className="material-symbols-outlined text-xl select-none">
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        </div>
      </div>

      {/* Forgot Password */}
      <div className="flex justify-start pt-2">
        <a
          href="#"
          className="text-sm font-semibold text-[#006879] hover:underline decoration-[#006879] underline-offset-4 transition-all"
        >
          Esqueceu sua senha?
        </a>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          className="w-full bg-[#e77a2f] hover:bg-[#e77a2f]/90 text-white py-3 h-12 rounded-lg text-lg font-semibold hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          Entrar
        </Button>
      </div>
    </form>
  );
}
