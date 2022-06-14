import { Link } from 'react-router-dom';
import '../CSS/Card.css'

export default function Card({name, image, types, id}){
    return (
        <div className='card'>
            <div>
                <Link to={'/home/' + id}>
                    <img src={image} alt='img not found' height='200px' width='200px' className='img'/>
                </Link>
                <div className='info'>
                    <p className='name'>{name}</p>
                    {
                        types.length === 2 ? (
                            <div className='type'>
                                <div>{types[0]?.name ? types[0].name + ' - ' : types[0] + ' - '}</div>
                                <div>{types[1]?.name ? types[1].name : ' ' + types[1]}</div>
                            </div>
                        ) : (
                            <div className='type'>
                                <p>{types[0]?.name ? types[0].name : types[0]}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
