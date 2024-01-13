import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SeedServiceService } from './seed-service/seed-service.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('JF')
    .setDescription('JF')
    .setVersion('1.0')
    .addTag('')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  try {
    const seedService = app.get(SeedServiceService);
    await seedService.seed();
  } catch (error) {

  }
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
