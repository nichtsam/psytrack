import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/db.module';
import { AddExperienceDto } from './psyche.dto';
import { createPsycheEvent, getAllPsycheEventsByUserId } from 'db/query_sql';
import { Experience } from './psyche.schema';

@Injectable()
export class PsycheService {
  constructor(private postgresService: PostgresService) {}

  async getAllPsycheEventsByUserId(userId: string) {
    return await getAllPsycheEventsByUserId(this.postgresService.sql, {
      userId,
    });
  }

  async createExperience(userId: string, dto: AddExperienceDto) {
    const experience: Experience = {
      type: 'experience',
      activatingEvent: dto.activatingEvent,
      emotions: dto.emotions,
      note: dto.note,
    };

    return await createPsycheEvent(this.postgresService.sql, {
      userId,
      happenedAt: dto.happenedAt,
      metadata: experience,
    });
  }
}
