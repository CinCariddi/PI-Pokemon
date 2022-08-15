/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonByName } from "../actions";
import '../CSS/SearchBar.css'
import swal from 'sweetalert'

export default function SearchBar({isLoading, setIsloading}) {
    const dispatch = useDispatch()
    const [name, setName] = useState("");
    const allPokemon = useSelector(state => state.allPokemons)

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        try {
            if (name.length) {
                setIsloading(true)
                dispatch(getPokemonByName(name))
            } else {
              // alert('Debe escribir algo para buscar.');
              swal({
                title: 'Debe escribir algo para buscar...',
                icon: 'warning',
                button: 'Ok.',
              });
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    useEffect(() => {
        if(allPokemon.length > 0) setIsloading(false)
    }, [JSON.stringify(allPokemon)])


    return (
        <div className="botOn">
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={e => handleInputChange(e)}
                    className='text'
                />
            </div>
            <div>
                <button type="submit" onClick={(e) => handleSubmit(e)} className='btnSearch'>Search</button>
            </div>
        </div>
    );
}