-- name: CreateUser :one
INSERT INTO users (email, hash) VALUES ($1, $2)
RETURNING *;

-- name: CreateVibe :one
INSERT INTO vibes (user_id, time_range, valence, vitality) VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: CreateExperience :one
INSERT INTO experiences (user_id, occurred_at, details, activating_status, reaction_status, coping_status, post_status) VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;
