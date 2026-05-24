"use client";

import { useState } from "react";
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
  {
    id: "3",
    title: "Feriado",
    body: "Na próxima sexta teremos ponto facultativo.",
    type: "info",
  },
  {
    id: "4",
    title: "Treinamento",
    body: "Treinamento de CIPA às 14h na sala 3.",
    type: "alerta",
  },
];

export function NoticesSection() {
  const [current, setCurrent] = useState(0);
  const notice = notices[current];

  return (
    <Card className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-base font-bold text-slate-800">Quadro de Avisos</h3>
        <a
          href="#"
          className="text-sm font-semibold text-[#0e7c94] hover:underline"
        >
          Ver todos
        </a>
      </div>

      <div className="bg-[#fff6f0] flex-1 rounded-2xl p-8 flex flex-col justify-center relative">
        <div className="flex items-center gap-6 mb-6">
          <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
            {/* <Megaphone className="h-8 w-8 text-[#f7863a]" strokeWidth={1.5} /> */}
            <div className="absolute inset-0 bg-[#b7e1eb] rounded-full " />
            <img
              src="/icon-megaphone.png"
              alt="Ícone de aviso"
              className="absolute top-0 left-2"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xl font-bold text-[#d9651b] mb-2">
              {notice.title}
            </p>
            <p className="text-[0.95rem] font-medium text-slate-700 leading-snug">
              {notice.body}
            </p>
          </div>
        </div>

        {notices.length > 1 && (
          <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-3">
            {notices.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === current ? "w-2.5 bg-[#f7863a]" : "w-2.5 bg-slate-300"
                }`}
                aria-label={`Aviso ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
