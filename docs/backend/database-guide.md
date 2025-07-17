# 🗃️ Database Guide

This document describes how to manage and interact with the PostgreSQL database in the backend codebase.  
The most important configuration is the environment variable `DATABASE_URL`, which defines the connection string.

## Overview

As outlined in the main README.md, here’s a quick overview of the technologies we use for working with our database:

- **Database:** PostgreSQL + Redis (via connection URL)
- **Migrations:** Dbmate
- **SQL Bindings:** sqlc (for type-safe SQL access)

The general workflow is:

1. Use Dbmate to create and apply migrations.
2. Use `sqlc` (with a TypeScript plugin) to generate Typescript query functions, allowing us to write raw SQL in a clean, organized, and type-safe way, without relying on an ORM.
3. In our NestJS app, we encapsulate the database connection in a dedicated module, ensuring it’s a singleton and can be injected where needed.

## Common Commands

```bash
# Generate a new migration file
pnpm db:new

# Apply migrations to update the database
pnpm db:up

# Roll back the most recent migration
pnpm db:down

# Dump current database schema for sqlc (requires PostgreSQL@17 and valid DB connection)
pnpm db:dump

# Generate TypeScript query bindings from db/query.sql
pnpm db:query:gen
```

## Creating Migrations

To update the schema:

1. Run `pnpm db:new` to generate a new migration file.
2. Write the SQL migration.
3. Apply it with `pnpm db:up`.

## Accessing the Database in Code

Use the provided `PostgresModule` to get a singleton database connection.

1. Import `PostgresModule` in your feature module.
2. Inject `PostgresService` to access the connection via the sql field.

### Add New Query Fuctions

The codebase uses `sqlc` for type-safe SQL query generation.

1. Write SQL queries following sqlc conventions in `db/query.sql`.
2. Run `pnpm db:query:gen` to generate the corresponding TypeScript query functions.

Note: The schema used by sqlc is usually updated with each `db:up`.
If it’s outdated or missing, run `pnpm db:dump` to dump the latest schema.
This requires a working database connection.
