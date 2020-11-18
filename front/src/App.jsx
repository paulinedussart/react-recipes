import React, {useEffect, useState} from 'react';
import LoginForm from './App/LoginForm';
import { Site } from './App/Site';
import Logo from './cookingHome.svg';
import "./CSS/Connect.css";
import "./CSS/CookingLogoHome.css";
import { apiFetch } from './Functions/api';

export default function App() {
	const [user, setUser] = useState(null); 

	// lancer qqch lorsque notre composant est monté
	// 
	useEffect(function () {
		apiFetch("/me")
		.then(user => setUser(user))
		.catch(() => setUser(false))
	}, [])

	if (user == null) {
		return (
			<div className="text-center mt-5">
				<div className="spinner-border" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		);
	}

	return (user ? <Site/> : 
		<div className="row">
			<div id="connect-part" className="col-4 bg-white">
				<i className="fas fa-cookie-bite p-3 fa-lg"> </i><b id="title-app-bold-black">Flavour</b>	 
				<div className="form-login d-flex align-content-between flex-column">
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

