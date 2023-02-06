import { NestFactory } from '@nestjs/core';
import { MicroseviceModule } from './microsevice.module';

async function bootstrap() {
  const app = await NestFactory.create(MicroseviceModule);
  await app.listen(3000);
}
bootstrap();
