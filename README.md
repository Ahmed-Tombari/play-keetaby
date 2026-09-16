# Play Keetaby

The whole project in one repo, one branch: an Express + Prisma API and the
Next.js site that goes with it.

```
backend/    Express API (auth, categories, games, levels) - port 5000
frontend/   Next.js site - port 3210
scripts/    runs both with one command
```

## Run it

```bash
npm run install:all    # once: installs backend/ and frontend/ dependencies
npm run dev:all        # starts both, Ctrl+C stops both
```

| what | url |
|---|---|
| the site | http://localhost:3210 |
| the API health check | http://localhost:5000/health |

Only need one half?

```bash
npm run dev:backend    # API only  (nodemon, port 5000)
npm run dev:frontend   # site only (port 3210)
npm run build:frontend # production build of the site
```

Port 3000 belongs to another app on this machine, so the site uses 3210.

> The API needs PostgreSQL. With no database it still boots and `/health`
> answers, but its data routes return 500. The home page does not call the API,
> so the site runs on its own.

## Branch

`main` holds both halves. Backend details are in `backend/README.md`.
