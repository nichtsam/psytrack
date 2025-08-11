import { z } from 'zod';
import { EmotionSchema } from './emotion';

const minMessage = (minLength: number) =>
  `Please provide at least ${minLength} characters so your description helps you quickly recall the experience.`;
const maxMessage = (maxLength: number) =>
  `Please enter no more than ${maxLength} characters. Keep it concise and include just enough details to help you recall.`;

export const ReactionSchema = z
  .object({
    behavior: z
      .string()
      .max(100)
      .describe('Brief description of the behavioral reaction to the event'),
    resultEmotions: z
      .array(EmotionSchema)
      .default([])
      .describe('List of emotions felt after the reaction'),
  })
  .describe('How you reacted and the resulting emotions');

export const ActivatingEventSchema = z
  .object({
    headline: z
      .string()
      .max(100)
      .describe(
        'Concise headline capturing the core theme of the activating event',
      ),
    happenedAt: z.coerce.date().describe('Time when the event occurred'),
    emotions: z
      .array(EmotionSchema)
      .default([])
      .describe('List of emotions felt during the event'),
    story: z
      .string()
      .min(10, minMessage(10))
      .max(500, maxMessage(500))
      .describe('Detailed Summary of the activating event'),
    reaction: ReactionSchema.nullable().optional(),
  })
  .describe(
    'Details about the activating event that triggered emotional response',
  );

export const CopingBehaviorSchema = z
  .object({
    approach: z
      .string()
      .max(30, maxMessage(30))
      .describe(
        'Brief description of the core approach taken to cope with the event',
      ),
    endedAt: z.coerce.date().describe('Time when the coping process ended'),
    emotions: z
      .array(EmotionSchema)
      .default([])
      .describe('List of emotions felt during the coping process'),
  })
  .describe('Coping behavior used to deal with the activating event');

export const PostFeelingSchema = z
  .object({
    thoughts: z
      .string()
      .max(300, maxMessage(300))
      .describe(
        'The core thoughts emerged after gaining distance from the event',
      )
      .optional(),
    emotions: z
      .array(EmotionSchema)
      .describe(
        'List of the emotions emerged after gaining distance from the event',
      )
      .nonempty(),
    realizedAt: z.coerce
      .date()
      .describe('Time when these later emotions or thoughts were realized'),
  })
  .describe(
    'Reflections or feelings that emerged after gaining distance from the event',
  );

export const ExperienceSchema = z.object({
  activating: ActivatingEventSchema,
  coping: CopingBehaviorSchema.nullable().optional(),
  post: PostFeelingSchema.nullable().optional(),
});

export type Experience = z.infer<typeof ExperienceSchema>;
export type ActivatingEvent = z.infer<typeof ActivatingEventSchema>;
export type CopingBehavior = z.infer<typeof CopingBehaviorSchema>;
export type PostFeeling = z.infer<typeof PostFeelingSchema>;
