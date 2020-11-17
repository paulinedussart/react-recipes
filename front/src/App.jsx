import React, {useEffect, useState} from 'react';
import LoginForm from './App/LoginForm';
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
		//add spiner later
		return (
			<div className="text-center mt-5">
				<div className="spinner-border" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		);
	}

	return (user ? <div>Connecté</div> : 
		<div className="row">
			<div id="connect-part" className="col-4 bg-white">
			<i className="fas fa-cookie-bite p-3 fa-lg"> </i><b id="title-app-bold-black">Pauline's Cooking Corner</b>	 
				<div className="form-login">
					<LoginForm className="align-items-center"	onConnect={setUser}/>
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

