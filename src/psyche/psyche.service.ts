import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/db.module';
import { AddExperienceDto } from './psyche.dto';
import { createExperience, getAllExperiencesByUserId } from 'db/query_sql';

@Injectable()
export class PsycheService {
  constructor(private postgresService: PostgresService) {}

  async getAllExperiencesByUserId(userId: string) {
    return await getAllExperiencesByUserId(this.postgresService.sql, {
      userId,
    });
  }

  async createExperience(userId: string, dto: AddExperienceDto) {
    return await createExperience(this.postgresService.sql, {
      userId,
      happenedAt: dto.happenedAt,
      metadata: {
        activatingEvent: dto.activatingEvent,
        emotions: dto.emotions,
      },
    });
  }
}
