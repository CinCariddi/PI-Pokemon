const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {getAllPokemon, getTypes} = require('../control')
const { Pokemon, Type } = require('../db')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', async (req, res) => {
    try {
        const {name} = req.query;   
        const allPokemon = await getAllPokemon();
            if(name) { 
                const pokemonName = allPokemon.filter((e) => 
                e.name.toLowerCase().includes(name.toLowerCase())
                )
                pokemonName.length
                ? res.json(pokemonName)
                : res.send({msg: 'Pokemon does not exist.'})
            }else{
                res.json(allPokemon)
            }
    } catch(error) {
        console.log(error)
    }
});

router.get("/pokemons/:id", async (req, res) => {
    try {
      const {id} = req.params;
      const allPokemon = await getAllPokemon();
      if (id) {
        const pokemonId = allPokemon.filter((e) => e.id == id);
        pokemonId.length
          ? res.json(pokemonId)
          : res.send({msg: 'Pokemon does not exist.'});
      } else if(id.length > 10) {
          const pokeByDb = await Pokemon.findByPk(id)
          res.json(pokeByDb)
      }
    } catch (error) {
      console.log(error)
      
    }
});

router.get('/types', async (req, res) => {
    try {
        const data = await getTypes();
        data.filter(type => type !== "unknown" && type !== "shadow") 
        // console.log(data)
        res.json(data);
    }catch(error) {
        console.log(error)
    }
});


router.post("/pokemons", async (req, res) => {
    try {
        let { name, image, life, attack, defense, speed, height, weight, types} = req.body
        const newPokemon = await Pokemon.create({
            name,
            image,
            life,
            attack,
            defense,
            speed,
            height,
            weight,
        });
        // console.log(newPokemon)
        if(types.length > 0) {
            for (let i = 0; i < types.length; i++) {
                const pokemonDb = await Type.findOrCreate({
                    where: { name: types[i] }    
                });
                newPokemon.setTypes(pokemonDb[0])
                // console.log(pokemonDb[0])
            }
            res.json(newPokemon)
        }
        } catch (error) {
        console.log(error);
        }
    })

router.post('/types', (req, res) => {
    const { name } = req.body
    
    const newType = Type.create({
        name
    }).then((newType)=>{newType})
    res.json(newType)
})

module.exports = router;
