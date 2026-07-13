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
} from '../actions/actionTypes';

const initialState = {
  // allPokemon is the untouched list; filteredPokemon is what the Home page renders.
  allPokemon: [],
  filteredPokemon: [],
  detail: null,
  types: [],
};

const byName = (order) => (a, b) => (
  order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
);

const byAttack = (order) => (a, b) => (
  order === 'asc' ? a.attack - b.attack : b.attack - a.attack
);

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMON:
      return {
        ...state,
        allPokemon: action.payload,
        filteredPokemon: action.payload,
      };

    case GET_TYPES:
      return { ...state, types: action.payload };

    case SEARCH_BY_NAME:
      return { ...state, filteredPokemon: action.payload };

    case GET_POKEMON_DETAIL:
      return { ...state, detail: action.payload };

    case CLEAR_DETAIL:
      return { ...state, detail: null };

    case FILTER_BY_TYPE:
      return {
        ...state,
        filteredPokemon: action.payload === 'all'
          ? state.allPokemon
          : state.allPokemon.filter((p) => p.types.includes(action.payload)),
      };

    case FILTER_BY_ORIGIN: {
      if (action.payload === 'all') {
        return { ...state, filteredPokemon: state.allPokemon };
      }
      const createdInDb = action.payload === 'created';
      return {
        ...state,
        filteredPokemon: state.allPokemon.filter((p) => p.createdInDb === createdInDb),
      };
    }

    // Sorting copies the array: mutating state.filteredPokemon in place would stop
    // React from noticing the change.
    case SORT_BY_NAME:
      return {
        ...state,
        filteredPokemon: [...state.filteredPokemon].sort(byName(action.payload)),
      };

    case SORT_BY_ATTACK:
      return {
        ...state,
        filteredPokemon: [...state.filteredPokemon].sort(byAttack(action.payload)),
      };

    default:
      return state;
  }
}
