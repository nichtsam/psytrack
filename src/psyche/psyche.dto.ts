import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const EmotionSchema = z.object({
  emotionLabel: z.string(),
  intensity: z.number().min(1).max(10),
});

const AddExperienceSchema = z.object({
  activatingEvent: z.string(),
  emotions: z.array(EmotionSchema).nonempty(),
  happenedAt: z.coerce.date(),
});

export class AddExperienceDto extends createZodDto(AddExperienceSchema) {}
