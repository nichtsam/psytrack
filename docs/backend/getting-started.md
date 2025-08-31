# Getting Started

## Prerequisites

Please make sure the following tools are installed:

- Node.js v22
- pnpm v10
- sqlc (see: https://docs.sqlc.dev/)

## Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/nichtsam/syke.git
cd syke

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env

# 4. Run database migrations
pnpm db:up

# 5. Start the development server
pnpm dev
```
