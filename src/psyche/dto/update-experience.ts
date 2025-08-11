import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import {
  ActivatingEventSchema,
  CopingBehaviorSchema,
  PostFeelingSchema,
  ReactionSchema,
} from '../schema/experience';

const updateExperienceSchema = z
  .object({
    activating: ActivatingEventSchema.omit({ reaction: true })
      .partial()
      .optional(),
    reaction: ReactionSchema.partial().optional(),
    coping: CopingBehaviorSchema.partial().optional(),
    post: PostFeelingSchema.partial().optional(),
  })
  .refine(
    (data) => data.activating || data.reaction || data.coping || data.post,
    { message: 'Missing update details' },
  );
export class UpdateExperienceDto extends createZodDto(updateExperienceSchema) {}
