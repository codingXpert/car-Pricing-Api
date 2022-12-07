import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys:['asdfasfd']    // this key is going to be used to encrypt the information that is stored inside the cookie 
  }))
  app.useGlobalPipes(new ValidationPipe({
        whitelist:true,   // restricts additional property from body eg.:- with email & password and additional property admine:true , this will trstrict this admin property
  }),
);
  await app.listen(3000);
}
bootstrap();
