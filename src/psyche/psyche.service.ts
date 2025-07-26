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
Extract details from the input story and return the result in JSON format with the following fields:
Headline: A brief phrase summarizing the core activating factor or incident.
Emotions: A list of emotions explicitly or implicitly expressed.
Story: A full account of the event, preserving as much detail and context as possible.

${dto.story}`;

    const json = await this.parseStory(prompt, schema);
    return schema.parse(json);
  }
  async parseExperienceCopingStory(dto: ParseStoryDto) {
    const schema = CopingBehaviorSchema.omit({ endedAt: true });
    const prompt = `
Extract details from the input story and return the result in JSON format with the following fields:
Approach: A concise description of the core coping strategy or action taken in response to the event.
Emotions: A list of emotions that emerged as a result of the coping process, whether explicitly stated or implied.

${dto.story}`;

    const json = await this.parseStory(prompt, schema);
    return schema.parse(json);
  }
  async parseExperiencePostStory(dto: ParseStoryDto) {
    const schema = PostFeelingSchema.omit({ realizedAt: true });
    const prompt = `
Extract details from the input story and return the result in JSON format with the following fields:
Thoughts: A concise description of the core thoughts that emerged after gaining distance from the event.
Emotions: A list of emotions that emerged after gaining distance from the event, whether explicitly stated or implied.

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
