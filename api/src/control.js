const axios = require('axios'); 
const { Pokemon, Type } = require('./db');

const URL_POKEMON = "https://pokeapi.co/api/v2/pokemon?limit=40"
const URL_TYPE = "https://pokeapi.co/api/v2/type";


const getApiInfo = async () => {
    try {
        const apiPokemon = await axios.get(URL_POKEMON);
        const apiUrl = apiPokemon.data.results.map(obj => axios.get(obj.url));
        const infoPokemon = await axios.all(apiUrl)
        
        let data = infoPokemon.map(obj => obj.data);  //obtengo la data de cada pokemon por su suburl
        let infoPokemons = data.map(pokemon => {
            return {
                id: pokemon.id,
                name: pokemon.name,
                types: pokemon.types.map((t) => t.type.name),
                image: pokemon.sprites.front_default,
                life: pokemon.stats[0].base_stat,
                attack: pokemon.stats[1].base_stat,
                defense: pokemon.stats[2].base_stat,
                speed: pokemon.stats[3].base_stat,
                height: pokemon.height,
                weight: pokemon.weight,
            }
        })
        // console.log(infoPokemons)
        return infoPokemons
    } catch(error) {
        console.log(error);
    }
}


const getDbInfo = async () => {
    try {
        return await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ['name'],
                through:{
                    attributes: [],
                }
            }
        })
    }catch(error) {
        console.log(error)
    }
}

const getAllPokemon = async () => {
    try{
        const apiInfo = await getApiInfo();
        const dbInfo = await getDbInfo();
        const allInfo = [...apiInfo,...dbInfo]
        return allInfo;
    }catch(error) {
        console.log(error)
    }
}

const getTypes = async() => {
    const typeApi = await axios.get(URL_TYPE)
    const createTypes = typeApi.data.results.map(type => (type.name));
    // console.log(createTypes)
    const typesDB = [...new Set(createTypes.flat())] 
    typesDB.forEach(e => {                           
        Type.findOrCreate({
            where: {
                name: e
            }
        })
    })
    // typesDB = await Type.findAll();
    // console.log(typesDB)
    return typesDB
}


module.exports = {
    getAllPokemon,
    getTypes
}
