import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'body-parser';
import { SERVER_CONNECTION_MSG } from './constant/constant';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8080;

  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(helmet());
  app.use(helmet.xssFilter());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, () => `${SERVER_CONNECTION_MSG}: ${port}`);
}
bootstrap();
