import { Sql } from "postgres";

export const createUserQuery = `-- name: CreateUser :one
INSERT INTO users (email, hash) VALUES ($1, $2)
RETURNING id, email, hash, created_at, updated_at`;

export interface CreateUserArgs {
    email: string;
    hash: string;
}

export interface CreateUserRow {
    id: string;
    email: string;
    hash: string;
    createdAt: Date;
    updatedAt: Date;
}

export async function createUser(sql: Sql, args: CreateUserArgs): Promise<CreateUserRow | null> {
    const rows = await sql.unsafe(createUserQuery, [args.email, args.hash]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        email: row[1],
        hash: row[2],
        createdAt: row[3],
        updatedAt: row[4]
    };
}

export const createVibeQuery = `-- name: CreateVibe :one
INSERT INTO vibes (user_id, time_range, valence, vitality) VALUES ($1, $2, $3, $4)
RETURNING id, user_id, time_range, valence, vitality, created_at, updated_at`;

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
INSERT INTO experiences (user_id, occurred_at, details, activating_status, reaction_status, coping_status, post_status) VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING id, user_id, occurred_at, activating_status, reaction_status, coping_status, post_status, details, created_at, updated_at`;

export interface CreateExperienceArgs {
    userId: string;
    occurredAt: Date;
    details: any;
    activatingStatus: string;
    reactionStatus: string;
    copingStatus: string;
    postStatus: string;
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
    const rows = await sql.unsafe(createExperienceQuery, [args.userId, args.occurredAt, args.details, args.activatingStatus, args.reactionStatus, args.copingStatus, args.postStatus]).values();
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

