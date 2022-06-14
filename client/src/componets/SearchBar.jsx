/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonByName } from "../actions";
import '../CSS/SearchBar.css'

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
        setIsloading(true)
        dispatch(getPokemonByName(name))
    }

    useEffect(() => {
        if(allPokemon.length > 0) setIsloading(false)
    }, [JSON.stringify(allPokemon)])

    return (
        <div className="botOn">
            <input
                type="text"
                placeholder="Search..."
                onChange={e => handleInputChange(e)}
                className='text'
            />
            <button type="submit" onClick={(e) => handleSubmit(e)} className='btnSearch'>Search</button>
        </div>
    );
}