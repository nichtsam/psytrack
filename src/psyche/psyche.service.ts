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
  updateExperienceDetails,
  updateVibeValues,
} from '#db/queries/app/psyche_sql';
import { CreateVibeDto } from './dto/create-vibe';
import { CreateExperienceDto } from './dto/create-experience';
import { UpdateVibeDto } from './dto/update-vibe';
import { tstzrange } from '#db/utils';
import { PsycheError } from './psyche.error';
import { Experience } from './schema/experience';
import { merge } from 'ts-deepmerge';
import { UpdateExperienceDto } from './dto/update-experience';
import {
  ActivatingStatus,
  CopingStatus,
  PostStatus,
  ReactionStatus,
} from './constants/phase-statuses';

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
      timeRange: tstzrange(dto.vibe.start, dto.vibe.end),
      valence: dto.vibe.valence,
      vitality: dto.vibe.vitality,
    });
  }

  async updateVibeValues(userId: string, vibeId: string, dto: UpdateVibeDto) {
    return await updateVibeValues(this.postgresService.sql, {
      userId,
      id: vibeId,
      valence: dto.valence ?? null,
      vitality: dto.vitality ?? null,
    });
  }

  async createExperience(userId: string, dto: CreateExperienceDto) {
    return await createExperience(this.postgresService.sql, {
      userId,
      occurredAt: dto.occuredAt,
      details: { activating: dto.activating },
    });
  }

  async updateExperienceDetails(
    userId: string,
    experienceId: string,
    dto: UpdateExperienceDto,
  ) {
    const original = await getExperienceById(this.postgresService.sql, {
      userId,
      id: experienceId,
    });

    if (!original) {
      throw new PsycheError(
        'EXPERIENCE_NOT_FOUND',
        'Experience for given experienceId does not exist',
      );
    }

    const originalDetails = original.details as Experience;

    const merged = merge.withOptions(
      { allowUndefinedOverrides: false },
      originalDetails,
      {
        activating: {
          ...dto.activating,
          reaction: dto.reaction,
        },
        coping: dto.coping,
        post: dto.post,
      },
    ) as Experience;

    const activatingStatus =
      merged.activating.emotions.length !== 0
        ? ActivatingStatus.field_completed
        : ActivatingStatus.emotions_unknown;

    const reactionStatus =
      merged.activating.reaction === null
        ? ReactionStatus.field_na
        : merged.activating.reaction === undefined
          ? ReactionStatus.field_pending
          : merged.activating.reaction.resultEmotions.length === 0
            ? ReactionStatus.emotions_unknown
            : ReactionStatus.field_completed;

    const copingStatus =
      merged.coping === null
        ? CopingStatus.field_na
        : merged.coping === undefined
          ? CopingStatus.field_pending
          : merged.coping.emotions.length === 0
            ? CopingStatus.emotions_unknown
            : CopingStatus.field_completed;

    const postStatus =
      merged.post === null
        ? PostStatus.field_na
        : merged.post === undefined
          ? PostStatus.field_pending
          : PostStatus.field_completed;

    return await updateExperienceDetails(this.postgresService.sql, {
      userId,
      id: experienceId,
      details: merged,
      activatingStatus,
      reactionStatus,
      copingStatus,
      postStatus,
    });
  }
}
