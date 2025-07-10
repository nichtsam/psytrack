import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { ExperienceSchema } from './psyche.schema';

const AddExperienceSchema = ExperienceSchema.omit({ type: true }).extend({
  happenedAt: z.coerce.date(),
});

export class AddExperienceDto extends createZodDto(AddExperienceSchema) {}
