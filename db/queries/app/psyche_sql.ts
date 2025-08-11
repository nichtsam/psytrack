import { Sql } from "postgres";

export const getVibesQuery = `-- name: GetVibes :many
SELECT id, user_id, time_range, valence, vitality, created_at, updated_at
FROM vibes
WHERE user_id = $1
ORDER BY time_range DESC`;

export interface GetVibesArgs {
    userId: string;
}

export interface GetVibesRow {
    id: string;
    userId: string;
    timeRange: string;
    valence: number;
    vitality: number;
    createdAt: Date;
    updatedAt: Date;
}

export async function getVibes(sql: Sql, args: GetVibesArgs): Promise<GetVibesRow[]> {
    return (await sql.unsafe(getVibesQuery, [args.userId]).values()).map(row => ({
        id: row[0],
        userId: row[1],
        timeRange: row[2],
        valence: row[3],
        vitality: row[4],
        createdAt: row[5],
        updatedAt: row[6]
    }));
}

export const getExperiencesQuery = `-- name: GetExperiences :many
SELECT id, user_id, occurred_at, activating_status, reaction_status, coping_status, post_status, details, created_at, updated_at
FROM experiences
WHERE user_id = $1
ORDER BY occurred_at DESC`;

export interface GetExperiencesArgs {
    userId: string;
}

export interface GetExperiencesRow {
    id: string;
    userId: string;
    occurredAt: Date;
    activatingStatus: string;
    reactionStatus: string;
    copingStatus: string;
    postStatus: string;
    details: any;
    createdAt: Date;
    updatedAt: Date;
}

export async function getExperiences(sql: Sql, args: GetExperiencesArgs): Promise<GetExperiencesRow[]> {
    return (await sql.unsafe(getExperiencesQuery, [args.userId]).values()).map(row => ({
        id: row[0],
        userId: row[1],
        occurredAt: row[2],
        activatingStatus: row[3],
        reactionStatus: row[4],
        copingStatus: row[5],
        postStatus: row[6],
        details: row[7],
        createdAt: row[8],
        updatedAt: row[9]
    }));
}

export const getVibeByIdQuery = `-- name: GetVibeById :one
SELECT id, user_id, time_range, valence, vitality, created_at, updated_at
FROM vibes
WHERE user_id = $1
  AND id = $2`;

export interface GetVibeByIdArgs {
    userId: string;
    id: string;
}

export interface GetVibeByIdRow {
    id: string;
    userId: string;
    timeRange: string;
    valence: number;
    vitality: number;
    createdAt: Date;
    updatedAt: Date;
}

export async function getVibeById(sql: Sql, args: GetVibeByIdArgs): Promise<GetVibeByIdRow | null> {
    const rows = await sql.unsafe(getVibeByIdQuery, [args.userId, args.id]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        userId: row[1],
        timeRange: row[2],
        valence: row[3],
        vitality: row[4],
        createdAt: row[5],
        updatedAt: row[6]
    };
}

export const getExperienceByIdQuery = `-- name: GetExperienceById :one
SELECT id, user_id, occurred_at, activating_status, reaction_status, coping_status, post_status, details, created_at, updated_at
FROM experiences
WHERE user_id = $1
  AND id = $2`;

export interface GetExperienceByIdArgs {
    userId: string;
    id: string;
}

export interface GetExperienceByIdRow {
    id: string;
    userId: string;
    occurredAt: Date;
    activatingStatus: string;
    reactionStatus: string;
    copingStatus: string;
    postStatus: string;
    details: any;
    createdAt: Date;
    updatedAt: Date;
}

export async function getExperienceById(sql: Sql, args: GetExperienceByIdArgs): Promise<GetExperienceByIdRow | null> {
    const rows = await sql.unsafe(getExperienceByIdQuery, [args.userId, args.id]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        userId: row[1],
        occurredAt: row[2],
        activatingStatus: row[3],
        reactionStatus: row[4],
        copingStatus: row[5],
        postStatus: row[6],
        details: row[7],
        createdAt: row[8],
        updatedAt: row[9]
    };
}

export const createVibeQuery = `-- name: CreateVibe :one
INSERT INTO vibes (user_id, time_range, valence, vitality)
VALUES ($1, $2, $3, $4) RETURNING id, user_id, time_range, valence, vitality, created_at, updated_at`;

export interface CreateVibeArgs {
    userId: string;
    timeRange: string;
    valence: number;
    vitality: number;
}

export interface CreateVibeRow {
    id: string;
    userId: string;
    timeRange: string;
    valence: number;
    vitality: number;
    createdAt: Date;
    updatedAt: Date;
}

export async function createVibe(sql: Sql, args: CreateVibeArgs): Promise<CreateVibeRow | null> {
    const rows = await sql.unsafe(createVibeQuery, [args.userId, args.timeRange, args.valence, args.vitality]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        userId: row[1],
        timeRange: row[2],
        valence: row[3],
        vitality: row[4],
        createdAt: row[5],
        updatedAt: row[6]
    };
}

export const createExperienceQuery = `-- name: CreateExperience :one
INSERT INTO experiences (user_id, occurred_at, details)
VALUES ($1, $2, $3) RETURNING id, user_id, occurred_at, activating_status, reaction_status, coping_status, post_status, details, created_at, updated_at`;

export interface CreateExperienceArgs {
    userId: string;
    occurredAt: Date;
    details: any;
}

