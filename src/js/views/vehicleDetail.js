import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from '../store/appContext';
import '../../styles/vehicleDetail.css';

const VehicleDetail = () => {
  const { id } = useParams(); 
  const [vehicle, setVehicle] = useState(null);
  const [films, setFilms] = useState([]);  // Nuevo estado para películas
  const [pilots, setPilots] = useState([]);  // Nuevo estado para pilotos
  const { store, actions } = useContext(Context);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const vehicleDetail = await actions.getVehicleById(id);
        setVehicle(vehicleDetail);
        console.log("Detalles: ", vehicleDetail);

        if (vehicleDetail.films && vehicleDetail.films.length > 0) {
          const filmNames = await actions.getFilmsOfVehicle(vehicleDetail.films);
          setFilms(filmNames);
        }

        if (vehicleDetail.pilots && vehicleDetail.pilots.length > 0) {
          const pilotNames = await actions.getPilotsOfVehicle(vehicleDetail.pilots); // Suponiendo que existe esta función en actions
          setPilots(pilotNames);
        }
      } catch (error) {
        console.error("Error al cargar los detalles del vehiculo", error);
      }
    };

    fetchVehicle();
  }, [id, actions]);

  if (!vehicle) {
    return <p>Cargando detalles...</p>;
  }

  const hasAdditionalDetails = (films.length > 0) || (pilots.length > 0);

  return (
    <div className="vehicle-detail">
      <div className="vehicle-detail__principal">
        <div className="vehicle-detail__img">
          <h1>Aqui va la imagen (No he encontrado las imágenes)</h1>
        </div>
        <div className="details"> 
          {vehicle.name && <h1><strong>Name: </strong> {vehicle.name}</h1>}
          <br />
          {vehicle.model && <h2><strong>Model: </strong>{vehicle.model}</h2>}
          {vehicle.manufacturer && <h2><strong>Manufacturer: </strong>{vehicle.manufacturer}</h2>}
          {vehicle.cost_in_credits && <h2><strong>Cost in credits: </strong>{vehicle.cost_in_credits}</h2>}
          {vehicle.length && <h2><strong>Length: </strong>{vehicle.length}</h2>}
          {vehicle.max_atmosphering_speed && <h2><strong>Max atmosphering speed: </strong>{vehicle.max_atmosphering_speed}</h2>}
          {vehicle.passengers && <h2><strong>Passengers: </strong>{vehicle.passengers}</h2>}
          {vehicle.vehicle_class && <h2><strong>Vehicle class: </strong>{vehicle.vehicle_class}</h2>}
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
          {pilots.length > 0 && (
            <div className="detail-others__pilots">
              <h1>Pilotos</h1>
              <ul>
                {pilots.map((pilot, index) => (
                  <li key={index}>{pilot}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VehicleDetail;
