import '../styles/Pagination.css';

export default function Pagination({ pokemonPerPage, totalPokemon, currentPage, onPageChange }) {
  const pageCount = Math.ceil(totalPokemon / pokemonPerPage);
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <ul className="pagination">
      {pages.map((page) => (
        <li key={page}>
          <button
            type="button"
            onClick={() => onPageChange(page)}
            className={`pagination-button${page === currentPage ? ' is-active' : ''}`}
          >
            {page}
          </button>
        </li>
      ))}
    </ul>
  );
}
