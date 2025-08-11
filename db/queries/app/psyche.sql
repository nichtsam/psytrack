-- name: GetVibes :many
SELECT * FROM vibes WHERE user_id = $1 ORDER BY time_range DESC;

-- name: GetExperiences :many
SELECT * FROM experiences WHERE user_id = $1 ORDER BY occurred_at DESC;

-- name: GetVibeById :one
SELECT * FROM vibes WHERE user_id = $1 AND id = $2;

-- name: GetExperienceById :one
SELECT * FROM experiences WHERE user_id = $1 AND id = $2;

-- name: CreateVibe :one
INSERT INTO vibes (user_id, time_range, valence, vitality) VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: CreateExperience :one
INSERT INTO experiences (user_id, occurred_at, details) VALUES ($1, $2, $3)
RETURNING *;

-- name: UpdateVibe :one
UPDATE vibes
SET valence    = COALESCE($3, valence),
    vitality   = COALESCE($4, vitality)
WHERE user_id = $1 AND id = $2
RETURNING *;

-- name: UpdateExperience :one
UPDATE experiences
SET details     = COALESCE($3, details)
WHERE user_id = $1 AND id = $2
RETURNING *;

-- name: DeleteVibe :one
DELETE FROM vibes
WHERE user_id = $1 AND id = $2
RETURNING *;

-- name: DeleteExperience :one
DELETE FROM experiences
WHERE user_id = $1 AND id = $2
RETURNING *;
