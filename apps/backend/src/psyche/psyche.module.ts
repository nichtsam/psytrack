import { Module } from '@nestjs/common';
import { PsycheController } from './psyche.controller';
import { PostgresModule } from '#src/db.module';
import { PsycheService } from './psyche.service';
import { LlmModule } from '#src/llm/llm.module';

@Module({
  imports: [PostgresModule, LlmModule],
  controllers: [PsycheController],
  providers: [PsycheService],
})
export class PsycheModule {}
