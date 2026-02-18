# Soul Gaming Platform

A modern, full-stack gaming community platform built with Next.js 14, Tailwind CSS, and **Azure SQL Database**.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React 18, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** Azure SQL Database (via `mssql` driver)
- **Auth:** JWT with bcrypt password hashing
- **Web3:** Reown AppKit (WalletConnect)
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- An Azure SQL Database instance

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Azure SQL in `.env`:**
   ```env
   AZURE_SQL_SERVER=yourserver.database.windows.net
   AZURE_SQL_PORT=1433
   AZURE_SQL_DATABASE=yourdb
   AZURE_SQL_USER=youruser
   AZURE_SQL_PASSWORD=yourpassword
   AZURE_SQL_TRUST_CERTIFICATE=false
   ```

3. **Create the database schema:**
   - Open your Azure SQL database in Azure Portal (Query editor) or SSMS.
   - Run the script in `scripts/azure-sql-schema.sql` to create all tables.

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## Project Structure

```
soulgame/
├── scripts/
│   └── azure-sql-schema.sql   # Azure SQL DDL (run once to create tables)
├── src/
│   ├── app/api/               # Backend API routes
│   ├── app/dashboard/         # User dashboard, earnings, play-to-earn
│   ├── components/
│   └── lib/
│       ├── db.ts              # Azure SQL connection pool & helpers
│       ├── auth.ts            # JWT & password utils
│       └── get-auth-user.ts   # Get current user from request
├── .env.example
├── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |
| GET | `/api/auth/me` | Get current user profile |
| GET | `/api/games` | List all games |
| GET | `/api/games/play-to-earn` | List play-to-earn games |
| GET | `/api/user/earnings` | Get user earnings & transaction history |
| POST | `/api/rewards/record` | Record a game win/played (earn SOUL points) |
| GET | `/api/tournaments` | List tournaments |
| POST | `/api/tournaments` | Create a tournament |
| GET | `/api/leaderboard` | Get leaderboard rankings |
| GET | `/api/health` | Health check |

## Scripts

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

## Database (Azure SQL)

- All tables are created by running `scripts/azure-sql-schema.sql` in your Azure SQL database.
- Tables: `users`, `games`, `user_game_stats`, `reward_transactions`, `tournaments`, `tournament_participants`, `posts`, `comments`.
- After creating tables, you can insert play-to-earn games manually or via a seed script if you add one.
