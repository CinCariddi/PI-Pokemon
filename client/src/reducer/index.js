const stateInicial = {
    pokemon: [],
    allPokemons: [],
    detail: [],
    types: [],
}

function rootReducer (state = stateInicial, action) {
    switch(action.type) {
        case 'GET_POKEMON' :
            return {
                ...state,
                pokemon: action.payload,
                allPokemons: action.payload,
            }
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
            }
        case 'GET_BY_NAME':
            return {
                ...state,
                allPokemons: action.payload?.msg ? [] : action.payload,
            }
        case 'GET_BY_ID':
            return {
                ...state,
                detail: action.payload
            }
        case 'FILTER_BY_TYPES':
            const allPokemons = state.pokemon;
            const newData = allPokemons.map(pok => ({...pok, types: pok.types.map(t => t?.name ? t.name : t)}))
            const filterType =
                action.payload === "Types"
                    ? newData
                    : newData.filter((e) => e.types.includes(action.payload))
                return {
                    ...state,
                    allPokemons: filterType,
                };
        case 'FILTER_BY_CREATED':
            const filterCreated =
                action.payload === "Created"
                    ? state.pokemon.filter((e) => typeof e.id === 'string')
                    : state.pokemon.filter((e) => typeof e.id === 'number');
                return {
                    ...state,
                    allPokemons:
                        action.payload === "All" ? state.pokemon : filterCreated,
                };
        case 'ORDER_BY_NAME':  // los ordena alfabeticamente 
            const alphabet = action.payload === "asc"  
                ? state.allPokemons.sort(function (a, b) { // es un sort que los ordena en orden alfabetico
                    if (a.name > b.name) {
                        return 1;
                    }else if (a.name < b.name) {
                        return -1;
                    } else {
                        return 0;
                    }
                })
                : state.allPokemons.sort(function (a, b) {
                    if (a.name < b.name) {
                        return 1;
                    }else if (a.name > b.name) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                return {
                    ...state,
                    allPokemons: alphabet,
                };
        case 'ORDER_BY_ATTACK': // los ordena segun que puntaje tenga cada receta
            let attack = action.payload === "attack"
                ? state.allPokemons.sort(function (a, b) {
                    if (a.attack < b.attack) {
                        return 1;
                    }else if (a.attack > b.attack) {
                        return -1;
                    } else {
                        return 0;
                    }
                })
                : state.allPokemons.sort(function (a, b) {
                    if (a.attack > b.attack) {
                        return 1;
                    }else if (a.attack < b.attack) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                return {
                    ...state,
                    allPokemons: attack,
                };
        case 'CLEAN_DETAIL':
            return {
                ...state,
                detail: [],
            }
        default:
            return state
    }
}

export default rootReducer