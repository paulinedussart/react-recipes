// Functions 
import React, { useState } from 'react';
import PropTypes from 'prop-types'; // ES6
import { ApiError, apiFetch } from '../functions/api';

export default function LoginForm ({onConnect}) {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e) => {
		setError(null)
		setLoading(true)
		e.preventDefault()
		// allows to easily build a set of key/value pairs representing the form fields and their values
		const data = new FormData(e.target)
		try {
			const user = await apiFetch("/login", {
				method: "POST",
				body: data
			})
			console.log(user);
			// will create a state change and refresh App
			onConnect(user)
		} catch (error) {
			if (error instanceof ApiError) {
				setError(error.errors[0].message)
			} else {
				console.log(error);
			}
		}
	}

	return (
		<form id="login-form" onSubmit={handleSubmit}>
			<h2 className="mb-4">Sign In</h2>
			{error && <Alert>{error}</Alert>}
			<div className="form-group">
				<label htmlFor="email">Username</label>
				<input type="text" name="email" id="email" placeholder='user' className="form-control" required/>
			</div>
			<div className="form-group">
				<label htmlFor="password">Password</label>
				<input type="password" name="password" placeholder="******" id="password" className="form-control" required/>
			</div>
			<div className="form-check">
				<input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
				<label className="form-check-label" for="defaultCheck1">
					Remember me
			  </label>
			</div>
			<button disabled={loading} type='submit' className="btn btn-green w-100 mt-3">Sign in</button>
			<a href="/www.paulinedussart.com/" id="forgot-password" className="d-flex justify-content-center mt-1"><b>Forgot password ?</b></a>	
		</form>
	)
}

// get a first small validation to make sure that there is no particular problem for the moment
LoginForm.propTypes = {
	onConnect: PropTypes.func.isRequired
}

function Alert ({ children }) {
	return (
		<div className="alert alert-danger"><i className="fas fa-exclamation-triangle mr-2"></i>{children}</div>
	)
}