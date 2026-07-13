import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { getTypes, createPokemon } from '../actions';
import '../styles/PokemonCreate.css';

const HOME_ICON = 'https://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png';

const EMPTY_FORM = {
  name: '',
  image: '',
  life: 0,
  attack: 0,
  defense: 0,
  speed: 0,
  height: 0,
  weight: 0,
  types: [],
};

const STAT_FIELDS = ['life', 'attack', 'defense', 'speed', 'height', 'weight'];

function validate(pokemon) {
  const errors = {};

  if (!pokemon.name.trim()) {
    errors.name = 'The name is required';
  } else if (/\d/.test(pokemon.name)) {
    errors.name = 'The name cannot contain numbers';
  }

  if (pokemon.life < 1 || pokemon.life > 100) {
    errors.life = 'Life must be between 1 and 100';
  }

  if (!pokemon.types.length) {
    errors.types = 'Pick at least one type';
  }

  return errors;
}

export default function PokemonCreate() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  const [pokemon, setPokemon] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const update = (changes) => {
    const next = { ...pokemon, ...changes };
    setPokemon(next);
    setErrors(validate(next));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    update({ [name]: STAT_FIELDS.includes(name) ? Number(value) : value });
  };

  const handleAddType = (event) => {
    const type = event.target.value;
    if (!type || pokemon.types.includes(type)) return;
    update({ types: [...pokemon.types, type] });
  };

  const handleRemoveType = (type) => {
    update({ types: pokemon.types.filter((t) => t !== type) });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the current values, not the errors left over from the last keystroke.
    const currentErrors = validate(pokemon);
    setErrors(currentErrors);

    if (Object.keys(currentErrors).length) {
      swal({
        title: 'Please complete the form',
        text: Object.values(currentErrors).join('. '),
        icon: 'warning',
        button: 'Ok',
      });
      return;
    }

    try {
      await dispatch(createPokemon(pokemon));
      swal({
        title: 'New Pokemon in your Pokedex!',
        icon: 'success',
        button: 'Ok',
      });
      setPokemon(EMPTY_FORM);
      setErrors({});
    } catch (error) {
      swal({
        title: 'The Pokemon could not be created',
        text: error.response?.data?.error || error.message,
        icon: 'error',
        button: 'Ok',
      });
    }
  };

  return (
    <div className="create-page">
      <Link to="/home">
        <button className="home-button" type="button">
          <img src={HOME_ICON} alt="Back to home" width="35px" height="35px" />
        </button>
      </Link>

      <p className="create-title">Create your Pokemon</p>

      <form onSubmit={handleSubmit}>
        <div className="create-form">
          <label className="create-label" htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={pokemon.name}
            onChange={handleChange}
            className="create-input"
          />
          {errors.name && <p className="form-error">{errors.name}</p>}

          <label className="create-label" htmlFor="image">Image URL:</label>
          <input
            id="image"
            type="text"
            name="image"
            value={pokemon.image}
            onChange={handleChange}
            className="create-input"
          />

          <label className="create-label" htmlFor="life">Life:</label>
          <input
            id="life"
            type="number"
            name="life"
            value={pokemon.life}
            onChange={handleChange}
            className="create-input"
          />
          {errors.life && <p className="form-error">{errors.life}</p>}

          <label className="create-label" htmlFor="attack">Attack:</label>
          <input
            id="attack"
            type="number"
            name="attack"
            value={pokemon.attack}
            onChange={handleChange}
            className="create-input"
          />

          <label className="create-label" htmlFor="defense">Defense:</label>
          <input
            id="defense"
            type="number"
            name="defense"
            value={pokemon.defense}
            onChange={handleChange}
            className="create-input"
          />

          <label className="create-label" htmlFor="speed">Speed:</label>
          <input
            id="speed"
            type="number"
            name="speed"
            value={pokemon.speed}
            onChange={handleChange}
            className="create-input"
          />

          <label className="create-label" htmlFor="height">Height:</label>
          <input
            id="height"
            type="number"
            name="height"
            value={pokemon.height}
            onChange={handleChange}
            className="create-input"
          />

          <label className="create-label" htmlFor="weight">Weight:</label>
          <input
            id="weight"
            type="number"
            name="weight"
            value={pokemon.weight}
            onChange={handleChange}
            className="create-input"
          />

          <label className="create-label" htmlFor="types">Types:</label>
          <select id="types" name="types" value="" onChange={handleAddType} className="create-input">
            <option value="">Select a type</option>
            {types.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.types && <p className="form-error">{errors.types}</p>}

          <ul className="type-list">
            {pokemon.types.map((type) => (
              <li key={type} className="type-tag">
                <div className="type-tag-header">
                  <button
                    type="button"
                    className="type-tag-remove"
                    onClick={() => handleRemoveType(type)}
                  >
                    X
                  </button>
                </div>
                {type}
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" className="create-submit">Create</button>
      </form>
    </div>
  );
}
