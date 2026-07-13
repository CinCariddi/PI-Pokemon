# Deploying to Vercel

The app is deployed as **two Vercel projects from the same repository** (one for the API,
one for the client) plus a **Neon** Postgres database.

The client cannot talk to a database directly, and Vercel does not host databases, so the
order below matters: database first, then API, then client.

---

## 1. Database (Neon)

1. Create an account at [neon.tech](https://neon.tech) and create a project.
2. Copy the **pooled** connection string. It looks like:

   ```
   postgresql://user:password@ep-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require
   ```

   Use the *pooled* one (the host contains `-pooler`). Serverless functions open many
   short-lived connections and a direct connection string runs out of them.

3. Create the tables and seed the Pokemon types, **once**, from your machine:

   ```bash
   cd api
   # Temporarily add DATABASE_URL=... to api/.env
   npm run db:setup
   ```

   You should see `Tables are up to date.` and `Seeded 19 Pokemon types.`

   Remove `DATABASE_URL` from `api/.env` afterwards if you want local development to keep
   using your local Postgres.

---

## 2. API

Create a new Vercel project from this repository:

| Setting        | Value  |
| -------------- | ------ |
| Root Directory | `api`  |
| Framework      | Other  |

Environment variables:

| Name          | Value                                              |
| ------------- | -------------------------------------------------- |
| `DATABASE_URL`| The pooled Neon connection string from step 1       |
| `CORS_ORIGIN` | The client URL, filled in after step 3              |

Deploy. Check it works by opening `https://<your-api>.vercel.app/types` — it should return
a JSON array of Pokemon types.

Note: `CORS_ORIGIN` cannot be filled in yet, because the client does not exist. Leave it
out for now and come back to it in step 4.

---

## 3. Client

Create a **second** Vercel project from the same repository:

| Setting        | Value              |
| -------------- | ------------------ |
| Root Directory | `client`           |
| Framework      | Create React App   |

Environment variable:

| Name                | Value                          |
| ------------------- | ------------------------------ |
| `REACT_APP_API_URL` | `https://<your-api>.vercel.app` |

No trailing slash.

> Create React App inlines environment variables **at build time**, not at run time.
> If you change `REACT_APP_API_URL` later you have to redeploy the client for it to take
> effect — restarting it is not enough.

---

## 4. Close the loop: CORS

Go back to the **API** project and set:

| Name          | Value                              |
| ------------- | ---------------------------------- |
| `CORS_ORIGIN` | `https://<your-client>.vercel.app` |

Then **redeploy the API** so it picks up the variable.

To also allow local development against the deployed API, pass a comma-separated list:

```
CORS_ORIGIN=https://<your-client>.vercel.app,http://localhost:3000
```

---

## How the API runs on Vercel

Locally, `api/index.js` starts a long-lived Express server with `server.listen()`.

On Vercel there is no long-lived server: `api/api/index.js` exports the Express app and
Vercel invokes it once per request as a serverless function. Two consequences:

- **The schema is not synced on startup**, because there is no startup. That is what
  `npm run db:setup` is for, and why it only has to run once.
- **The PokeAPI cache does not survive cold starts.** A cold request re-fetches the 40
  Pokemon from PokeAPI (~1-2s). Warm requests are served from memory.

## Troubleshooting

| Symptom | Cause |
| ------- | ----- |
| `Network Error` in the browser | The API is unreachable, or `REACT_APP_API_URL` is wrong / was changed without redeploying the client. |
| CORS error in the console | `CORS_ORIGIN` on the API does not exactly match the client's URL (check `https://`, no trailing slash), or the API was not redeployed after setting it. |
| `relation "pokemons" does not exist` | `npm run db:setup` was never run against the Neon database. |
| 404 when refreshing `/home/25` | The SPA fallback is missing. `client/vercel.json` handles this. |
