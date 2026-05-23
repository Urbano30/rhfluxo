import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Palmtree, Plane } from "lucide-react";

export function VacationSection() {
  return (
    <Card className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-base font-bold text-slate-800">Férias marcadas</h3>
        <a
          href="#"
          className="text-sm font-semibold text-[#0e7c94] hover:underline"
        >
          Ver todas
        </a>
      </div>

      <div className="flex items-center gap-6 mb-8 flex-1">
        {/* Illustration Placeholder */}
        <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#e4eff5] rounded-full opacity-60" />
          <div className="absolute bottom-4 w-20 h-2 bg-[#0e7c94]/20 rounded-full blur-sm" />
          <Palmtree
            className="h-14 w-14 text-[#0e7c94] absolute bottom-6 right-8"
            strokeWidth={1.5}
          />
          <Palmtree
            className="h-10 w-10 text-[#0e7c94]/70 absolute bottom-6 left-6"
            strokeWidth={1.5}
          />
          <Plane
            className="h-6 w-6 text-[#0e7c94] absolute top-4 left-4 -rotate-45"
            strokeWidth={1.5}
          />
          <div className="absolute bottom-6 w-24 h-1 bg-[#0e7c94] rounded-full" />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-slate-500 mb-1">
            Próximas férias
          </p>
          <p className="text-xl font-extrabold text-[#0e7c94] mb-2 leading-tight">
            15/07/2024 a 29/07/2024
          </p>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-500">15 dias</span>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0 font-bold px-2.5 rounded-md">
              Aprovada
            </Badge>
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
            01/07/2023 a 30/06/2024
          </span>
        </div>
      </div>
    </Card>
  );
}
