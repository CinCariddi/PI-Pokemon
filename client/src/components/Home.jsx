import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPokemon,
  getTypes,
  searchPokemonByName,
  filterByType,
  filterByOrigin,
  sortByName,
  sortByAttack,
} from '../actions';
import Card from './Card';
import Nav from './Nav';
import Pagination from './Pagination';
import '../styles/Home.css';

const POKEMON_PER_PAGE = 12;
const LOADING_GIF = 'https://media3.giphy.com/media/jM4bWFBKpSFeo/giphy.gif?cid=ecf05e47wdt669ssocbe43m1uqkpkhfwfcxmyt0wqm0xnxrh&rid=giphy.gif&ct=s';

export default function Home() {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.filteredPokemon);
  const types = useSelector((state) => state.types);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([dispatch(getPokemon()), dispatch(getTypes())])
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const handleSearch = useCallback(async (name) => {
    setIsLoading(true);
    await dispatch(searchPokemonByName(name));
    setCurrentPage(1);
    setIsLoading(false);
  }, [dispatch]);

  // Filtering and sorting reset the pagination: otherwise you can be left standing on a
  // page that no longer exists.
  const handleChange = (actionCreator) => (event) => {
    dispatch(actionCreator(event.target.value));
    setCurrentPage(1);
  };

  const lastIndex = currentPage * POKEMON_PER_PAGE;
  const visiblePokemon = pokemon.slice(lastIndex - POKEMON_PER_PAGE, lastIndex);

  return (
    <div className="home">
      <div className="home-layout">
        <div className="menu">
          <Nav onSearch={handleSearch} />

          <div className="menu-controls">
            <select defaultValue="" onChange={handleChange(sortByName)} className="control">
              <option value="" disabled>Order alphabetically</option>
              <option value="asc">A - Z ↑</option>
              <option value="desc">Z - A ↓</option>
            </select>

            <select defaultValue="" onChange={handleChange(sortByAttack)} className="control">
              <option value="" disabled>Order by attack</option>
              <option value="desc">Attack ↑</option>
              <option value="asc">Attack ↓</option>
            </select>

            <select defaultValue="all" onChange={handleChange(filterByType)} className="control">
              <option value="all">Filter by type</option>
              {types.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select defaultValue="all" onChange={handleChange(filterByOrigin)} className="control">
              <option value="all">All Pokemon</option>
              <option value="created">Created</option>
              <option value="existing">Existing</option>
            </select>
          </div>
        </div>

        <div className="pokemon-grid">
          {isLoading && <img src={LOADING_GIF} height="100vh" alt="Loading" />}

          {!isLoading && !pokemon.length && <p className="type">No Pokemon found.</p>}

          {!isLoading && visiblePokemon.map((p) => (
            <Card key={p.id} id={p.id} name={p.name} image={p.image} types={p.types} />
          ))}
        </div>
      </div>

      <Pagination
        pokemonPerPage={POKEMON_PER_PAGE}
        totalPokemon={pokemon.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
