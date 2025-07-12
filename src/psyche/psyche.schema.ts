import { z } from 'zod';
import { emotions } from './constants/emotions';

export const EmotionSchema = z.object({
  emotionLabel: z.enum(emotions),
  intensity: z.number().min(1).max(10),
});

export const ExperienceSchema = z.object({
  activatingEvent: z.string(),
  emotions: z.array(EmotionSchema).nonempty(),
  summary: z.string().optional(),
});

export type Experience = z.infer<typeof ExperienceSchema>;
