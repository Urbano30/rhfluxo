import { z } from "zod";

// --- EXEMPLOS DE SCHEMAS GLOBAIS ---

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  createdAt: z.date().optional(),
});

export type UserDTO = z.infer<typeof UserSchema>;

export const AuthLoginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export type AuthLoginDTO = z.infer<typeof AuthLoginSchema>;

// Exporte tudo para ser usado nos Apps e na API.
