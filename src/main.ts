import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  // Setup global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strip properties that do not have any decorators
    forbidNonWhitelisted: true, // Throw errors when non-whitelisted values are provided
    transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
    disableErrorMessages: false, //  hide error messages
    validationError: { target: false } //  exclude the target value in the validation error response
  }));
  app.enableVersioning({
    type: VersioningType.URI
  });
  await app.listen(3010);
}
bootstrap();
