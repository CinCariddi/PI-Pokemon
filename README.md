<p align="left">
  <img height="150" src="./pokemon.png" />
</p>

# Pokemon

A full-stack Pokedex. It lists Pokemon coming from [PokeAPI](https://pokeapi.co/) together with the ones you create yourself, and lets you search, filter, sort and paginate through them.

Originally built in 2022 as an individual project for the Henry bootcamp, later cleaned up and updated.

## Features

- Landing page and a home page listing 40 Pokemon from PokeAPI plus every Pokemon stored in the database.
- Search by name (partial matches allowed).
- Filter by type, and by origin (created by you vs. coming from PokeAPI).
- Sort alphabetically and by attack, ascending or descending.
- Pagination, 12 Pokemon per page.
- Detail page with image, types, id, stats, height and weight.
- Form to create a Pokemon, validated in JavaScript, with support for several types.

## Stack

| Layer    | Tech                                            |
| -------- | ----------------------------------------------- |
| Frontend | React 18, Redux, React Router, Create React App  |
| Backend  | Node, Express 5, Sequelize                      |
| Database | PostgreSQL                                      |

## Getting started

### Requirements

- Node 18 or newer
- PostgreSQL running locally, with a database named `pokemon`:

```sql
CREATE DATABASE pokemon;
```

### Backend

```bash
cd api
cp .env.example .env   # then fill in your Postgres credentials
npm install
npm run dev
```

The API starts on `http://localhost:3001`.

### Frontend

```bash
cd client
cp .env.example .env   # optional, defaults to http://localhost:3001
npm install
npm start
```

The app starts on `http://localhost:3000`.

## Environment variables

**`api/.env`**

| Variable      | Default                 | Description                          |
| ------------- | ----------------------- | ------------------------------------ |
| `DB_USER`     | —                       | Postgres user                        |
| `DB_PASSWORD` | —                       | Postgres password                    |
| `DB_HOST`     | —                       | Postgres host                        |
| `DB_PORT`     | `5432`                  | Postgres port                        |
| `DB_NAME`     | `pokemon`               | Database name                        |
| `PORT`        | `3001`                  | Port the API listens on              |
| `CORS_ORIGIN` | `http://localhost:3000` | Origin allowed to call the API       |

**`client/.env`**

| Variable            | Default                 | Description      |
| ------------------- | ----------------------- | ---------------- |
| `REACT_APP_API_URL` | `http://localhost:3001` | Base URL of the API |

## API

| Method | Endpoint                | Description                                                        |
| ------ | ----------------------- | ------------------------------------------------------------------ |
| GET    | `/pokemons`             | Every Pokemon, from PokeAPI and from the database                  |
| GET    | `/pokemons?name=pikachu`| Pokemon whose name contains the query; `404` when nothing matches  |
| GET    | `/pokemons/:id`         | A single Pokemon; the id can be a PokeAPI number or a database UUID |
| POST   | `/pokemons`             | Creates a Pokemon in the database                                  |
| GET    | `/types`                | Every Pokemon type                                                 |

Every Pokemon is returned with the same shape, no matter where it came from:

```json
{
  "id": 25,
  "name": "pikachu",
  "types": ["electric"],
  "image": "https://...",
  "life": 35,
  "attack": 55,
  "defense": 40,
  "speed": 90,
  "height": 4,
  "weight": 60,
  "createdInDb": false
}
```

## Tests

```bash
cd api && npm test        # model and route tests (mocha + chai + supertest)
cd client && npm test     # component tests (jest + testing library)
```

The backend tests need Postgres running, and the route tests reach out to PokeAPI.
