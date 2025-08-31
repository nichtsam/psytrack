import 'dotenv/config';

import postgres from 'postgres';
import * as argon2 from 'argon2';
import fs from 'fs/promises';
import { createExperience, createUser, createVibe } from './queries/seed_sql';
import z from 'zod';
import { tstzrange } from './utils';
import { emotions } from '#src/psyche/constants/emotions';

async function seed() {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error('env DATABASE_URL missing');
  }

  const sql = postgres(url);

  console.log('Clearing old data...');
  await sql`DELETE FROM experiences`;
  await sql`DELETE FROM vibes`;
  await sql`DELETE FROM users`;

  const userEmailToIdMap = new Map<string, string>();
  const usersRaw = await fs.readFile('db/seeds/users.json', 'utf-8');
  const {
    data: users,
    success: usersSuccess,
    error: usersError,
  } = z
    .object({
      email: z.string(),
      password: z.string(),
    })
    .array()
    .safeParse(JSON.parse(usersRaw));

  if (!usersSuccess) {
    console.error('❌ invalid users.json:', usersError.flatten().fieldErrors);
    throw usersError;
  }

  await sql.begin(async (sql) => {
    for (const user of users) {
      const result = await createUser(sql, {
        email: user.email,
        hash: await argon2.hash(user.password),
      });

      if (!result) {
        console.error(`Failed to create user ${user.email}`);
        return;
      }

      userEmailToIdMap.set(result.email, result.id);
    }
  });

  console.log(`Inserted ${users.length} users.`);

  // vibes
  const vibesRaw = await fs.readFile('db/seeds/vibes.json', 'utf-8');
  const {
    data: vibes,
    success: vibesSucess,
    error: vibesError,
  } = z
    .object({
      user_email: z.string().email(),
      valence: z.number().min(-10).max(10),
      vitality: z.number().min(-10).max(10),
      start: z.coerce.date(),
      end: z.coerce.date(),
    })
    .array()
    .safeParse(JSON.parse(vibesRaw));

  if (!vibesSucess) {
    console.error('❌ invalid vibes.json:', vibesError.flatten().fieldErrors);
    throw vibesError;
  }

  await sql.begin(async (sql) => {
    for (const vibe of vibes) {
      const userId = userEmailToIdMap.get(vibe.user_email);
      if (!userId) {
        console.error(`❌ invalid vibe, missing user ${vibe.user_email}`);
        throw new Error('Invalid vibe');
      }

      await createVibe(sql, {
        userId,
        valence: vibe.valence,
        vitality: vibe.vitality,
        timeRange: tstzrange(vibe.start, vibe.end),
      });
    }
  });

  console.log(`Inserted ${vibes.length} vibes.`);

  // experiences

  const experiencesRaw = await fs.readFile(
    'db/seeds/experiences.json',
    'utf-8',
  );

  const statusSchema = z.enum([
    'field_pending',
    'field_na',
    'emotions_unknown',
    'field_completed',
  ]);
  const emotionSchema = z.object({
    emotionLabel: z.enum(emotions),
    intensity: z.number().min(1).max(10),
  });

  const {
    data: experiences,
    success: experiencesSucess,
    error: experiencesError,
  } = z
    .object({
      user_email: z.string().email(),
      occurred_at: z.coerce.date(),
      activating_status: statusSchema,
      reaction_status: statusSchema,
      coping_status: statusSchema,
      post_status: statusSchema,

      details: z.object({
        activating: z.object({
          headline: z.string(),
          story: z.string(),
          emotions: emotionSchema.array().optional(),
          reaction: z
            .object({
              behavior: z.string(),
              resultedEmotions: emotionSchema.array().optional(),
            })
            .optional(),
        }),
        coping: z
          .object({
            approach: z.string(),
            endedAt: z.coerce.date(),
            emotions: emotionSchema.array().optional(),
          })
          .optional(),
        post: z
          .object({
            thoughts: z.string().optional(),
            emotions: emotionSchema.array(),
            realizedAt: z.coerce.date(),
          })
          .optional(),
      }),
    })
    .array()
    .safeParse(JSON.parse(experiencesRaw));

  if (!experiencesSucess) {
    console.error(
      '❌ invalid experiences.json:',
      experiencesError.flatten().fieldErrors,
    );
    throw experiencesError;
  }

  await sql.begin(async (sql) => {
    for (const experience of experiences) {
      const userId = userEmailToIdMap.get(experience.user_email);
      if (!userId) {
        console.error(
          `❌ invalid experience, missing user ${experience.user_email}`,
        );
        throw new Error('Invalid experience');
      }

      await createExperience(sql, {
        userId,
        occurredAt: experience.occurred_at,
        details: experience.details,
        activatingStatus: experience.activating_status,
        reactionStatus: experience.reaction_status,
        copingStatus: experience.coping_status,
        postStatus: experience.post_status,
      });
    }
  });

  console.log(`Inserted ${vibes.length} vibes.`);

  console.log('Seeding complete.');
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
