import React, { useState, useEffect, useContext } from "react";
import '../../styles/vehicle.css';
import { Context } from '../store/appContext';
import Card from "../component/card";

const vehicle = () => {
    const [isLoadingVehicles, setLoadingVehicles] = useState(false);
    const [vehicles, setvehicles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [vehiclesPerPage] = useState(10);
    const [pageNumbers, setPageNumbers] = useState([]);
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (store.vehicleList.length === 0) {
            setLoadingVehicles(true);
            actions.getVehicleList().then(() => {
                const totalPages = Math.ceil(store.vehicleList.length / vehiclesPerPage);
                const pageNumbersArray = Array.from({ length: totalPages }, (_, index) => index + 1);
                setPageNumbers(pageNumbersArray);

                setLoadingVehicles(false);
            }).catch(error => {
                console.error('Error fetching vehicle list:', error);
                setLoadingVehicles(false);
            });
        }
    }, [store.vehicleList.length, actions]);

    useEffect(() => {
        if (store.vehicleList.length > 0) {
            showVehicle(currentPage);
        }
    }, [currentPage, store.vehicleList]);

    const showVehicle = (page) => {
        const indexOfLastVehicle = page * vehiclesPerPage;
        const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
        const currentVehicle = store.vehicleList.slice(indexOfFirstVehicle, indexOfLastVehicle);
        setvehicles(currentVehicle);
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

            <div className="starwars-blog__vehicle">
                <div className="vehicle-cards">
                    {isLoadingVehicles ? (
                        <p>Cargando vehiculos...</p>
                    ) : vehicles.length > 0 ? (
                        vehicles.map((vehicle, index) => (
                            <Card
                                key={index}
                                title={vehicle.name}
                                image={`${vehicle.url}.jpg` || 'https://via.placeholder.com/150'}
                                details={[
                                    `Modelo: ${vehicle.model} `,
                                    `Altura: ${vehicle.length} metros`,
                                    `Capacidad de carga: ${vehicle.cargo_capacity} kg`,                              
                                ]}
                                url={`/vehicle/${vehicle.url.split('/').filter(Boolean).pop()}`}
                            />
                        ))
                    ) : (
                        <p>No se encontraron vehiculos.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default vehicle;