export interface CreateExperienceRow {
    id: string;
    userId: string;
    occurredAt: Date;
    activatingStatus: string;
    reactionStatus: string;
    copingStatus: string;
    postStatus: string;
    details: any;
    createdAt: Date;
    updatedAt: Date;
}

export async function createExperience(sql: Sql, args: CreateExperienceArgs): Promise<CreateExperienceRow | null> {
    const rows = await sql.unsafe(createExperienceQuery, [args.userId, args.occurredAt, args.details]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        userId: row[1],
        occurredAt: row[2],
        activatingStatus: row[3],
        reactionStatus: row[4],
        copingStatus: row[5],
        postStatus: row[6],
        details: row[7],
        createdAt: row[8],
        updatedAt: row[9]
    };
}

export const updateVibeValuesQuery = `-- name: UpdateVibeValues :one
UPDATE vibes
SET valence = COALESCE($3, valence),
    vitality = COALESCE($4, vitality)
WHERE user_id = $1
  AND id = $2 RETURNING id, user_id, time_range, valence, vitality, created_at, updated_at`;

export interface UpdateVibeValuesArgs {
    userId: string;
    id: string;
    valence: number | null;
    vitality: number | null;
}

export interface UpdateVibeValuesRow {
    id: string;
    userId: string;
    timeRange: string;
    valence: number;
    vitality: number;
    createdAt: Date;
    updatedAt: Date;
}

export async function updateVibeValues(sql: Sql, args: UpdateVibeValuesArgs): Promise<UpdateVibeValuesRow | null> {
    const rows = await sql.unsafe(updateVibeValuesQuery, [args.userId, args.id, args.valence, args.vitality]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        userId: row[1],
        timeRange: row[2],
        valence: row[3],
        vitality: row[4],
        createdAt: row[5],
        updatedAt: row[6]
    };
}

export const updateExperienceDetailsQuery = `-- name: UpdateExperienceDetails :one
UPDATE experiences
SET details = $3,
    activating_status = COALESCE($4, activating_status),
    reaction_status = COALESCE($5, reaction_status),
    coping_status = COALESCE($6, coping_status),
    post_status= COALESCE($7, post_status)
WHERE user_id = $1
  AND id = $2 RETURNING id, user_id, occurred_at, activating_status, reaction_status, coping_status, post_status, details, created_at, updated_at`;

export interface UpdateExperienceDetailsArgs {
    userId: string;
    id: string;
    details: any;
    activatingStatus: string | null;
    reactionStatus: string | null;
    copingStatus: string | null;
    postStatus: string | null;
}

export interface UpdateExperienceDetailsRow {
    id: string;
    userId: string;
    occurredAt: Date;
    activatingStatus: string;
    reactionStatus: string;
    copingStatus: string;
    postStatus: string;
    details: any;
    createdAt: Date;
    updatedAt: Date;
}

export async function updateExperienceDetails(sql: Sql, args: UpdateExperienceDetailsArgs): Promise<UpdateExperienceDetailsRow | null> {
    const rows = await sql.unsafe(updateExperienceDetailsQuery, [args.userId, args.id, args.details, args.activatingStatus, args.reactionStatus, args.copingStatus, args.postStatus]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        userId: row[1],
        occurredAt: row[2],
        activatingStatus: row[3],
        reactionStatus: row[4],
        copingStatus: row[5],
        postStatus: row[6],
        details: row[7],
        createdAt: row[8],
        updatedAt: row[9]
    };
}

export const deleteVibeQuery = `-- name: DeleteVibe :one
DELETE
FROM vibes
WHERE user_id = $1
  AND id = $2 RETURNING id, user_id, time_range, valence, vitality, created_at, updated_at`;

export interface DeleteVibeArgs {
    userId: string;
    id: string;
}

export interface DeleteVibeRow {
    id: string;
    userId: string;
    timeRange: string;
    valence: number;
    vitality: number;
    createdAt: Date;
    updatedAt: Date;
}

export async function deleteVibe(sql: Sql, args: DeleteVibeArgs): Promise<DeleteVibeRow | null> {
    const rows = await sql.unsafe(deleteVibeQuery, [args.userId, args.id]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        userId: row[1],
        timeRange: row[2],
        valence: row[3],
        vitality: row[4],
        createdAt: row[5],
        updatedAt: row[6]
    };
}

export const deleteExperienceQuery = `-- name: DeleteExperience :one
DELETE
FROM experiences
WHERE user_id = $1
  AND id = $2 RETURNING id, user_id, occurred_at, activating_status, reaction_status, coping_status, post_status, details, created_at, updated_at`;

export interface DeleteExperienceArgs {
    userId: string;
    id: string;
}

export interface DeleteExperienceRow {
    id: string;
    userId: string;
    occurredAt: Date;
    activatingStatus: string;
    reactionStatus: string;
    copingStatus: string;
    postStatus: string;
    details: any;
    createdAt: Date;
    updatedAt: Date;
}

export async function deleteExperience(sql: Sql, args: DeleteExperienceArgs): Promise<DeleteExperienceRow | null> {
    const rows = await sql.unsafe(deleteExperienceQuery, [args.userId, args.id]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        userId: row[1],
        occurredAt: row[2],
        activatingStatus: row[3],
        reactionStatus: row[4],
        copingStatus: row[5],
        postStatus: row[6],
        details: row[7],
        createdAt: row[8],
        updatedAt: row[9]
    };
}

