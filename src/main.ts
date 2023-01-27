import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('yoke QR API v1')
    .setDescription('The API is a solution to an assessment')
    .setVersion('1.0')
    .build();

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://yoke-assessment-fe.onrender.com/',
      'https://yoke-assessment-fe.onrender.com',
    ],
    methods: ['GET', 'POST'],
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger/index', app, document);
  await app.listen(8080);
}
bootstrap();
