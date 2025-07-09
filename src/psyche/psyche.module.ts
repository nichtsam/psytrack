import { Module } from '@nestjs/common';
import { PsycheController } from './psyche.controller';
import { PostgresModule } from 'src/db.module';
import { PsycheService } from './psyche.service';

@Module({
  imports: [PostgresModule],
  controllers: [PsycheController],
  providers: [PsycheService],
})
export class PsycheModule {}
