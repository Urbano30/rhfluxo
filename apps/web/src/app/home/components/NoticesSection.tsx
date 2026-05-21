"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Megaphone } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Notice {
  id: string;
  title: string;
  body: string;
  type: "alerta" | "info" | "reuniao";
}

const notices: Notice[] = [
  {
    id: "1",
    title: "Reunião Geral",
    body: "Não se esqueça! Nossa reunião geral será na próxima segunda-feira às 09h.",
    type: "reuniao",
  },
  {
    id: "2",
    title: "Ponto Eletrônico",
    body: "Lembramos que o registro de ponto deve ser feito em até 10 min do horário.",
    type: "info",
  },
];

export function NoticesSection() {
  const [current, setCurrent] = useState(0);
  const notice = notices[current];

  const prev = () =>
    setCurrent((c) => (c - 1 + notices.length) % notices.length);
  const next = () => setCurrent((c) => (c + 1) % notices.length);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-700">
          Avisos da empresa
        </h3>
        <a
          href="#"
          className="text-sm font-medium text-[#4ea5b9] hover:underline"
        >
          Ver todos
        </a>
      </div>

      <Card className="bg-[#fff8f4] border border-[#f7863a]/20 shadow-none p-4 rounded-2xl">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#f7863a]/15 shrink-0">
            <Megaphone className="h-5 w-5 text-[#f7863a]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[#f7863a] mb-1">
              {notice.title}
            </p>
            <p className="text-sm text-slate-600 leading-snug">{notice.body}</p>
          </div>
        </div>

        {notices.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              onClick={prev}
              className="p-1 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-4 w-4 text-slate-400" />
            </button>
            <div className="flex gap-1.5">
              {notices.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === current ? "w-4 bg-[#f7863a]" : "w-1.5 bg-slate-200"
                  }`}
                  aria-label={`Aviso ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-1 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Próximo"
            >
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}
