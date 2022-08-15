/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { useParams} from 'react-router'
import { Link } from 'react-router-dom';
import { getPokemonById, clearDetail } from '../actions';
import '../CSS/Detail.css'


export default function Detail() {
    const dispatch = useDispatch();
    const {id} = useParams()
    const myPokemon = useSelector((state) => state.detail)
    const [isLoading, setIsloading] = useState(false)

    useEffect(() => {
        setIsloading(true)
        dispatch(getPokemonById(id))
        return dispatch(clearDetail())
    }, [dispatch, id])
    
    useEffect(() => {
        if(myPokemon.length > 0) setIsloading(false)
    }, [JSON.stringify(myPokemon)])


    return (
        <div className='detail'>
            <Link to ='/home' className="btnForm">
                <button className="btnForm">
                    <img src='https://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png' alt='img not found' width='35px' height='35px'/>
                </button>
            </Link>
            {
                !isLoading && myPokemon.length > 0 ? (
                    <div className='divDetail'>
                        <div className='nameDetail'>
                            <p className='pD'>{myPokemon?.[0]?.name}</p>
                            <img src='https://cdn2.iconfinder.com/data/icons/pokemon-filledoutline/64/pokeball-people-pokemon-nintendo-video-game-gaming-gartoon-ball-512.png' alt='img not found' width='50px' height='50px'/>
                        </div>
                        <div>
                            <img src={myPokemon?.[0]?.image} alt='img not found' className='img2' height='270px' width='270px'/>
                        </div>
                        <div>
                            <p className='pD'>{myPokemon?.[0]?.life} Ps</p>
                            <img src='https://abeldg.webcindario.com/de_todo_un_poco/barra_grafica_pokemon.png' alt='img not found' width='400px'/>
                        </div>
                        <div>
                                <div className='divD'>
                                    <div className='infoDetail'> 
                                        <p className='pD'>Type</p>
                                        <p className='type'>{myPokemon?.[0]?.types[0].name ? myPokemon?.[0]?.types.map(e => e.name + ' ') : myPokemon?.[0]?.types.map(e => e + ' ')}</p>
                                    </div>
                                    <div className='infoDetail'> 
                                        <p className='pD'>Weight</p>
                                        <p className='pD'>{myPokemon?.[0]?.weight} kg</p>
                                    </div>
                                    <div className='infoDetail'> 
                                        <p className='pD'>Height</p>
                                        <p className='pD'>{myPokemon?.[0]?.height} m</p>
                                    </div>
                                </div>
                                <div className='divD'>
                                    <div className='infoDetail'> 
                                        <p className='pD'>Attack</p>
                                        <p className='pD'>{myPokemon?.[0]?.attack} %</p>
                                    </div>
                                    <div className='infoDetail'> 
                                        <p className='pD'>Defense</p>
                                        <p className='pD'>{myPokemon?.[0]?.defense} %</p>
                                    </div>
                                    <div className='infoDetail'> 
                                        <p className='pD'>Speed</p>
                                        <p className='pD'>{myPokemon?.[0]?.speed} %</p>
                                    </div>
                                </div>
                        </div>
                    </div>
                )
                : <img src="https://media3.giphy.com/media/jM4bWFBKpSFeo/giphy.gif?cid=ecf05e47wdt669ssocbe43m1uqkpkhfwfcxmyt0wqm0xnxrh&rid=giphy.gif&ct=s" alt="Loading"/>
            }
        </div>
    );
}
