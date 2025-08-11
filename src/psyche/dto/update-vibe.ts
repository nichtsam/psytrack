import { createZodDto } from 'nestjs-zod';
import { VibeSchema } from '../schema/vibe';

const updateVibeSchema = VibeSchema.pick({
  valence: true,
  vitality: true,
}).partial();
export class UpdateVibeDto extends createZodDto(updateVibeSchema) {}
