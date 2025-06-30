# PsyTrack

**PsyTrack** is a mental state tracking tool designed to support self-reflection and personal insight. It helps users gain awareness of their internal states and promotes emotional clarity and personal growth.

## Features

- Create mental events to record your psychological state
- Support for natural language input, converted into structured data via LLM
- Visualize trends and changes in mental states
- Generate mental analysis, reports, and suggestions using LLM
- Engage in AI-assisted self-exploration conversations

## System Overview

### Backend Modules

#### Auth Module

- JWT-based access and refresh token system
- Login, logout, and token refresh endpoints
- Access control using guards

#### User Module

- User registration and profile update
- Password hashing (bcrypt)
- Fetch and update current user information

#### Mental Module

- Create and retrieve mental event records

#### LLM Module

- Convert natural language into structured mental event input
- Generate automated analysis, reports, and suggestions
- Support AI-assisted self-exploration dialogue

## Tech Stack

### Backend

- **Runtime:** Node.js v22
- **Package Manager:** pnpm v10
- **Framework:** [NestJS](https://nestjs.com/) (TypeScript)
- **Database:** PostgreSQL + Redis (via connection URL)
- **Migrations:** DB Mate
- **SQL Bindings:** sqlc (for type-safe SQL access)
- **Authentication:** JWT (stateless access & refresh tokens)
- **Validation:** Zod

## Roadmap

### Backend

- [x] Set up NestJS with pnpm and Node.js 22
- [x] Integrate PostgreSQL using sqlc and DB Mate
- [ ] Implement Zod-based validation flow
- [ ] Add Redis integration
- [ ] Implement JWT-based login system

## Getting Started

### Backend Setup

#### Prerequisites

Please make sure the following tools are installed:

- Node.js v22
- pnpm v10
- sqlc (see: https://docs.sqlc.dev/)

#### Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/nichtsam/psytrack.git
cd psytrack

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env

# 4. Run database migrations
pnpm db:up

# 5. Generate SQL bindings
pnpm db:query:gen

# 6. Start the development server
pnpm dev
```

## 🗃️ Database Operation

```bash
# Generate a new migration file
$ pnpm db:new

# Migrate the database
$ pnpm db:up

# Rollback the most recent migration
$ pnpm db:down

# Dump schema for sqlc to use, postgresql@17 is a dependency, and database connection with up-to-date schema is required
$ pnpm db:dump
```

Environment varialbe `DATABASE_URL` is needed for database operation.

To update the database schema, use `db:new` to generate a new migration sql file, write the migration sql, and run `db:up` to bring it to effect.

To write databas interaction logic, write sql queries in `db/query.sql` as sqlc specifies.

To update the sqlc generated query functions, use `db:dump` to sync with the latest database first, then use `db:query:gen` to generate a new version of query functions.

For a database connection in module, import `PostgresModule`.
