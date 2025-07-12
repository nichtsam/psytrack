import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { ExperienceSchema } from './psyche.schema';

const AddExperienceSchema = ExperienceSchema.extend({
  happenedAt: z.coerce.date(),
});

const ParseExperienceStorySchema = z.object({
  story: z.string().min(50).max(500),
});

export class AddExperienceDto extends createZodDto(AddExperienceSchema) {}
export class ParseExperienceStoryDto extends createZodDto(
  ParseExperienceStorySchema,
) {}
