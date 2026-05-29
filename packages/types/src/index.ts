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

// --- MÓDULO DE FÉRIAS (VACATION) ---

export const VacationStatusSchema = z.enum(["PENDING", "APPROVED", "REJECTED"]);
export type VacationStatus = z.infer<typeof VacationStatusSchema>;

export const VacationSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  startDate: z.string(), // data formato ISO (ex: "2026-07-15")
  endDate: z.string(), // data formato ISO
  days: z.number().int().min(1),
  status: VacationStatusSchema,
  acquisitionPeriodStart: z.string(), // data formato ISO
  acquisitionPeriodEnd: z.string(), // data formato ISO
});

export type VacationDTO = z.infer<typeof VacationSchema>;

// Exporte tudo para ser usado nos Apps e na API.
