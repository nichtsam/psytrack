import { Injectable } from '@nestjs/common';
import { PostgresService } from '#src/db.module';
import {
  AddExperienceDto,
  ParseExperienceStoryDto as ParseExperienceStroyDto,
} from './psyche.dto';
import { createPsycheEvent, getAllPsycheEventsByUserId } from '#db/query_sql';
import { Experience, ExperienceSchema } from './psyche.schema';
import { LLMService } from '#src/llm/llm.service';
import { zodToJsonSchema } from 'zod-to-json-schema';

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
    const experience: Experience = {
      activatingEvent: dto.activatingEvent,
      emotions: dto.emotions,
      summary: dto.summary,
    };

    return await createPsycheEvent(this.postgresService.sql, {
      userId,
      happenedAt: dto.happenedAt,
      metadata: {
        type: 'experience',
        ...experience,
      },
    });
  }

  async parseExperienceStory(dto: ParseExperienceStroyDto) {
    const prompt = `
You are an emotional assistant who extracts key mental information from user stories.
Focus on three main parts:
- Activating event: a concise, simple summary of the core event.
- Emotions: a list of emotions with their intensity rated from 1 (lowest) to 10 (highest).
- Summary: a compact description that captures the essential situation and emotional context, helping the user recall what happened and how they felt.

Analyze the following user narrative carefully.

User narrative:
"""
${dto.story}
"""

Respond only with JSON strictly following the provided structure.
`;

    const format = zodToJsonSchema(ExperienceSchema);
    const response = await this.llmService.ollama.generate({
      model: 'phi4-mini:3.8b',
      prompt,
      format,
      stream: false,
      options: {
        temperature: 0,
      },
    });

    const json = JSON.parse(response.response) as unknown;
    console.dir({ json }, { depth: Infinity });
    return ExperienceSchema.parse(json);
  }
}
