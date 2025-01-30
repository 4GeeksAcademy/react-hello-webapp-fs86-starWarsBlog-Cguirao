import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from '../store/appContext';
import '../../styles/planetDetail.css';

const PlanetDetail = () => {
  const { id } = useParams(); 
  const [planet, setPlanet] = useState(null);
  const [films, setFilms] = useState([]);  // Nuevo estado para películas
  const { store, actions } = useContext(Context);

  useEffect(() => {
    const fetchPlanet = async () => {
      try {
        const planetDetail = await actions.getPlanetById(id);
        setPlanet(planetDetail);
        console.log("Detalles: ", planetDetail);

        if (planetDetail.films && planetDetail.films.length > 0) {
          const filmNames = await actions.getFilmsOfPlanet(planetDetail.films);
          setFilms(filmNames);
        }
      } catch (error) {
        console.error("Error al cargar los detalles del planeta", error);
      }
    };

    fetchPlanet();
  }, [id, actions]);

  if (!planet) {
    return <p>Cargando detalles...</p>;
  }

  const hasAdditionalDetails = (films.length > 0);

  return (
    <div className="planet-detail">
      <div className="planet-detail__principal">
        <div className="planet-detail__img">
          <h1>Aqui va la imagen (No he encontrado las imágenes)</h1>
        </div>
        <div className="details"> 
          {planet.name && <h1><strong>Name: </strong> {planet.name}</h1>}
          <br />
          {planet.diameter && <h2><strong>Diameter: </strong>{planet.diameter}</h2>}
          {planet.climate && <h2><strong>Climate: </strong>{planet.climate}</h2>}
          {planet.gravity && <h2><strong>Gravity: </strong>{planet.gravity}</h2>}
          {planet.terrain && <h2><strong>Terrain: </strong>{planet.terrain}</h2>}
          {planet.population && <h2><strong>Population: </strong>{planet.population}</h2>}
        </div>
      </div>

      {hasAdditionalDetails && (
        <div className="detail-others">
          {films.length > 0 && (
            <div className="detail-others__films">
              <h1>Películas</h1>
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

export default PlanetDetail;
