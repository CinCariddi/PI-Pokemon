import axios from 'axios'

const GET_POKEMON = 'GET_POKEMON'
const GET_TYPES = 'GET_TYPES'
const GET_BY_NAME = 'GET_BY_NAME'
const GET_BY_ID = 'GET_BY_ID'
const FILTER_BY_TYPES = 'FILTER_BY_TYPES'
const FILTER_BY_CREATED = 'FILTER_BY_CREATED'
const ORDER_BY_ATTACK = 'ORDER_BY_ATTACK'
const ORDER_BY_NAME = 'ORDER_BY_NAME'
const CLEAN_DETAIL = 'CLEAN_DETAIL'


export function getPokemon(){
    return async function(dispatch){
        try {
            const json = await axios.get('https://pokeapi1.herokuapp.com/pokemons')
            return dispatch({
                type: GET_POKEMON,
                payload: json.data
            })
        }catch(error) {
            console.log(error)
        }
    }
}

export function getTypes() {
    return async function(dispatch) {
        const jsonType = await axios.get('https://pokeapi1.herokuapp.com/types')
        dispatch({
            type:GET_TYPES,
            payload: jsonType.data
        })
    }
}

export function getPokemonByName(name) {
    return async function(dispatch){
        const jsonName = await axios.get(`http://pokeapi1.herokuapp.com/pokemons?name=${name}`)
        dispatch({
            type: GET_BY_NAME,
            payload:jsonName.data
        })
    }
}

export function getPokemonById(id){
    return async function(dispatch){
        const jsonId = await axios.get(`http://pokeapi1.herokuapp.com/pokemons/${id}`)
        dispatch({
            type: GET_BY_ID,
            payload:jsonId.data
        })
    }
}

export function postPokemon(payload){
    return async function(){
        const json = await axios.post('https://pokeapi1.herokuapp.com/pokemons', payload)
        return json
    }
}

export function filterByCreated(payload) {
    return {
        type: FILTER_BY_CREATED,
        payload
    };
}
  
 export function filterByTypes(payload){
    return {
        type: FILTER_BY_TYPES,
        payload
    }
}

export function orderByAlphabet(payload){
    return({
        type: ORDER_BY_NAME,
        payload
    })
}

export function orderByAttack(payload){
    return({
        type: ORDER_BY_ATTACK,
        payload
    })
}

export function clearDetail(){
    return {
        type: CLEAN_DETAIL
    }
}