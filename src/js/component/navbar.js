import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [isDropdownOpen, setDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setDropdownOpen(!isDropdownOpen);
	};

	return (
		<nav className="navbar  mb-3 px-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">Star Wars</span>
			</Link>
			<Link to="/characters">
				<span className="navbar-brand mb-0 h1">Characters</span>
			</Link>
			<Link to="/vehicles">
				<span className="navbar-brand mb-0 h1">Vehicles</span>
			</Link>
			<Link to="/planets">
				<span className="navbar-brand mb-0 h1">Planets</span>
			</Link>

			<div className="ml-auto">
				<div className="dropdown">
					<button 
						className="btn btn-primary dropdown-toggle" 
						type="button" 
						onClick={toggleDropdown}
					>
						Favorites ({store.favoriteList.length})
					</button>

					<ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
						{store.favoriteList.length > 0 ? (
							store.favoriteList.map((fav, index) => (
								<li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
									<Link to={fav.url} className="text-decoration-none text-dark">
										{fav.title}
									</Link>
									<button 
										className="btn btn-sm btn-danger ms-2" 
										onClick={() => actions.removeFromFavorites(fav.url)}
									>
										<i className="fas fa-trash"></i>
									</button>
								</li>
							))
						) : (
							<li className="dropdown-item">No favorites added</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};
