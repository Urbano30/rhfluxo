import { Topbar } from "./components/Topbar";
import { BirthdaySection } from "./components/BirthdaySection";
import { NoticesSection } from "./components/NoticesSection";
import { BankHoursSection } from "./components/BankHoursSection";
import { VacationSection } from "./components/VacationSection";

export default function HomePage() {
  return (
    <>
      <Topbar userName="Joana Lima" userRole="Analista de RH" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <BirthdaySection />
            <NoticesSection />
            <BankHoursSection />
            <VacationSection />
          </div>
        </div>
      </main>
    </>
  );
}
