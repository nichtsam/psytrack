# System Overview (Backend)

This document outlines the core backend modules of the Syke system and their responsibilities.

## Modules

### Auth Module

- Endpoints for login, logout, and token refresh
- JWT-based access and refresh token system
- Secure password hashing using Argon2
- Route protection using guards and decorators

### User Module

- user creation
- user retrieval
- user updates

### Psyche Module

- Record psychological events with structured metadata
- Retrieve psychological event records

### LLM Module

Integrates with language models for intelligent features:

- Converts natural language into structured psychological event input
- Generates emotional analysis, reports, and suggestions
- Enables AI-assisted self-reflection conversations

### Postgres Module

Exposes a singleton PostgreSQL connection via `PostgresService`.
