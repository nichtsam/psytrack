import { Sql } from "postgres";

export const getUserByIdQuery = `-- name: GetUserById :one
SELECT id, email, hash, created_at, updated_at FROM users
WHERE id = $1 LIMIT 1`;

export interface GetUserByIdArgs {
    id: string;
}

export interface GetUserByIdRow {
    id: string;
    email: string;
    hash: string;
    createdAt: Date;
    updatedAt: Date;
}

export async function getUserById(sql: Sql, args: GetUserByIdArgs): Promise<GetUserByIdRow | null> {
    const rows = await sql.unsafe(getUserByIdQuery, [args.id]).values();
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

export const getUserByEmailQuery = `-- name: GetUserByEmail :one
SELECT id, email, hash, created_at, updated_at FROM users
WHERE email = $1 LIMIT 1`;

export interface GetUserByEmailArgs {
    email: string;
}

export interface GetUserByEmailRow {
    id: string;
    email: string;
    hash: string;
    createdAt: Date;
    updatedAt: Date;
}

export async function getUserByEmail(sql: Sql, args: GetUserByEmailArgs): Promise<GetUserByEmailRow | null> {
    const rows = await sql.unsafe(getUserByEmailQuery, [args.email]).values();
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

export const getAllExperiencesByUserIdQuery = `-- name: GetAllExperiencesByUserId :many
SELECT id, user_id, metadata, happened_at, created_at FROM psyche_events
WHERE user_id = $1`;

export interface GetAllExperiencesByUserIdArgs {
    userId: string;
}

export interface GetAllExperiencesByUserIdRow {
    id: string;
    userId: string;
    metadata: any;
    happenedAt: Date;
    createdAt: Date;
}

export async function getAllExperiencesByUserId(sql: Sql, args: GetAllExperiencesByUserIdArgs): Promise<GetAllExperiencesByUserIdRow[]> {
    return (await sql.unsafe(getAllExperiencesByUserIdQuery, [args.userId]).values()).map(row => ({
        id: row[0],
        userId: row[1],
        metadata: row[2],
        happenedAt: row[3],
        createdAt: row[4]
    }));
}

export const createExperienceQuery = `-- name: CreateExperience :one
INSERT INTO psyche_events (user_id, metadata, happened_at) VALUES ($1, $2, $3)
RETURNING id, user_id, metadata, happened_at, created_at`;

export interface CreateExperienceArgs {
    userId: string;
    metadata: any;
    happenedAt: Date;
}

export interface CreateExperienceRow {
    id: string;
    userId: string;
    metadata: any;
    happenedAt: Date;
    createdAt: Date;
}

export async function createExperience(sql: Sql, args: CreateExperienceArgs): Promise<CreateExperienceRow | null> {
    const rows = await sql.unsafe(createExperienceQuery, [args.userId, args.metadata, args.happenedAt]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        userId: row[1],
        metadata: row[2],
        happenedAt: row[3],
        createdAt: row[4]
    };
}

