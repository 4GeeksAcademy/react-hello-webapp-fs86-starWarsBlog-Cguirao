import React, { useState, useEffect, useContext } from "react";
import '../../styles/planet.css';
import { Context } from '../store/appContext';
import Card from "../component/card";

const planet = () => {
    const [isLoadingPlanet, setLoadingPlanet] = useState(false);
    const [planets, setPlanets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [planetsPerPage] = useState(10);
    const [pageNumbers, setPageNumbers] = useState([]);
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (store.planetList.length === 0) {
            setLoadingPlanet(true);
            actions.getPlanetList().then(() => {
                const totalPages = Math.ceil(store.planetList.length / planetsPerPage);
                const pageNumbersArray = Array.from({ length: totalPages }, (_, index) => index + 1);
                setPageNumbers(pageNumbersArray);

                setLoadingPlanet(false);
            }).catch(error => {
                console.error('Error fetching planet list:', error);
                setLoadingPlanet(false);
            });
        }
    }, [store.planetList.length, actions]);

    useEffect(() => {
        if (store.planetList.length > 0) {
            showPlanet(currentPage);
        }
    }, [currentPage, store.planetList]);

    const showPlanet = (page) => {
        const indexOfLastPlanet = page * planetsPerPage;
        const indexOfFirstPlanet = indexOfLastPlanet - planetsPerPage;
        const currentplanets = store.planetList.slice(indexOfFirstPlanet, indexOfLastPlanet);
        setPlanets(currentplanets);
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

            <div className="starwars-blog__planets">
                <div className="planet-cards">
                    {isLoadingPlanet ? (
                        <p>Cargando planetas...</p>
                    ) : planets.length > 0 ? (
                        planets.map((planet, index) => (
                            <Card
                                key={index}
                                title={planet.name}
                                image={`${planet.url}.jpg` || 'https://via.placeholder.com/150'}
                                details={[
                                    `Diametro: ${planet.diameter} `,
                                    `Clima: ${planet.climate} `,
                                    `Terreno: ${planet.terrain}`,
                                ]}
                                url={`/planet/${planet.url.split('/').filter(Boolean).pop()}`}
                            />
                        ))
                    ) : (
                        <p>No se encontraron planetas.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default planet;
