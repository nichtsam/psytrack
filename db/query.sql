-- name: GetUserById :one
SELECT * FROM users
WHERE id = $1 LIMIT 1;

-- name: GetUserByEmail :one
SELECT * FROM users
WHERE email = $1 LIMIT 1;

-- name: CreateUser :one
INSERT INTO users (email, hash) VALUES ($1, $2)
RETURNING *;

-- name: GetAllPsycheEventsByUserId :many
SELECT * FROM psyche_events
WHERE user_id = $1;

-- name: CreatePsycheEvent :one
INSERT INTO psyche_events (user_id, metadata, happened_at) VALUES ($1, $2, $3)
RETURNING *;

