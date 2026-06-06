"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CreditCard,
  Plane,
  Clock,
  FileText,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { label: "Início", icon: Home, active: true },
  { label: "Pagamentos", icon: CreditCard, active: false },
  { label: "Férias", icon: Plane, active: false },
  { label: "Ponto", icon: Clock, active: false },
  { label: "Atestados", icon: FileText, active: false },
  { label: "Configurações", icon: Settings, active: false },
];

export function Sidebar() {
  const pathname = usePathname();
  const isHome = pathname === "/home" || pathname.startsWith("/home/");

  return (
    <aside className="hidden lg:flex flex-col w-56 min-h-screen bg-white border-r border-slate-100 shrink-0">
      {/* Logo */}
      <div className="flex items-center h-16 px-5 border-b border-slate-100">
        <Link href="/home">
          <Image
            src="/logo.png"
            alt="rhfluxo"
            width={130}
            height={48}
            className="object-contain"
            priority
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-3 flex-1">
        {navItems.map(({ label, icon: Icon }) => {
          const isActive = label === "Início" && isHome;
          return (
            <Tooltip key={label}>
              <TooltipTrigger
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium select-none w-full border-0 bg-transparent text-left",
                  isActive
                    ? "bg-[#4ea5b9]/10 text-[#4ea5b9] cursor-default"
                    : "text-slate-500 cursor-pointer hover:bg-slate-50/50",
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 shrink-0",
                    isActive ? "text-[#4ea5b9]" : "text-slate-400",
                  )}
                />
                {label}
              </TooltipTrigger>
              <TooltipContent side="right">{label}</TooltipContent>
            </Tooltip>
          );
        })}
      </nav>
    </aside>
  );
}
