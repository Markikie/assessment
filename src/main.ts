import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  const config = new DocumentBuilder()
    .setTitle('User API') 
    .setDescription('API documentation for user management') 
    .setVersion('1.0') 
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // URL Swagger UI: http://localhost:3000/api

  await app.listen(3000);
}
bootstrap();
