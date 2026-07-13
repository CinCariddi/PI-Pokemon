import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getPokemonDetail, clearDetail } from '../actions';
import '../styles/Detail.css';

const HOME_ICON = 'https://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png';
const POKEBALL_ICON = 'https://cdn2.iconfinder.com/data/icons/pokemon-filledoutline/64/pokeball-people-pokemon-nintendo-video-game-gaming-gartoon-ball-512.png';
const LOADING_GIF = 'https://media3.giphy.com/media/jM4bWFBKpSFeo/giphy.gif?cid=ecf05e47wdt669ssocbe43m1uqkpkhfwfcxmyt0wqm0xnxrh&rid=giphy.gif&ct=s';

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pokemon = useSelector((state) => state.detail);

  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setNotFound(false);

    dispatch(getPokemonDetail(id))
      .catch(() => setNotFound(true))
      .finally(() => setIsLoading(false));

    return () => dispatch(clearDetail());
  }, [dispatch, id]);

  return (
    <div className="detail">
      <Link to="/home">
        <button className="home-button" type="button">
          <img src={HOME_ICON} alt="Back to home" width="35px" height="35px" />
        </button>
      </Link>

      {isLoading && <img src={LOADING_GIF} alt="Loading" />}

      {!isLoading && notFound && <p className="detail-text">Pokemon not found.</p>}

      {!isLoading && pokemon && (
        <div className="detail-card">
          <div className="detail-name">
            <p className="detail-text">{pokemon.name}</p>
            <img src={POKEBALL_ICON} alt="" width="50px" height="50px" />
          </div>

          <p className="detail-text">#{pokemon.id}</p>

          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="detail-image"
            height="270px"
            width="270px"
          />

          <div className="detail-row">
            <div className="detail-stat">
              <p className="detail-text">Type</p>
              <p className="type">{pokemon.types.join(' - ')}</p>
            </div>
            <div className="detail-stat">
              <p className="detail-text">Life</p>
              <p className="detail-text">{pokemon.life} HP</p>
            </div>
            <div className="detail-stat">
              <p className="detail-text">Weight</p>
              <p className="detail-text">{pokemon.weight} kg</p>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-stat">
              <p className="detail-text">Height</p>
              <p className="detail-text">{pokemon.height} m</p>
            </div>
            <div className="detail-stat">
              <p className="detail-text">Attack</p>
              <p className="detail-text">{pokemon.attack}</p>
            </div>
            <div className="detail-stat">
              <p className="detail-text">Defense</p>
              <p className="detail-text">{pokemon.defense}</p>
            </div>
            <div className="detail-stat">
              <p className="detail-text">Speed</p>
              <p className="detail-text">{pokemon.speed}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
