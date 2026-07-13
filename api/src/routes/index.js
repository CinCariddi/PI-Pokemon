const { Router } = require('express');
const pokemonRouter = require('./pokemons');
const typeRouter = require('./types');

const router = Router();

router.use('/pokemons', pokemonRouter);
router.use('/types', typeRouter);

module.exports = router;
