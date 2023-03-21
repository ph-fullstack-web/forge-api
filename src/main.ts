import {ConfigService} from '@nestjs/config';
import {NestFactory} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import * as admin from 'firebase-admin';
import helmet from 'helmet';
import {AppConfig} from './config';

import {AppModule} from './app.module';

async function bootstrap() {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: AppConfig.Firebase.ProjectId,
      clientEmail: AppConfig.Firebase.ClientEmail,
      privateKey: AppConfig.Firebase.PrivateKey,
    }),
    storageBucket: 'cec-tracker.appspot.com',
  });
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  const configService = app.get(ConfigService);

  const PORT = Number(process.env.PORT) || configService.get<number>('PORT');
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
    })
  );

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const baseUrl = configService.get<string>('BASE_URL');

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', baseUrl);
    next();
  });

  await app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
    console.log(`Base URL: ${baseUrl}....`);
  });
}
bootstrap();
