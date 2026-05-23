import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

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
    avatarUrl: "/avatars/ana.png", // Optional: will fallback to initials if not found
    initials: "AO",
    dateLabel: "Hoje",
    isToday: true,
  },
  {
    id: "2",
    name: "Carlos Silva",
    avatarUrl: "/avatars/carlos.png",
    initials: "CS",
    dateLabel: "26 Mai",
    isToday: false,
  },
  {
    id: "3",
    name: "Mariana Santos",
    avatarUrl: "/avatars/mariana.png",
    initials: "MS",
    dateLabel: "28 Mai",
    isToday: false,
  },
];

export function BirthdaySection() {
  return (
    <Card className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-base font-bold text-slate-800">
          Aniversariantes da equipe
        </h3>
        <a
          href="#"
          className="text-sm font-semibold text-[#0e7c94] hover:underline"
        >
          Ver todos
        </a>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6 flex-1 px-4">
        {birthdayPeople.map((person) => (
          <div key={person.id} className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="h-[84px] w-[84px] shadow-sm">
                {person.avatarUrl && (
                  <AvatarImage
                    src={person.avatarUrl}
                    alt={person.name}
                    className="object-cover"
                  />
                )}
                <AvatarFallback className="bg-[#4ea5b9]/10 text-[#4ea5b9] font-semibold text-xl">
                  {person.initials}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#f7863a] ring-2 ring-white shadow-sm">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2z"></path>
                  <path d="M12 12v-2"></path>
                  <path d="M8 12v-2"></path>
                  <path d="M16 12v-2"></path>
                  <path d="M12 7h.01"></path>
                  <path d="M8 7h.01"></path>
                  <path d="M16 7h.01"></path>
                </svg>
              </div>
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-bold text-slate-800 leading-none">
                {person.name}
              </p>
              <p className="text-xs font-medium text-slate-400">
                {person.dateLabel}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
