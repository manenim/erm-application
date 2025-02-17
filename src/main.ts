import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix("api");
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });
  // {
  //   "email": "jane.doe@example.com",
  //     "password": "Pass!@#321"
  // }
  const config = new DocumentBuilder()
    .setTitle('ERM-Application API')
    .setDescription('The ERM-Application API for managing Users, Roles, and Permissions \n\n**Test admin credentials:**\n\nEmail: jane.doe@example.com\n\nPassword: Pass!@#321')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
