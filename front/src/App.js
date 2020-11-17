import React, {useState} from 'react';
import LoginForm from './App/LoginForm';
import Logo from './cookingHome.svg';
import "./CSS/Connect.css"
import "./CSS/CookingLogoHome.css"

export default function App() {
const [user, setUser] = useState(null); 
	return (user ? <div>Connecté</div> : 
		<div className="row">
			<div id="connect-part" className="col-4 bg-white">
			<i class="fas fa-cookie-bite p-3 fa-lg"> </i><b id="title-app-bold-black">Pauline's Cooking Corner</b>	 
				<div className="form-login">
					<LoginForm className="align-items-center"	onConnect={setUser}/>
				</div>	
			</div>
			<div>
			</div>	
			<div className="col-8 d-flex">
				<img id="logoHome"	src={Logo} alt="website logo" />
			</div>
		</div>
  )
}

