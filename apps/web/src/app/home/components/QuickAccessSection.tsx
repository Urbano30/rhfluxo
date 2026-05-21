import { Clock, Plane, FileText, File, User } from "lucide-react";
import Link from "next/link";

interface QuickLink {
  label: string;
  href: string;
  icon: React.ElementType;
  color: string;
  bg: string;
}

const quickLinks: QuickLink[] = [
  {
    label: "Ponto",
    href: "/ponto",
    icon: Clock,
    color: "text-[#f7863a]",
    bg: "bg-[#f7863a]",
  },
  {
    label: "Férias",
    href: "/ferias",
    icon: Plane,
    color: "text-[#f7863a]",
    bg: "bg-[#f7863a]",
  },
  {
    label: "Atestados",
    href: "/atestados",
    icon: FileText,
    color: "text-[#f7863a]",
    bg: "bg-[#f7863a]",
  },
  {
    label: "Documentos",
    href: "/documentos",
    icon: File,
    color: "text-[#4ea5b9]",
    bg: "bg-[#4ea5b9]",
  },
  {
    label: "Perfil",
    href: "/perfil",
    icon: User,
    color: "text-[#4ea5b9]",
    bg: "bg-[#4ea5b9]",
  },
];

export function QuickAccessSection() {
  return (
    <div>
      <h3 className="text-base font-semibold text-slate-700 mb-4">
        Acesse rapidamente
      </h3>

      <div className="flex flex-wrap gap-6">
        {quickLinks.map(({ label, href, icon: Icon, bg }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-2 group"
          >
            <div
              className={`flex items-center justify-center w-14 h-14 rounded-2xl ${bg} shadow-sm group-hover:scale-105 transition-transform`}
            >
              <Icon className="h-7 w-7 text-white" />
            </div>
            <span className="text-xs font-medium text-slate-600 group-hover:text-slate-800 transition-colors">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
