# PsyTrack

**PsyTrack** helps you journal and analyze your inner world.  
Capture your emotions, experiences, reactions, and reflections in a structured way, and gain insight through data-driven visualizations and pattern recognition.

## Features

- Log vibes for overall psychological state tracking
- Log experiences to capture detailed emotional events
- Visualize trends, changes, and patterns over time
- Natural language input powered by LLM, automatically structured

## Tech Stack

### Backend

- **Runtime:** Node.js v22
- **Package Manager:** pnpm v10
- **Framework:** [NestJS](https://nestjs.com/) (TypeScript)
- **Database:** PostgreSQL + Redis (via connection URL)
- **Migrations:** Dbmate
- **SQL Bindings:** sqlc (for type-safe SQL access)
- **Authentication:** JWT (stateless access & refresh tokens)
- **Validation:** Zod

## Documentation

Want a walkthrough of how this works and where to start?  
👉 [Check out the Docs Walkthrough](./docs/README.md)
