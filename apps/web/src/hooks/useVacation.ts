"use client";

import { useEffect, useState, useCallback } from "react";
import { RhFluxoSDK } from "@repo/sdk";
import { VacationDTO } from "@repo/types";

// Instancia o SDK configurado para usar mocks
const sdk = new RhFluxoSDK({
  useMocks: true, // Força mocks para fins de simulação e usabilidade do frontend
});

export function useVacation() {
  const [vacations, setVacations] = useState<VacationDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVacations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await sdk.getVacations();
      setVacations(data);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Erro desconhecido ao carregar férias",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVacations();
  }, [fetchVacations]);

  return {
    vacations,
    loading,
    error,
    refetch: fetchVacations,
  };
}
