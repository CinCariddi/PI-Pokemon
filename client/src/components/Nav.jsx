import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../styles/Nav.css';

export default function Nav({ onSearch }) {
  return (
    <div className="navbar">
      <div className="nav-links">
        <Link to="/" className="control">
          <button className="nav-button" type="button">Back</button>
        </Link>
        <Link to="/create" className="control">
          <button className="nav-button" type="button">Register your Pokemon</button>
        </Link>
      </div>
      <SearchBar onSearch={onSearch} />
    </div>
  );
}
