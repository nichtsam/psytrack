import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { apiReference } from '@scalar/nestjs-api-reference';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger, ZodValidationPipe } from 'nestjs-zod';

patchNestJsSwagger();

const doc = (app: INestApplication) =>
  apiReference({
    persistAuth: true,
    spec: {
      content: SwaggerModule.createDocument(
        app,
        new DocumentBuilder().setTitle('PsyTrack').addBearerAuth().build(),
      ),
    },
  });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ZodValidationPipe());
  app.use('/reference', doc(app));
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
