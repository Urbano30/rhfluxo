import { UserDTO, VacationDTO } from "@repo/types";
import { createMockUser, createMockVacationList } from "@repo/mocks";

export interface SDKConfig {
  baseUrl?: string;
  useMocks?: boolean;
}

export class RhFluxoSDK {
  private baseUrl: string;
  private useMocks: boolean;

  constructor(config?: SDKConfig) {
    this.baseUrl = config?.baseUrl || "http://localhost:3000/api";
    this.useMocks = config?.useMocks || false;
  }

  // Helper para simular latência de rede (ex: 500ms)
  private async delay(ms = 500): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Obtém o perfil do usuário logado
   */
  async getCurrentUser(): Promise<UserDTO> {
    if (this.useMocks) {
      await this.delay(400);
      return createMockUser();
    }

    const response = await fetch(`${this.baseUrl}/users/me`);
    if (!response.ok) {
      throw new Error("Erro ao obter dados do usuário");
    }
    return response.json();
  }

  /**
   * Obtém a lista de férias cadastradas/solicitadas
   */
  async getVacations(): Promise<VacationDTO[]> {
    if (this.useMocks) {
      await this.delay(600); // Férias geralmente têm um delay um pouco maior para simular realismo
      return createMockVacationList();
    }

    const response = await fetch(`${this.baseUrl}/vacations`);
    if (!response.ok) {
      throw new Error("Erro ao obter lista de férias");
    }
    return response.json();
  }
}

export const SDK_VERSION = "1.0.0";
