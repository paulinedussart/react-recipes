// Functions
import React, { useEffect, useState } from 'react';
import LoginForm from './App/LoginForm';
import { Site } from './App/Site';
import { Loader } from './shared/loader';
// images
import Logo from './cookingHome.svg';
// SCSS
import "./App.scss";
import "./style/Landing.scss";
import "./style/CookingLogoHome.scss";
import "./style/Buttons.scss"
import './style/LoginForm.scss';
// API
import { apiFetch } from './functions/api';

export default function App() {
	const [user, setUser] = useState(null); 

	// lancer qqch lorsque notre composant est monté
	useEffect(function () {
		apiFetch("/me")
		.then(user => setUser(user))
		.catch(() => setUser(false))
	}, [])

	if (user == null) {
		return (
			<div className="d-flex justify-content-center mt-5 ">
				<Loader content={"page"}/>
			</div>
		);
	}

	return (user ? <Site/> : 
		<div className="row">
			<div id="connect-part" className="col-4 bg-white">
				<i className="fas fa-cookie-bite p-3 fa-lg"> </i><b id="title-app-bold-black">Flavour</b>	 
				<div id="landing-connect-part" className="d-flex align-content-between flex-column">
					<LoginForm className="align-items-center"	onConnect={setUser}/>
					<div className="text-center mb-1">Dont't have an account yet ? <b className="text-green">Sign Up Here</b></div>
				</div>
			</div>
			<div>
			</div>	
			<div id="bg-orange" className="col-8 d-flex ">
				<img id="logoHome"	src={Logo} alt="website logo" />
			</div>
		</div>
  )
}

