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

export const getAllPsycheEventsByUserIdQuery = `-- name: GetAllPsycheEventsByUserId :many
SELECT id, user_id, metadata, happened_at, created_at FROM psyche_events
WHERE user_id = $1`;

export interface GetAllPsycheEventsByUserIdArgs {
    userId: string;
}

export interface GetAllPsycheEventsByUserIdRow {
    id: string;
    userId: string;
    metadata: any;
    happenedAt: Date;
    createdAt: Date;
}

export async function getAllPsycheEventsByUserId(sql: Sql, args: GetAllPsycheEventsByUserIdArgs): Promise<GetAllPsycheEventsByUserIdRow[]> {
    return (await sql.unsafe(getAllPsycheEventsByUserIdQuery, [args.userId]).values()).map(row => ({
        id: row[0],
        userId: row[1],
        metadata: row[2],
        happenedAt: row[3],
        createdAt: row[4]
    }));
}

export const getPsycheEventsByIdQuery = `-- name: GetPsycheEventsById :one
SELECT id, user_id, metadata, happened_at, created_at FROM psyche_events
WHERE id = $1`;

export interface GetPsycheEventsByIdArgs {
    id: string;
}

export interface GetPsycheEventsByIdRow {
    id: string;
    userId: string;
    metadata: any;
    happenedAt: Date;
    createdAt: Date;
}

export async function getPsycheEventsById(sql: Sql, args: GetPsycheEventsByIdArgs): Promise<GetPsycheEventsByIdRow | null> {
    const rows = await sql.unsafe(getPsycheEventsByIdQuery, [args.id]).values();
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

export const createPsycheEventQuery = `-- name: CreatePsycheEvent :one
INSERT INTO psyche_events (user_id, metadata, happened_at) VALUES ($1, $2, $3)
RETURNING id, user_id, metadata, happened_at, created_at`;

export interface CreatePsycheEventArgs {
    userId: string;
    metadata: any;
    happenedAt: Date;
}

export interface CreatePsycheEventRow {
    id: string;
    userId: string;
    metadata: any;
    happenedAt: Date;
    createdAt: Date;
}

export async function createPsycheEvent(sql: Sql, args: CreatePsycheEventArgs): Promise<CreatePsycheEventRow | null> {
    const rows = await sql.unsafe(createPsycheEventQuery, [args.userId, args.metadata, args.happenedAt]).values();
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

export const updatePsycheEventQuery = `-- name: UpdatePsycheEvent :one
UPDATE psyche_events
SET metadata = $2
WHERE id = $1
RETURNING id, user_id, metadata, happened_at, created_at`;

export interface UpdatePsycheEventArgs {
    id: string;
    metadata: any;
}

export interface UpdatePsycheEventRow {
    id: string;
    userId: string;
    metadata: any;
    happenedAt: Date;
    createdAt: Date;
}

export async function updatePsycheEvent(sql: Sql, args: UpdatePsycheEventArgs): Promise<UpdatePsycheEventRow | null> {
    const rows = await sql.unsafe(updatePsycheEventQuery, [args.id, args.metadata]).values();
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

