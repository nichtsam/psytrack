-- migrate:up
CREATE TABLE IF NOT EXISTS psyche_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  metadata JSONB NOT NULL,
  happened_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_psyche_events_user_id ON psyche_events(user_id);

-- migrate:down
DROP INDEX IF EXISTS idx_psyche_events_user_id;
DROP TABLE IF EXISTS psyche_events;
