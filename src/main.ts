import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { apiReference } from '@scalar/nestjs-api-reference';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const doc = (app: INestApplication) =>
  apiReference({
    spec: {
      content: SwaggerModule.createDocument(
        app,
        new DocumentBuilder().setTitle('PsyTrack').addBearerAuth().build(),
      ),
    },
  });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/reference', doc(app));
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
