import { useEffect, useState } from "react";
import '../CSS/Pagination.css'

export default function Paginado({pokemonPerPage, allPokemon, paginado}) {
    const [pageNumber, setPageNumber] = useState([]);

    useEffect(() => {
        const pageNumbers = [];
        for(let i = 0; i < Math.ceil(allPokemon/pokemonPerPage); i++) {
            pageNumbers.push(i+1)
        }
        setPageNumber(pageNumbers)
    }, [allPokemon, pokemonPerPage])

    return (
        <div>
            <ul>
                {
                pageNumber && pageNumber.map(number => (
                    <button onClick={() => paginado(number)} key={`${number}paginado`} className= 'pagination'>{number}</button>
                ))
                }
            </ul>
        </div>
    )
}