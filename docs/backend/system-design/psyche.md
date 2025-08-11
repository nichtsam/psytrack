# Psyche System Design

## Database Design

We use `Postgresql` as our database management system, so the implementation documented below might depend on `Postgresql` specific features.

### Vibe

As defined in the Psyche Analysis Model, a **Vibe** captures a user’s overall mental state over a period of time.

Currently, we support recording vibes only for fixed daily periods.  
However, we plan to support custom time ranges and timezone adjustments in the future.

To accommodate this, we use a TSTZRANGE type with additional constraints to ensure each user has only one vibe record per fixed period.

For future support of custom time ranges, two strategies are considered:

1. Keep the current database schema and use application-level logic to split and merge overlapping time ranges.
2. Remove the exclusion constraint to allow overlaps, then rely on application-level logic to consolidate records and build the most accurate data.

```sql
CREATE TABLE vibes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  time_range TSTZRANGE NOT NULL,
  valence SMALLINT NOT NULL,
  vitality SMALLINT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Extension required to support `EXCLUDE USING GIST`
CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE vibes
ADD CONSTRAINT vibe_no_overlap
EXCLUDE USING GIST (
  user_id WITH =,
  time_range WITH &&
);
```

### Experience

An **Experience** is a complex record that stores details of an emotional event.

Due to the complex structure of Experience, and to balance flexibility with implementation simplicity, we store detailed data uniformly in a JSONB column named `details`.
For specific queries requiring detailed data, we promote these to dedicated database columns and maintain synchronization at the application layer.

```sql
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  occurred_at TIMESTAMPTZ NOT NULL,

  -- promoted dedicated columns
  activating_status TEXT NOT NULL DEFAULT 'emotions_unknown' CHECK ( activating_status IN ('emotions_unknown', 'field_completed')),
  reaction_status TEXT NOT NULL DEFAULT 'field_pending' CHECK ( reaction_status IN ('field_pending', 'field_na', 'emotions_unknown', 'field_completed')),
  coping_status TEXT NOT NULL DEFAULT 'field_pending' CHECK ( coping_status IN ('field_pending', 'field_na', 'emotions_unknown', 'field_completed')),
  post_status TEXT NOT NULL DEFAULT 'field_pending' CHECK ( post_status IN ('field_pending', 'field_na', 'field_completed')),

  details JSONB NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_experience_user_occurred_at ON experiences (user_id, occurred_at);
```

#### Details Structure

This section documents the data structure stored in the JSONB field `details` as well as the promoted dedicated database columns.

The JSONB field `details` contains data structured as follows (TypeScript schema):

```ts
type Details = {
  activating: Activating;
  coping?: Coping | null;
  post?: Post | null;
};

type Emotion = {
  emotionLabel: 'Psyche Analysis Model -> Fundamental Emotions -> Emotion List';
  intensity: number;
};

type Activating = {
  headline: string;
  story: string;
  emotions?: Emotion[];
  reaction?: Reaction | null;
};
type Reaction = {
  behavior: string;
  resultedEmotions: Emotion[];
};
type Coping = {
  approach: string;
  endedAt: Date;
  emotions: Emotion[];
};
type Post = {
  thoughts: string;
  emotions: Emotion[];
  realizedAt: Date;
};
```

In the application, we want to remind users to complete each experience’s details, since some fields are optional and may be empty or not yet filled.
To efficiently identify experiences under certain conditions, we use dedicated enum-based status columns:

```sql
CREATE TABLE experience (
  ...
  activating_status TEXT NOT NULL DEFAULT 'emotions_unknown' CHECK ( activating_status IN ('emotions_unknown', 'field_completed')),
  reaction_status TEXT NOT NULL DEFAULT 'field_pending' CHECK ( reaction_status IN ('field_pending', 'field_na', 'emotions_unknown', 'field_completed')),
  coping_status TEXT NOT NULL DEFAULT 'field_pending' CHECK ( coping_status IN ('field_pending', 'field_na', 'emotions_unknown', 'field_completed')),
  post_status TEXT NOT NULL DEFAULT 'field_pending' CHECK ( post_status IN ('field_pending', 'field_na', 'field_completed')),
  ...
);
```

These columns indicate the status of the corresponding field, with four enum value meaning:

- `field_pending`: The field is yet to be filled or yet to be marked as not applicable.
- `field_na`: The field has been explicitly marked as not applicable.
- `emotions_unknown`: The field is applicable, but the emotions are unknown and left blank, indicating numbness or unawareness.
- `field_completed`: The field is applicable and filled with complete emotion details.

Depending on the phase, each status column allows different enum values:

- `activating_status`: This is the foundational phase, so the field must exist; however, the emotions field within is optional.
  Therefore, `emotions_unknown`, `field_completed`.
- `reaction_status`: This phase is optional, and its emotions field within is also optional.
  Therefore, `field_pending`, `field_na`, `emotions_unknown`, `field_completed`.
- `coping_status`: This phase is optional, and its emotions field within is also optional.
  Therefore, `field_pending`, `field_na`, `emotions_unknown`, `field_completed`.
- `post_status`: This phase is optional, but its emotions field within is required.
  Therefore, `field_pending`, `field_na`, `field_completed`.
