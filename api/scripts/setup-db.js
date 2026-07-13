/**
 * Creates the tables and seeds the Pokemon types.
 *
 * Run it once against a fresh database:
 *   npm run db:setup
 *
 * On Vercel the API runs as a serverless function, so it cannot sync the schema on
 * startup the way the local server does: there is no startup, just one short-lived
 * invocation per request.
 */
const { conn } = require('../src/db');
const { getTypes } = require('../src/services/pokemon');

(async () => {
  try {
    await conn.authenticate();
    console.log('Connected to the database.');

    await conn.sync({ alter: true });
    console.log('Tables are up to date.');

    const types = await getTypes();
    console.log(`Seeded ${types.length} Pokemon types.`);

    await conn.close();
    process.exit(0);
  } catch (error) {
    console.error('Database setup failed:', error.message);
    process.exit(1);
  }
})();
