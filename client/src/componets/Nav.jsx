import SearchBar from './SearchBar'
import { Link } from 'react-router-dom';
import '../CSS/Nav.css'


export default function Nav({isLoading, setIsloading}) {
    return (
        <div className='navBar'>
            <div className='nav'>
                <Link to='/' className='boton'>
                    <button className='btn' type="button">
                        Back
                    </button>
                </Link>
                <Link to= '/create' className='boton'>
                    <button className='btn' type="button">
                        Register your Pokemon
                    </button>
                </Link>
            </div>
            <div>
                <SearchBar isLoading={isLoading} setIsloading={setIsloading}/>
            </div>
        </div>
    );
};