import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
        whitelist:true,   // restricts additional property from body eg.:- with email & password and additional property admine:true , this will trstrict this admin property
  }),
);
  await app.listen(3000);
}
bootstrap();
