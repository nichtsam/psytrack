import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import { VibeSchema } from '../schema/vibe';

const createVibeSchema = z.object({
  vibe: VibeSchema,
});
export class CreateVibeDto extends createZodDto(createVibeSchema) {}
