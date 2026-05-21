import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell } from "lucide-react";

interface TopbarProps {
  userName: string;
}

function getFormattedDate(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const raw = now.toLocaleDateString("pt-BR", options);
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

export function Topbar({ userName }: TopbarProps) {
  const initials = userName
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  return (
    <header className="flex items-center justify-between px-8 py-5 bg-white border-b border-slate-100 shrink-0">
      <div>
        <h1 className="text-xl font-bold text-slate-800">
          Olá, {userName.split(" ")[0]}! 👋
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">{getFormattedDate()}</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-xl hover:bg-slate-50 transition-colors">
          <Bell className="h-5 w-5 text-slate-500" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#f7863a]" />
        </button>
        <Avatar className="h-9 w-9 border-2 border-[#4ea5b9]/20">
          <AvatarFallback className="bg-[#4ea5b9]/10 text-[#4ea5b9] text-sm font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
