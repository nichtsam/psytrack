import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import { ActivatingEventSchema } from '../schema/experience';

const createExperienceSchema = z.object({
  occuredAt: z.coerce.date(),
  activating: ActivatingEventSchema,
});
export class CreateExperienceDto extends createZodDto(createExperienceSchema) {}
