"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, AlertCircle } from "lucide-react";
import { useVacation } from "@/hooks/useVacation";

export function VacationSection() {
  const { vacations, loading, error } = useVacation();

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  };

  const statusConfig = {
    APPROVED: {
      label: "Aprovada",
      class:
        "bg-green-50 text-green-700 hover:bg-green-50 border-0 font-bold px-2.5 rounded-md",
    },
    PENDING: {
      label: "Pendente",
      class:
        "bg-amber-50 text-amber-700 hover:bg-amber-50 border-0 font-bold px-2.5 rounded-md",
    },
    REJECTED: {
      label: "Recusada",
      class:
        "bg-rose-50 text-rose-700 hover:bg-rose-50 border-0 font-bold px-2.5 rounded-md",
    },
  };

  if (loading) {
    return (
      <Card className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-full animate-pulse">
        <div className="flex items-center justify-between mb-8">
          <div className="h-4 w-28 bg-slate-100 rounded" />
          <div className="h-4 w-16 bg-slate-100 rounded" />
        </div>
        <div className="flex items-center gap-6 mb-8 flex-1">
          <div className="w-28 h-28 bg-slate-50 rounded-full shrink-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full" />
          </div>
          <div className="flex flex-col justify-center gap-2 flex-1">
            <div className="h-3 w-24 bg-slate-100 rounded" />
            <div className="h-6 w-48 bg-slate-100 rounded" />
            <div className="h-4 w-20 bg-slate-100 rounded" />
          </div>
        </div>
        <div className="flex gap-4 items-start mt-auto">
          <div className="p-4 bg-slate-50 rounded-lg w-10 h-10 shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-3 w-20 bg-slate-100 rounded" />
            <div className="h-4 w-36 bg-slate-100 rounded" />
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-full justify-center items-center text-center">
        <AlertCircle className="h-10 w-10 text-rose-500 mb-2" />
        <p className="text-sm font-bold text-slate-800 mb-1">
          Falha ao carregar
        </p>
        <p className="text-xs text-slate-500">{error}</p>
      </Card>
    );
  }

  const activeVacation = vacations[0];

  if (!activeVacation) {
    return (
      <Card className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-full justify-center items-center text-center">
        <Calendar className="h-10 w-10 text-slate-300 mb-2" />
        <p className="text-sm font-bold text-slate-800">
          Sem férias programadas
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Nenhuma solicitação de férias encontrada.
        </p>
      </Card>
    );
  }

  const config = statusConfig[activeVacation.status] || {
    label: activeVacation.status,
    class:
      "bg-slate-50 text-slate-700 hover:bg-slate-50 border-0 font-bold px-2.5",
  };

  return (
    <Card className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-full transition-all hover:shadow-md duration-300">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-base font-bold text-slate-800">Férias marcadas</h3>
        <a
          href="#"
          className="text-sm font-semibold text-[#0e7c94] hover:underline transition-colors"
        >
          Ver todas
        </a>
      </div>

      <div className="flex items-center gap-6 mb-8 flex-1">
        <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#FFF6F0] rounded-full" />
          <div className="absolute bottom-4 w-20 h-2 bg-[#0e7c94]/20 rounded-full blur-sm" />
          <img
            src="/icon-vacation.png"
            alt="Ícone de férias"
            className="absolute top-2 left-2 transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-slate-500 mb-1">
            Próximas férias
          </p>
          <p className="text-xl font-extrabold text-[#0e7c94] mb-2 leading-tight">
            {formatDate(activeVacation.startDate)} a{" "}
            {formatDate(activeVacation.endDate)}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-500">
              {activeVacation.days} dias
            </span>
            <Badge className={config.class}>{config.label}</Badge>
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-start mt-auto">
        <div className="p-2 rounded-lg bg-slate-50 shrink-0">
          <Calendar className="h-6 w-6 text-slate-400" strokeWidth={1.5} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-slate-500 font-medium">
            Período aquisitivo
          </span>
          <span className="text-sm font-bold text-slate-800">
            {formatDate(activeVacation.acquisitionPeriodStart)} a{" "}
            {formatDate(activeVacation.acquisitionPeriodEnd)}
          </span>
        </div>
      </div>
    </Card>
  );
}
