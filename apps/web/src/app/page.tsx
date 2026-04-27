import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
      <h1 className="text-4xl font-bold mb-4 text-foreground">
        RHFluxo Monorepo
      </h1>
      <p className="text-muted-foreground mb-8 text-center max-w-lg">
        Bem-vindo à fundação do seu projeto Web. A arquitetura está pronta e os
        componentes do shadcn já podem ser usados!
      </p>
      <div className="flex gap-4">
        <Button>Começar</Button>
        <Button variant="outline">Documentação</Button>
      </div>
    </main>
  );
}
