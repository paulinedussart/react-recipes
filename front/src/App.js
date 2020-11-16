import React, {useState} from 'react';
import LoginForm from './App/LoginForm';

export default function App() {
const [user, setUser] = useState(null); 
  return (user ? <div>Connecté</div> : 
		<div className="connect col-4 bg-white justify-content-center d-flex align-items-center">
			<LoginForm onConnect={setUser}/>
		</div>
  )
}

