import { Link } from 'react-router-dom';
import '../CSS/LandingPage.css'

export default function LandingPage() {
    return (
        <div className='landing'>
            <Link to='/home'>
              <button className='btnIngreso'>Ingresar</button>
            </Link>
        </div>
    )
}