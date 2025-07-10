# PsyTrack

**PsyTrack** is a mental state tracking tool designed to support self-reflection and personal insight. It helps users gain awareness of their internal states and promotes emotional clarity and personal growth.

## Features

- Create mental events to record your psychological state
- Support for natural language input, converted into structured data via LLM
- Visualize trends and changes in mental states
- Generate mental analysis, reports, and suggestions using LLM
- Engage in AI-assisted self-exploration conversations

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

## Documentation

- [User Stories](docs/user-stories.md) - User needs and feature descriptions
- [Emotion Schema](docs/emotion-schema.md) - Core emotion categories and definitions

### Backend

- [System Overview](docs/backend/system-overview.md) - Overview of backend modules and responsibilities
- [Getting Started](docs/backend/getting-started.md) - Backend setup and initial run instructions
- [Database Guide](docs/backend/database-guide.md) - How to interact with the database, migrations, and sqlc usage
