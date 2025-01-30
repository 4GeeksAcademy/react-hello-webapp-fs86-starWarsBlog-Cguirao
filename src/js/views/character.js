import React, { useState, useEffect, useContext } from "react";
import '../../styles/character.css';
import { Context } from '../store/appContext';
import Card from "../component/card";

const Character = () => {
  const [isLoadingCharacters, setLoadingCharacters] = useState(false);
  const [characters, setCharacters] = useState([]);  
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage] = useState(10);
  const [pageNumbers, setPageNumbers] = useState([]);
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.characterList.length === 0) {
      setLoadingCharacters(true);
      actions.getCharacterList().then(() => {
        const totalPages = Math.ceil(store.characterList.length / charactersPerPage);
        const pageNumbersArray = Array.from({ length: totalPages }, (_, index) => index + 1);
        setPageNumbers(pageNumbersArray);

        setLoadingCharacters(false);
      }).catch(error => {
        console.error('Error fetching character list:', error);
        setLoadingCharacters(false);  
      });
    }
  }, [store.characterList.length, actions]);

  useEffect(() => {
    if (store.characterList.length > 0) {
      showCharacter(currentPage); 
    }
  }, [currentPage, store.characterList]);

  const showCharacter = (page) => {
    const indexOfLastCharacter = page * charactersPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
    const currentCharacters = store.characterList.slice(indexOfFirstCharacter, indexOfLastCharacter);
    setCharacters(currentCharacters); 
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="starwars-blog">
      <div className="pagination">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`page-button ${number === currentPage ? 'active' : ''}`}
          >
            {number}
          </button>
        ))}
      </div>

      <div className="starwars-blog__characters">
        <div className="character-cards">
          {isLoadingCharacters ? (
            <p>Cargando personajes...</p>
          ) : characters.length > 0 ? (
            characters.map((character, index) => (
              <Card
                key={index}
                title={character.name}
                image={`${character.url}.jpg` || 'https://via.placeholder.com/150'}
                details={[
                  `Altura: ${character.height} cm`,
                  `Peso: ${character.mass} kg`,
                  `Género: ${character.gender}`,
                ]}
                url={`/character/${character.url.split('/').filter(Boolean).pop()}`}
              />
            ))
          ) : (
            <p>No se encontraron personajes.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Character;
