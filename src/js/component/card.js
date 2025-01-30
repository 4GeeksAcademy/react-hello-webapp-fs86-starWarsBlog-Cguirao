import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/card.css';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';

const Card = ({ title, image, details, url }) => {
  const { store, actions } = useContext(Context);

  const isFavorite = store.favoriteList.some(fav => fav.url === url);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      actions.removeFromFavorites(url);
    } else {
      actions.addToFavorites({ title, image, details, url });
    }
  };

  return (
    <div className="card" style={{ width: '18rem', margin: '1rem auto' }}>
      {image && (
        <img
          src={image}
          className="card-img-top"
          alt={title || 'Imagen'}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <ul className="list-group list-group-flush">
          {details.map((detail, index) => (
            <li key={index} className="list-group-item">
              {detail}
            </li>
          ))}
        </ul>
      </div>
      <div className="card-buttons">
        <Link to={url} className="learn-more">Learn more!</Link>
        <button className="btn-favorite" onClick={handleFavoriteClick}>
          <i className={isFavorite ? "fas fa-heart text-danger" : "far fa-heart"}></i>
        </button>
      </div>
    </div>
  );
};

export default Card;
