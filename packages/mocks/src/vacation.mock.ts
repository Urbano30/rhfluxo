import { VacationDTO } from "@repo/types";

export const createMockVacation = (
  overrides?: Partial<VacationDTO>,
): VacationDTO => {
  return {
    id: "e43b1740-410a-42b7-872f-510a80ad55a1",
    userId: "f83a45a0-53bc-42b7-872f-410a80ad24fe",
    startDate: "2024-07-15",
    endDate: "2024-07-29",
    days: 15,
    status: "APPROVED",
    acquisitionPeriodStart: "2023-07-01",
    acquisitionPeriodEnd: "2024-06-30",
    ...overrides,
  };
};

export const createMockVacationList = (): VacationDTO[] => [
  createMockVacation(),
  createMockVacation({
    id: "e43b1740-410a-42b7-872f-510a80ad55a2",
    startDate: "2025-01-10",
    endDate: "2025-01-20",
    days: 10,
    status: "PENDING",
    acquisitionPeriodStart: "2024-07-01",
    acquisitionPeriodEnd: "2025-06-30",
  }),
];
