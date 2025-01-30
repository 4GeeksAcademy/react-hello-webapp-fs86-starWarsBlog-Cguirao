import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import  Home  from "./views/home";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import '../styles/index.css';
import Character from "./views/character";
import CharacterDetail from './views/characterDetail'
import Vehicle from './views/vehicle'
import VehicleDetail from "./views/vehicleDetail";
import Planet from "./views/planet";
import PlanetDetail from "./views/planetDetail";

const Layout = () => {
	const basename = process.env.BASENAME || "";

	return (
		<div className="body">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/characters" element={<Character />} />
						<Route path="/character/:id" element={<CharacterDetail />} />
						<Route path="/vehicles" element={<Vehicle />} />
						<Route path="/vehicle/:id" element={<VehicleDetail />} />
						<Route path="/planets" element={<Planet />} />
						<Route path="/planet/:id" element={<PlanetDetail />} />
						<Route path="/favorites" element={<Planet />} />
						<Route path="/favorite/:id" element={<PlanetDetail />} />
						{/* <Route path="/demo" element={<Demo />} />
						<Route path="/single/:theid" element={<Single />} /> */}
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
					{/* <Footer /> */}
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
