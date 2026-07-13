const server = require('./src/app');
const { conn } = require('./src/db');

const PORT = process.env.PORT || 3001;

conn.sync({ alter: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`API listening at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to start the server:', error);
    process.exit(1);
  });
