import z from 'zod';
import { emotions } from '../constants/emotions';

export const EmotionSchema = z.object({
  emotionLabel: z.enum(emotions),
  level: z
    .number()
    .int()
    .min(1)
    .max(10)
    .describe('How strong the emotion feels, from 1 (low) to 10 (high)'),
});
