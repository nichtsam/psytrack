import { Injectable } from '@nestjs/common';
import { PostgresService } from '#src/db.module';
import { LLMService } from '#src/llm/llm.service';
import {
  createExperience,
  createVibe,
  getExperienceById,
  getExperiences,
  getVibeById,
  getVibes,
  updateExperience,
  updateVibe,
} from '#db/queries/app/psyche_sql';
import { CreateVibeDto } from './dto/create-vibe';
import { CreateExperienceDto } from './dto/create-experience';
import { UpdateVibeDto } from './dto/update-vibe';
import { UpdateExperienceDto } from './dto/update-experience';
import { tstzrange } from '#db/utils';

@Injectable()
export class PsycheService {
  constructor(
    private postgresService: PostgresService,
    private llmService: LLMService,
  ) {}

  async getVibes(userId: string) {
    return await getVibes(this.postgresService.sql, { userId });
  }
  async getExperiences(userId: string) {
    return await getExperiences(this.postgresService.sql, { userId });
  }

  async getVibeById(userId: string, vibeId: string) {
    return await getVibeById(this.postgresService.sql, { userId, id: vibeId });
  }
  async getExperienceById(userId: string, experienceId: string) {
    return await getExperienceById(this.postgresService.sql, {
      userId,
      id: experienceId,
    });
  }

  async createVibe(userId: string, dto: CreateVibeDto) {
    return await createVibe(this.postgresService.sql, {
      userId,
      timeRange: tstzrange(new Date(), new Date()),
      valence: 0,
      vitality: 0,
    });
  }
  async createExperience(userId: string, dto: CreateExperienceDto) {
    return await createExperience(this.postgresService.sql, {
      userId,
      details: {},
      occurredAt: new Date(),
    });
  }
  async updateVibe(userId: string, vibeId: string, dto: UpdateVibeDto) {
    return await updateVibe(this.postgresService.sql, {
      userId,
      id: vibeId,
      valence: 0,
      vitality: 0,
    });
  }
  async updateExperience(
    userId: string,
    experienceId: string,
    dto: UpdateExperienceDto,
  ) {
    return await updateExperience(this.postgresService.sql, {
      userId,
      id: experienceId,
      details: {},
    });
  }
}
