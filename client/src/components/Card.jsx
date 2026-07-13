import { Link } from 'react-router-dom';
import '../styles/Card.css';

export default function Card({ id, name, image, types = [] }) {
  return (
    <div className="card">
      <Link to={`/home/${id}`}>
        <img src={image} alt={name} height="200px" width="200px" className="card-image" />
      </Link>
      <div className="card-info">
        <p className="card-name">{name}</p>
        <p className="type">{types.join(' - ')}</p>
      </div>
    </div>
  );
}
