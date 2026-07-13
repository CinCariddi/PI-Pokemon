require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
// Sequelize loads its driver dynamically, which bundlers cannot see: on Vercel the `pg`
// package gets tree-shaken out of the function and Sequelize then fails at runtime with
// "Please install pg package manually". Requiring it here and handing it over through
// `dialectModule` keeps it in the bundle.
const pg = require('pg');

const {
  DATABASE_URL,
  DB_USER, DB_PASSWORD, DB_HOST, DB_PORT = 5432, DB_NAME = 'pokemon',
} = process.env;

// Hosted Postgres (Neon, Supabase, ...) hands out a single connection string and requires
// SSL. Locally we build the string from the separate credentials and connect without it.
const connectionString = DATABASE_URL
  || `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  dialectModule: pg,
  logging: false,
  native: false,
  dialectOptions: DATABASE_URL
    ? { ssl: { require: true, rejectUnauthorized: false } }
    : {},
  // Serverless functions are short-lived and many can run at once, so each instance
  // should hold as few connections as possible.
  pool: DATABASE_URL
    ? { max: 2, min: 0, idle: 10000 }
    : { max: 5, min: 0, idle: 10000 },
});

const modelsPath = path.join(__dirname, 'models');

fs.readdirSync(modelsPath)
  .filter((file) => file.endsWith('.js'))
  .forEach((file) => {
    const defineModel = require(path.join(modelsPath, file));
    defineModel(sequelize);
  });

const { Pokemon, Type } = sequelize.models;

Pokemon.belongsToMany(Type, { through: 'pokemon_type' });
Type.belongsToMany(Pokemon, { through: 'pokemon_type' });

module.exports = {
  Pokemon,
  Type,
  conn: sequelize,
};
