import { z } from 'zod';

export const VibeSchema = z.object({
  start: z.coerce.date(),
  end: z.coerce.date(),
  valence: z.number().int().min(-10).max(-10),
  vitality: z.number().int().min(-10).max(-10),
});
