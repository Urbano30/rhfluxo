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
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-2">
        <Label htmlFor="email">Usuário</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-slate-400" />
          </div>
          <Input
            id="email"
            type="text"
            placeholder="Digite seu usuário"
            className="pl-10 h-12 rounded-lg"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-slate-400" />
          </div>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            className="pl-10 pr-10 h-12 rounded-lg"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-slate-400" />
            ) : (
              <Eye className="h-5 w-5 text-slate-400" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <a
          href="#"
          className="text-sm font-medium text-[#4ea5b9] hover:underline"
        >
          Esqueceu sua senha?
        </a>
      </div>

      <Button
        type="submit"
        className="w-full h-12 bg-[#f7863a] hover:bg-[#e6752b] text-white text-base font-semibold rounded-lg"
      >
        Entrar
      </Button>
    </form>
  );
}
