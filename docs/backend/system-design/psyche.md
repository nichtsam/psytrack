# Psyche System Design

## Database Design

We use `Postgresql` as our database management system, so the implementation documented below might depend on `Postgresql` specific features.

### Vibe

As per the Pysche Analysis Model, a **Vibe** captures the overall mental state for a given period of time.
Currently, we only support recording vibe for a fixed daily period.
However, in the future, we hope to support custom time ranges and timezone shifting.

To prepare for this, we use a TSTZRANGE with additional constraints to ensure each user has only one vibe record per fixed period.

As for future support of custom time ranges, two possible strategies are:

1. Keep the same database schema, use application-level solution to break down and rebuild when overlap.
2. Drop the EXCLUDE constraint, allow overlaps, and use application-level solution to integrate all records and build up the latest correct data.

```sql
CREATE TABLE vibe (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  time_range TSTZRANGE NOT NULL,
  valence SMALLINT NOT NULL,
  vitality SMALLINT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT vibe_pkey PRIMARY KEY (user_id, time),
);

-- Extension required to support `EXCLUDE USING GIST`
CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE vibe
ADD CONSTRAINT vibe_no_overlap
EXCLUDE USING GIST (
  user_id WITH =,
  tstzrange(start_time, end_time) WITH &&
);
```

### Experience

An **Experience** is a complex record that stores details of an emotional event.

Due to the complex structure of Experience, and to balance flexibility with implementation simplicity, we store detailed data uniformly in a JSONB column named `details`.
For specific queries requiring detailed data, we promote these to dedicated database columns and maintain synchronization at the application layer.

```sql
CREATE TABLE experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  occurred_at TIMESTAMPTZ NOT NULL,

  reaction_confirmed BOOLEAN NOT NULL DEFAULT false,
  coping_confirmed BOOLEAN NOT NULL DEFAULT false,
  post_confirmed BOOLEAN NOT NULL DEFAULT false,

  details JSONB NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
);

CREATE INDEX idx_experience_user_occurred_at ON experience (user_id, occurred_at);
```

#### Details Structure

This section documents the data structure stored in the JSONB field `details` as well as the promoted dedicated database columns.

The JSONB field `details` contains data structured as follows (TypeScript schema):

```ts
type Details = {
  activating: Activating;
  coping: Coping;
  post: Post;
};

type Activating = {
    ...
    reaction: Reaction;
};
type Reaction = {...};
type Coping = {...};
type Post = {...};
```

In the application, we want to remind users to complete each experience’s details, since some fields are optional and may be empty or not yet filled.
To quickly identify experiences with unconfirmed or incomplete sections, we use three dedicated boolean columns:

```sql
CREATE TABLE experience (
  ...
  reaction_confirmed BOOLEAN NOT NULL DEFAULT false,
  coping_confirmed BOOLEAN NOT NULL DEFAULT false,
  post_confirmed BOOLEAN NOT NULL DEFAULT false,
  ...
);
```

These columns indicate whether the corresponding sections (`activating.reaction`, `coping`, and `post`) have been confirmed as either completed or explicitly marked as not applicable.

- If a section has no data but is confirmed as not applicable, its column is set to true.
- If the section is unconfirmed or still in progress, the column remains false.
- When there is data present, these columns could generally be ignored, but are always set to true for data integrity.
