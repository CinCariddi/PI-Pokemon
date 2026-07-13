const axios = require('axios');
const { Pokemon, Type } = require('../db');

const POKEAPI_URL = 'https://pokeapi.co/api/v2';
const POKEMON_LIMIT = 40;
const CACHE_TTL_MS = 10 * 60 * 1000;

// Types PokeAPI exposes but that no real Pokemon belongs to.
const EXCLUDED_TYPES = ['unknown', 'shadow'];

let apiCache = { data: null, expiresAt: 0 };

const statValue = (stats, statName) => stats.find((s) => s.stat.name === statName)?.base_stat ?? 0;

const fromApi = (data) => ({
  id: data.id,
  name: data.name,
  types: data.types.map((t) => t.type.name),
  image: data.sprites.other?.['official-artwork']?.front_default ?? data.sprites.front_default,
  life: statValue(data.stats, 'hp'),
  attack: statValue(data.stats, 'attack'),
  defense: statValue(data.stats, 'defense'),
  speed: statValue(data.stats, 'speed'),
  height: data.height,
  weight: data.weight,
  createdInDb: false,
});

const fromDb = (pokemon) => ({
  id: pokemon.id,
  name: pokemon.name,
  types: pokemon.Types.map((t) => t.name),
  image: pokemon.image,
  life: pokemon.life,
  attack: pokemon.attack,
  defense: pokemon.defense,
  speed: pokemon.speed,
  height: pokemon.height,
  weight: pokemon.weight,
  createdInDb: true,
});

// Each Pokemon needs its own sub-request, so the whole list costs POKEMON_LIMIT + 1
// calls to PokeAPI. Cache it instead of paying that on every incoming request.
const getApiPokemon = async () => {
  if (apiCache.data && Date.now() < apiCache.expiresAt) return apiCache.data;

  const { data } = await axios.get(`${POKEAPI_URL}/pokemon?limit=${POKEMON_LIMIT}`);
  const details = await Promise.all(data.results.map((p) => axios.get(p.url)));
  const pokemon = details.map((res) => fromApi(res.data));

  apiCache = { data: pokemon, expiresAt: Date.now() + CACHE_TTL_MS };
  return pokemon;
};

const getDbPokemon = async () => {
  const pokemon = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ['name'],
      through: { attributes: [] },
    },
  });
  return pokemon.map(fromDb);
};

const getAllPokemon = async () => {
  const [apiPokemon, dbPokemon] = await Promise.all([getApiPokemon(), getDbPokemon()]);
  return [...apiPokemon, ...dbPokemon];
};

const searchPokemonByName = async (name) => {
  const query = name.toLowerCase();
  const allPokemon = await getAllPokemon();
  return allPokemon.filter((p) => p.name.toLowerCase().includes(query));
};

// API ids are numbers, database ids are UUIDs.
const isDbId = (id) => Number.isNaN(Number(id));

const getPokemonById = async (id) => {
  if (isDbId(id)) {
    const pokemon = await Pokemon.findByPk(id, {
      include: {
        model: Type,
        attributes: ['name'],
        through: { attributes: [] },
      },
    });
    return pokemon ? fromDb(pokemon) : null;
  }

  try {
    const { data } = await axios.get(`${POKEAPI_URL}/pokemon/${id}`);
    return fromApi(data);
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw error;
  }
};

// PokeAPI is the source of truth on first run; afterwards types are read from our own database.
const getTypes = async () => {
  const storedTypes = await Type.findAll({ attributes: ['name'] });
  if (storedTypes.length) return storedTypes.map((t) => t.name);

  const { data } = await axios.get(`${POKEAPI_URL}/type`);
  const names = data.results
    .map((t) => t.name)
    .filter((name) => !EXCLUDED_TYPES.includes(name));

  await Type.bulkCreate(names.map((name) => ({ name })), { ignoreDuplicates: true });
  return names;
};

const createPokemon = async ({ types = [], ...attributes }) => {
  const pokemon = await Pokemon.create(attributes);

  if (types.length) {
    const typeRecords = await Type.findAll({ where: { name: types } });
    await pokemon.addTypes(typeRecords);
  }

  return getPokemonById(pokemon.id);
};

module.exports = {
  getAllPokemon,
  searchPokemonByName,
  getPokemonById,
  getTypes,
  createPokemon,
};
