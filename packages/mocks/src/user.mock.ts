import { UserDTO } from "@repo/types";

export const createMockUser = (overrides?: Partial<UserDTO>): UserDTO => {
  return {
    id: "f83a45a0-53bc-42b7-872f-410a80ad24fe",
    name: "Fabio Urbano",
    email: "fabio@urbano.com.br",
    createdAt: new Date("2026-01-01T00:00:00Z"),
    ...overrides,
  };
};
