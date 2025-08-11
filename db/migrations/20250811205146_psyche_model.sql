-- migrate:up
CREATE TABLE vibes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  time_range TSTZRANGE NOT NULL,
  valence SMALLINT NOT NULL,
  vitality SMALLINT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE vibes
ADD CONSTRAINT vibe_no_overlap
EXCLUDE USING GIST (
  user_id WITH =,
  time_range WITH &&
);

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

-- migrate:down
DROP INDEX IF EXISTS idx_experience_user_occurred_at;
DROP TABLE IF EXISTS experiences;
DROP TABLE IF EXISTS vibes;
DROP EXTENSION IF EXISTS btree_gist;
