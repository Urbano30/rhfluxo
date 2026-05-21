import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Topbar } from "./components/Topbar";
import { BirthdaySection } from "./components/BirthdaySection";
import { NoticesSection } from "./components/NoticesSection";
import { QuickAccessSection } from "./components/QuickAccessSection";

export default function HomePage() {
  return (
    <>
      <Topbar userName="Joana Lima" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Aniversariantes + Avisos */}
          <Card className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BirthdaySection />
              <div className="hidden lg:block">
                <Separator orientation="vertical" className="h-full mx-auto" />
              </div>
              <Separator className="lg:hidden" />
              <NoticesSection />
            </div>
          </Card>

          {/* Acesse rapidamente */}
          <Card className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <QuickAccessSection />
          </Card>
        </div>
      </main>
    </>
  );
}
