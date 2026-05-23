import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell } from "lucide-react";

interface TopbarProps {
  userName: string;
  userRole?: string;
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

export function Topbar({ userName, userRole = "Analista de RH" }: TopbarProps) {
  const initials = userName
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  return (
    <header className="flex items-center justify-between px-8 py-5 bg-[#0e7c94] shrink-0">
      <div>
        <h1 className="text-[1.75rem] font-bold text-white leading-tight">
          Olá, {userName.split(" ")[0]}! 👋
        </h1>
        <p className="text-[0.95rem] text-white/90 mt-1">
          {getFormattedDate()}
        </p>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative p-2 rounded-xl hover:bg-white/10 transition-colors">
          <Bell className="h-6 w-6 text-white" strokeWidth={1.5} />
          <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-[#f7863a] border-2 border-[#0e7c94]" />
        </button>

        <div className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity">
          <Avatar className="h-10 w-10 border-2 border-white/20">
            <AvatarFallback className="bg-white/10 text-white text-sm font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white leading-tight">
              {userName}
            </span>
            <span className="text-xs text-white/80 leading-tight">
              {userRole}
            </span>
          </div>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white ml-1"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </header>
  );
}
