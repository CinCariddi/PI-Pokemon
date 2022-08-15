import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getTypes, postPokemon } from '../actions/index'
import {Link} from 'react-router-dom'
import '../CSS/PokemonCreate.css'
import swal from 'sweetalert'


function validate(pokemon, oldErrors){
    let errors = oldErrors;
    if(pokemon.life < 0 || pokemon.life > 100) {
        if(pokemon.life < 0){
            errors.life = 'La vida debe ser mayor a cero'
        }
        if(pokemon.life > 100){
            errors.life = 'La vida debe ser menor a 100'
        }
    }else {
        errors.life = ''
    }
    if (pokemon.types.length < 1){
        errors.types = 'Se requieren al menos un tipo de pokemon';
    } else {
        errors.types = '';
    }
    return errors
}


export default function PokemonCreate() {

    const stateTypes = useSelector(state => state.types)
    // console.log(stateTypes)
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({life: '', types:''})

    const [pokemon, setPokemon] = useState({ //creo un estado para guardar los datos del formulario
        name: "",
        image: "",
        life: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: [],
    });

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])


    const handleChange = (e) => {
        setPokemon({
            ...pokemon,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...pokemon,
            [e.target.name]: e.target.value
        }, errors)
        )
    }


    const handleSelect = (e) => {
        setPokemon({
            ...pokemon,
            types: [...pokemon.types, e.target.value]
        })
        setErrors(validate({
            ...pokemon,
            types: [...pokemon.types, e.target.value]
        }, errors)
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(validate({
            ...pokemon,
            [e.target.name] : e.target.value
        }, errors))
        if(errors.life === '' && errors.types === ''){
            const newPokemon = {
                name: pokemon.name,
                image: pokemon.image,
                life: pokemon.life,
                attack: pokemon.attack,
                defense: pokemon.defense,
                speed: pokemon.speed,
                height: pokemon.height,
                weight: pokemon.weight,
                types: pokemon.types
            }
            // console.log(newPokemon)
            dispatch(postPokemon(newPokemon))
            swal({
                title: 'New pokemon in your Pokedex!',
                icon: 'success',
                button: 'Ok.',
              });
            // alert('New pokemon in your Pokedex!')
            setPokemon({
                name: "",
                image: "",
                life: 0,
                attack: 0,
                defense: 0,
                speed: 0,
                height: 0,
                weight: 0,
                types: [],
            })
        } else {
            swal({
                title: 'Incomplet',
                icon: 'warning',
                button: 'Ok.',
              });
            // alert('Incomplet!')
        }
    }

    function handleDelete(e) {
        setPokemon({
            ...pokemon,
            types: pokemon.types.filter(type => type !== e)
        })
    }

    return (
        <div className='containerForm'>
            <Link to ='/home' className="btnForm">
                <button className="btnForm">
                <img src='https://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png' alt='img not found' width='35px' height='35px'/>
                </button>
            </Link>
            <p className="tt">Create your Pokemon</p>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="form">
                    <label className='texto'>
                        Name:
                    </label>
                    <input 
                    type='text'
                    name='name' 
                    value={pokemon.name} 
                    onChange={ e => handleChange(e) }
                    className='espacio'
                    />
                    <label className='texto'>
                        Imagen:
                    </label>
                    <input 
                    type='text'
                    name='image' 
                    value={pokemon.image} 
                    onChange={ e => handleChange(e) }
                    className='espacio'
                    />
                    <label className='texto'>
                        Life: 
                    </label>
                    <input 
                    type='number'
                    name='life' 
                    value={pokemon.life} 
                    onChange={ e => handleChange(e) }
                    className='espacio'
                    />
                    <p className="errors">{errors.life ? errors.life : ''}</p>
                    <label className='texto'>
                        Attack:
                    </label>
                    <input 
                    type='number'
                    name='attack' 
                    value={pokemon.attack} 
                    onChange={ e => handleChange(e) }
                    className='espacio'
                    />
                    <label className='texto'>
                        Defense:
                    </label>
                    <input 
                    type='number'
                    name='defense' 
                    value={pokemon.defense} 
                    onChange={ e => handleChange(e) }
                    className='espacio'
                    />
                    <label className='texto'>
                        Speed:
                    </label>
                    <input 
                    type='number'
                    name='speed' 
                    value={pokemon.speed} 
                    onChange={ e => handleChange(e) }
                    className='espacio'
                    />
                    <label className='texto'>
                        Height:
                    </label>
                    <input 
                    type='number'
                    name='height' 
                    value={pokemon.height} 
                    onChange={ e => handleChange(e) }
                    className='espacio'
                    />
                    <label className='texto'> 
                        Weight:
                    </label>
                    <input 
                    type='number'
                    name='weight' 
                    value={pokemon.weight} 
                    onChange={ e => handleChange(e) }
                    className='espacio'
                    />
                    <label className='texto'>
                        Types:
                    </label>
                    <select name='types' onChange={ e => handleSelect(e) } className='espacio'> 
                        {stateTypes?.map(e => 
                            <option key={e} value={e}>{e}</option>
                        )}
                    </select>
                    <p className="errors">{errors.types ? errors.types : ''}</p>
                    <ul className="lista">
                        { pokemon.types.length > 0 && pokemon.types?.map((e) => (
                            <div key={e} className="x">
                                <div className="posicionX">
                                    <button type="button" className="botonx" onClick={() => handleDelete(e)}>X</button>
                                </div>
                                {e}
                            </div>
                        ))}
                    </ul>
                </div>
                <button type='submit' className="boton3">Create</button>
            </form>
        </div>
    );
}
