import { Card } from "@/components/ui/card";
import { Info, ArrowUp, ArrowDown, Calendar } from "lucide-react";

export function BankHoursSection() {
  return (
    <Card className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-slate-800">
            Meu saldo de banco de horas
          </h3>
          <Info className="h-4 w-4 text-slate-400" />
        </div>
        <a
          href="#"
          className="text-sm font-semibold text-[#0e7c94] hover:underline"
        >
          Ver detalhes
        </a>
      </div>

      <div className="flex flex-col items-center justify-center flex-1">
        <h2 className="text-4xl font-extrabold text-[#0e7c94] mb-2">
          +18h 45m
        </h2>
        <p className="text-sm font-bold text-green-600 mb-6">Saldo positivo</p>

        {/* Progress Bar */}
        <div className="w-full max-w-sm h-2.5 bg-slate-100 rounded-full mb-8 overflow-hidden flex">
          <div className="h-full bg-[#0e7c94] w-[68%] rounded-full" />
        </div>

        {/* Info Boxes */}
        <div className="flex w-full max-w-sm items-center justify-between border-t border-slate-100 pt-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-50">
              <ArrowUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">
                Horas positivas
              </p>
              <p className="text-sm font-bold text-slate-800">36h 15m</p>
            </div>
          </div>
          <div className="w-px h-10 bg-slate-100" />
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#f7863a]/10">
              <ArrowDown className="h-5 w-5 text-[#f7863a]" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">
                Horas negativas
              </p>
              <p className="text-sm font-bold text-slate-800">17h 30m</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-[#f4f7f9] p-3 rounded-xl mt-auto">
        <Calendar className="h-4 w-4 text-slate-500" />
        <span className="text-xs text-slate-500 font-medium">
          Atualizado em 24/05/2024 às 08:30
        </span>
      </div>
    </Card>
  );
}
