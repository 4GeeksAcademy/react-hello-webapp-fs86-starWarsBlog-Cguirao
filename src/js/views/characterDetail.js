import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from '../store/appContext';
import '../../styles/characterDetail.css';

const CharacterDetail = () => {
  const { id } = useParams(); 
  const [character, setCharacter] = useState(null);
  const [films, setFilms] = useState([]);
  const {store, actions} = useContext(Context);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const characterDetail = await actions.getCharacterById(id);
        setCharacter(characterDetail);
        console.log("Detalles: ", characterDetail);

        if (characterDetail.films && characterDetail.films.length > 0) {
          const filmNames = await actions.getFilmsOfCharacter(characterDetail.films)
          setFilms(filmNames);
        }
      } catch (error) {
        console.error("Error al cargar los detalles del personaje", error);
      }
    };

    fetchCharacter();
  }, [id, actions]);

  if (!character) {
    return <p>Cargando detalles...</p>;
  }

  const hasAdditionalDetails =
    (character.films && character.films.length > 0);

  return (
    <div className="character-detail">
      <div className="character-detail__principal">
        <div className="character-detail__img">
          <h1>Aqui va la imagen (No he encontrado las imágenes)</h1>
        </div>
        <div className="details"> 
          {character.name && <h1><strong>Name: </strong> {character.name}</h1>}
          <br />
          {character.height && <h2><strong>Height: </strong>{character.height}</h2>}
          {character.mass && <h2><strong>Mass: </strong>{character.mass}</h2>}
          {character.hair_color && <h2><strong>Hair: </strong>{character.hair_color}</h2>}
          {character.skin_color && <h2><strong>Skin: </strong>{character.skin_color}</h2>}
          {character.eye_color && <h2><strong>Eyes: </strong>{character.eye_color}</h2>}
          {character.birth_year && <h2><strong>Birth: </strong>{character.birth_year}</h2>}
          {character.gender && <h2><strong>Gender: </strong>{character.gender}</h2>}
        </div>
      </div>

   
      {hasAdditionalDetails && (
        <div className="detail-others">
          {films && films.length > 0 && (
            <div className="detail-others__films">
              <h1>Peliculas</h1>
              <ul>
                {films.map((film, index) => (
                  <li key={index}>{film}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CharacterDetail;
