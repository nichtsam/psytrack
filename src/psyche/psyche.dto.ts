import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { ExperienceSchema } from './psyche.schema';

const AddExperienceSchema = ExperienceSchema;
const UpdateExperienceSchema = ExperienceSchema;
const ParseStorySchema = z.object({
  story: z.string().min(50).max(500),
});

export class AddExperienceDto extends createZodDto(AddExperienceSchema) {}
export class UpdateExperienceDto extends createZodDto(UpdateExperienceSchema) {}
export class ParseStoryDto extends createZodDto(ParseStorySchema) {}
