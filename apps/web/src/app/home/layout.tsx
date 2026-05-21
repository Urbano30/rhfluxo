import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-[#f4f7f9]">
        <Sidebar />
        <div className="flex flex-col flex-1 min-w-0">{children}</div>
      </div>
    </TooltipProvider>
  );
}
