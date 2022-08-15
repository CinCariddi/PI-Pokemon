/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon, filterByTypes, filterByCreated, orderByAttack, orderByAlphabet, getTypes } from "../actions";

import Card from "./Card";
import Nav from './Nav'
import Paginado from './Pagination'

import '../CSS/Home.css'

export default function Home() {
    const dispatch = useDispatch() //nos guarda una instancia del dispachador, que tira las acciones al reducer
    const allPokemon = useSelector(state => state.allPokemons) //recibe el estado global y devuelve un objeto con las propiedades que quiero
    const allTypes= useSelector(state => state.types)

    const [/*order*/, setOrder] = useState("");
    const [orderAttack, setOrderByAttack] = useState('Order by attack')
    const [actualPage, setActualPage] = useState(1); //Me guardo en que pagina estoy 
    const [isLoading, setIsloading] = useState(false)
    const [pokemonPerPage, /*setPokemonPerPage*/] = useState(12); // Me guardo cuantos pokemons quiero por página.
    const indexOfLastPokemon = actualPage * pokemonPerPage; // multiplico la pagina actual por la cantidad de pokemons que permito por pagina (12)
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;// resto el orden del ultimo pokemon por la cantidad de pokemon por pagina 
    const currentPokemon = allPokemon ? allPokemon?.slice(
        indexOfFirstPokemon,
        indexOfLastPokemon
    ) : []

    const paginado = (numPage) => {
        setActualPage(numPage);       // seteo la pagina en el numero dado 
    };

    useEffect(() => { //recibe una funcion de callback que hace una determinada accion
        setIsloading(true)
        dispatch(getPokemon()); //dispatchea la accion
        dispatch(getTypes())
    }, [dispatch]); //siempre que se ejecute el componente, se ejecutara la funcion de callback

    useEffect(() => {
        if(allPokemon.length > 0) setIsloading(false)
    }, [JSON.stringify(allPokemon)])

    function handleFilterType(e) {
        dispatch(filterByTypes(e.target.value));
        setActualPage(1)
    }
    
    function handleFilterCreated(e) {
        dispatch(filterByCreated(e.target.value));
        setActualPage(1)
    }

    function handleOrderByAlphabet(e) {
        e.preventDefault();
        dispatch(orderByAlphabet(e.target.value));
        setOrder(`Ordered by ${e.target.value}`);
        setOrderByAttack(`Ordered by Attack`);
    }
    
    function handleOrderByAttack(e) {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value));
        setOrderByAttack(`Ordered by ${e.target.value}`);
    }


    return (
        <div className='container'>
            <div className="div">
                <div className="menu">
                    <div>
                        <Nav isLoading={isLoading} setIsloading={setIsloading}/>
                    </div>
                    <div className="menu2">
                        
                        <select defaultValue='Order Alphabetically!' onChange={(e) => handleOrderByAlphabet(e)} className='boton'>
                            <option value='All' > Order Alphabetically </option>
                            <option value="asc">A - Z ↑</option>
                            <option value="des">Z - A ↓</option>
                        </select>
                        <select defaultValue={orderAttack} onChange={(e) => handleOrderByAttack(e)} className='boton'>
                            <option value='All' > Order By Attack </option>
                            <option value="attack">Attack ↑</option>
                            <option value="low">Attack ↓</option>
                        </select>
                        <select onChange={(e) => handleFilterType(e)} className='boton'>
                            <option value="Types"> Filter by types </option>
                            {
                                allTypes.map(e => (
                                    <option key={e} value={e}>{e}</option>
                                ))
                            }
                        </select>
                        <select onChange={(e) => handleFilterCreated(e)} className='boton'>
                            <option value=''>Filter by ...</option>
                            <option value="All"> All </option>
                            <option value="Created"> Created </option>
                            <option value="Existing"> Existing </option>
                        </select>
                    </div>
                </div>
                <div className="pokemon">
                        { !isLoading ?currentPokemon.length > 0 && currentPokemon.map(e =>
                            <div key={e.id}>
                                <Card id= {e.id} name={e?.name} image={e?.image} types={e?.types}/>
                            </div>
                        )
                        : <img className='loading' src="https://media3.giphy.com/media/jM4bWFBKpSFeo/giphy.gif?cid=ecf05e47wdt669ssocbe43m1uqkpkhfwfcxmyt0wqm0xnxrh&rid=giphy.gif&ct=s" height='100vh' alt="loading"/>
                        }
                </div>
            </div>
            <Paginado
                    pokemonPerPage = {pokemonPerPage}
                    allPokemon = {allPokemon.length}
                    paginado = {paginado}
            />
        </div>
    )
}