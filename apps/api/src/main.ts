import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // A porta 3000 já é usada pelo Next.js, então mudamos a API para 3333.
  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
