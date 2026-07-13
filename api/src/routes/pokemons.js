const { Router } = require('express');
const {
  getAllPokemon,
  searchPokemonByName,
  getPokemonById,
  createPokemon,
} = require('../services/pokemon');

const router = Router();

const REQUIRED_FIELDS = ['name', 'life'];

router.get('/', async (req, res, next) => {
  try {
    const { name } = req.query;

    if (!name) {
      const pokemon = await getAllPokemon();
      return res.json(pokemon);
    }

    const matches = await searchPokemonByName(name);
    if (!matches.length) {
      return res.status(404).json({ error: `No Pokemon found matching "${name}".` });
    }

    return res.json(matches);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const pokemon = await getPokemonById(req.params.id);
    if (!pokemon) {
      return res.status(404).json({ error: `No Pokemon found with id "${req.params.id}".` });
    }
    return res.json(pokemon);
  } catch (error) {
    return next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const missing = REQUIRED_FIELDS.filter((field) => req.body[field] === undefined || req.body[field] === '');
    if (missing.length) {
      return res.status(400).json({ error: `Missing required fields: ${missing.join(', ')}.` });
    }

    const {
      name, image, life, attack, defense, speed, height, weight, types,
    } = req.body;

    const pokemon = await createPokemon({
      name,
      // Let the model's default image kick in when the form leaves the field blank.
      image: image || undefined,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
    });

    return res.status(201).json(pokemon);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
