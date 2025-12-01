import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configDotenv } from 'dotenv';
import * as fs from 'fs';

configDotenv();

async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync('../certs/key.pem'),
  //   cert: fs.readFileSync('../certs/cert.pem'),
  // };

  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    // httpsOptions,
  });

  const config = new DocumentBuilder()
    .setTitle('Auth BE')
    .setDescription('Auth Be example')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  await app.listen(process.env.PORT ?? 5000, '0.0.0.0');
}
bootstrap();
