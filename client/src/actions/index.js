import api from '../api/client';
import {
  GET_POKEMON,
  GET_TYPES,
  SEARCH_BY_NAME,
  GET_POKEMON_DETAIL,
  CLEAR_DETAIL,
  FILTER_BY_TYPE,
  FILTER_BY_ORIGIN,
  SORT_BY_NAME,
  SORT_BY_ATTACK,
} from './actionTypes';

export const getPokemon = () => async (dispatch) => {
  const { data } = await api.get('/pokemons');
  dispatch({ type: GET_POKEMON, payload: data });
};

export const getTypes = () => async (dispatch) => {
  const { data } = await api.get('/types');
  dispatch({ type: GET_TYPES, payload: data });
};

export const searchPokemonByName = (name) => async (dispatch) => {
  try {
    const { data } = await api.get('/pokemons', { params: { name } });
    dispatch({ type: SEARCH_BY_NAME, payload: data });
  } catch (error) {
    // The API answers 404 when nothing matches, which is a valid empty result here.
    if (error.response?.status === 404) {
      dispatch({ type: SEARCH_BY_NAME, payload: [] });
      return;
    }
    throw error;
  }
};

export const getPokemonDetail = (id) => async (dispatch) => {
  const { data } = await api.get(`/pokemons/${id}`);
  dispatch({ type: GET_POKEMON_DETAIL, payload: data });
};

export const createPokemon = (pokemon) => async () => {
  const { data } = await api.post('/pokemons', pokemon);
  return data;
};

export const clearDetail = () => ({ type: CLEAR_DETAIL });

export const filterByType = (type) => ({ type: FILTER_BY_TYPE, payload: type });

export const filterByOrigin = (origin) => ({ type: FILTER_BY_ORIGIN, payload: origin });

export const sortByName = (order) => ({ type: SORT_BY_NAME, payload: order });

export const sortByAttack = (order) => ({ type: SORT_BY_ATTACK, payload: order });
