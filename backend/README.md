# Keetaby Academy backend

Express + Prisma API for the Keetaby learning games platform.

Part of the Play Keetaby repo: the site lives in `frontend/`. See the root
`README.md` for starting the API together with the site (`npm run dev:all`).


Merged from the `RouissiNour` branch (user/admin auth) and the `mariemmalki`
branch (categories, games, game levels) into `main`.

## Stack

- Node.js + Express 5
- PostgreSQL
- Prisma (categories, games, game_levels, users, password_resets)
- JWT auth, bcryptjs, nodemailer, zod validation

## Setup

```bash
npm install
cp .env.example .env   # then fill in your DB credentials
npx prisma migrate deploy
npm run dev            # or: npm start
```

Server runs on `http://localhost:5000` (set `PORT` in `.env` to change it).

## Endpoints

### System
| Method | Path | Description |
|---|---|---|
| GET | `/` | Root message |
| GET | `/health` | Health check |
| GET | `/api/test-db` | Tests the auth database connection |

### Auth - user (`/api/user`)
| Method | Path | Description |
|---|---|---|
| POST | `/api/user/signup` | Register a user (pending admin approval) |
| POST | `/api/user/login` | Login user |
| POST | `/api/user/forgot-password` | Request reset code |
| POST | `/api/user/reset-password` | Reset password with code |
| POST | `/api/user/logout` | Logout (auth) |
| GET | `/api/user/profile` | Current user profile (auth) |

### Auth - admin (`/api/admin`)
| Method | Path | Description |
|---|---|---|
| POST | `/api/admin/signup` | Create an admin |
| POST | `/api/admin/login` | Login admin |
| POST | `/api/admin/forgot-password` | Request reset code |
| POST | `/api/admin/reset-password` | Reset password with code |
| POST | `/api/admin/logout` | Logout (auth + admin) |
| GET | `/api/admin/dashboard` | Admin dashboard (auth + admin) |
| GET | `/api/admin/pending-users` | List users awaiting approval (auth + admin) |
| PUT | `/api/admin/users/:id/approve` | Approve a user (auth + admin) |
| DELETE | `/api/admin/users/:id/reject` | Delete a user (auth + admin) |

### Categories (`/api/categories`)
| Method | Path | Description |
|---|---|---|
| GET | `/api/categories` | List categories |
| GET | `/api/categories/:id` | Get one category |
| POST | `/api/categories` | Create category |
| PATCH | `/api/categories/:id` | Update category |
| DELETE | `/api/categories/:id` | Delete category |

### Games (`/api/games`)
| Method | Path | Description |
|---|---|---|
| GET | `/api/games` | List games (filter: `categoryId`, `published`, `difficulty`, `search`) |
| GET | `/api/games/:id` | Get one game |
| POST | `/api/games` | Create game |
| PATCH | `/api/games/:id` | Update game |
| DELETE | `/api/games/:id` | Delete game |
| PATCH | `/api/games/:id/publish` | Toggle publish |
| GET | `/api/games/:id/levels` | List game levels |
| POST | `/api/games/:id/levels` | Add level |
| PATCH | `/api/games/:id/levels/:levelId` | Update level |
| DELETE | `/api/games/:id/levels/:levelId` | Delete level |

## DB schema

See `db-schema.excalidraw` for the platform design (categories, games,
game_levels, users, plays).
