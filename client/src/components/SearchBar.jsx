import { useState } from 'react';
import swal from 'sweetalert';
import '../styles/SearchBar.css';

export default function SearchBar({ onSearch }) {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      swal({
        title: 'Type something to search.',
        icon: 'warning',
        button: 'Ok',
      });
      return;
    }

    onSearch(name.trim());
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
}
