import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface BirthdayPerson {
  id: string;
  name: string;
  avatarUrl?: string;
  initials: string;
  dateLabel: string;
  isToday: boolean;
}

const birthdayPeople: BirthdayPerson[] = [
  {
    id: "1",
    name: "Ana Oliveira",
    initials: "AO",
    dateLabel: "Hoje",
    isToday: true,
  },
  {
    id: "2",
    name: "Carlos Silva",
    initials: "CS",
    dateLabel: "26 Mai",
    isToday: false,
  },
  {
    id: "3",
    name: "Mariana Santos",
    initials: "MS",
    dateLabel: "28 Mai",
    isToday: false,
  },
];

export function BirthdaySection() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-700">
          Aniversariantes da equipe
        </h3>
        <a
          href="#"
          className="text-sm font-medium text-[#4ea5b9] hover:underline"
        >
          Ver todos
        </a>
      </div>

      <div className="flex flex-wrap gap-6">
        {birthdayPeople.map((person) => (
          <div key={person.id} className="flex flex-col items-center gap-2">
            <div className="relative">
              <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                {person.avatarUrl && (
                  <AvatarImage src={person.avatarUrl} alt={person.name} />
                )}
                <AvatarFallback className="bg-[#4ea5b9]/10 text-[#4ea5b9] font-semibold text-base">
                  {person.initials}
                </AvatarFallback>
              </Avatar>
              {person.isToday && (
                <span className="absolute -bottom-1 -right-1 text-base">
                  🎂
                </span>
              )}
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-700 leading-none">
                {person.name}
              </p>
              <Badge
                variant="secondary"
                className={`mt-1 text-xs font-medium ${
                  person.isToday
                    ? "bg-[#f7863a]/10 text-[#f7863a] border-0"
                    : "bg-slate-100 text-slate-500 border-0"
                }`}
              >
                {person.dateLabel}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
