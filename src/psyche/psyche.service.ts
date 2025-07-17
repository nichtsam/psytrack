import { Injectable } from '@nestjs/common';
import { PostgresService } from '#src/db.module';
import {
  AddExperienceDto,
  ParseStoryDto,
  UpdateExperienceDto,
} from './psyche.dto';
import {
  createPsycheEvent,
  getAllPsycheEventsByUserId,
  getPsycheEventsById,
  updatePsycheEvent,
} from '#db/query_sql';
import {
  ActivatingEventSchema,
  CopingBehaviorSchema,
  PostFeelingSchema,
} from './psyche.schema';
import { LLMService } from '#src/llm/llm.service';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { PsycheError } from './psyche.error';
import { merge } from 'ts-deepmerge';
import { ZodObject } from 'zod';

@Injectable()
export class PsycheService {
  constructor(
    private postgresService: PostgresService,
    private llmService: LLMService,
  ) {}

  async getAllPsycheEventsByUserId(userId: string) {
    return await getAllPsycheEventsByUserId(this.postgresService.sql, {
      userId,
    });
  }

  async createExperience(userId: string, dto: AddExperienceDto) {
    return await createPsycheEvent(this.postgresService.sql, {
      userId,
      happenedAt: dto.activating.happenedAt,
      metadata: {
        type: 'experience',
        ...dto,
      },
    });
  }

  async updateExperience(id: string, dto: UpdateExperienceDto) {
    const originalExperience = await getPsycheEventsById(
      this.postgresService.sql,
      {
        id,
      },
    );

    if (!originalExperience) {
      throw new PsycheError(
        'EVENT_NOT_FOUND',
        'No record returned by the event id',
      );
    }

    const updatedExperience = merge(originalExperience.metadata as object, dto);

    return await updatePsycheEvent(this.postgresService.sql, {
      id,
      metadata: {
        type: 'experience',
        ...updatedExperience,
      },
    });
  }

  async parseExperienceActivatingStory(dto: ParseStoryDto) {
    const schema = ActivatingEventSchema.omit({ happenedAt: true });
    const prompt = `
Extract details from story based on given format. Respond in JSON.
Event field should record the core activating factor.
Emotions field should be a list of the emotions expressed.
Summary field should include all the affecting details.

${dto.story}`;

    const json = await this.parseStory(prompt, schema);
    return schema.parse(json);
  }
  async parseExperienceCopingStory(dto: ParseStoryDto) {
    const schema = CopingBehaviorSchema.omit({ endedAt: true });
    const prompt = `
Extract details from story based on given format. Respond in JSON.
Approach field should record the core approach taken to cope with the event.
Emotions field should be a list of the emotions emerged with the coping.

${dto.story}`;

    const json = await this.parseStory(prompt, schema);
    return schema.parse(json);
  }
  async parseExperiencePostStory(dto: ParseStoryDto) {
    const schema = PostFeelingSchema.omit({ realizedAt: true });
    const prompt = `
Extract details from story based on given format. Respond in JSON.
Thoughts field should record the core thoughts emerged after gaining distance from the event.
Emotions field should be a list of the emotions emerged after gaining distance from the event.

${dto.story}`;

    const json = await this.parseStory(prompt, schema);
    return schema.parse(json);
  }

  async parseStory(prompt: string, schema: ZodObject<any>) {
    const format = zodToJsonSchema(schema);
    const response = await this.llmService.ollama.generate({
      model: 'phi4-mini:3.8b',
      prompt,
      format,
      stream: false,
    });

    return JSON.parse(response.response) as unknown;
  }
}
