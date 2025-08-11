-- name: GetUserById :one
SELECT * FROM users
WHERE id = $1 LIMIT 1;

-- name: GetUserByEmail :one
SELECT * FROM users
WHERE email = $1 LIMIT 1;

-- name: CreateUser :one
INSERT INTO users (email, hash) VALUES ($1, $2)
RETURNING *;

-- name: CreateVibe :one
INSERT INTO vibes (user_id, time_range, valence, vitality) VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: CreateExperience :one
INSERT INTO experiences (user_id, occurred_at, details) VALUES ($1, $2, $3)
RETURNING *;
