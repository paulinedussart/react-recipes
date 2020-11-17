import React, { useState } from 'react';
import PropTypes from 'prop-types'; // ES6
import './../CSS/LoginForm.css';
import { ApiError, apiFetch } from '../Functions/api';

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
			<h2 className="mb-5">Sign In</h2>
			{error && <Alert>{error}</Alert>}
			<div className="form-group">
				<label htmlFor="email">Username</label>
				<input type="text" name="email" id="email" placeholder='gatsby16' className="form-control" required/>
			</div>
			<div className="form-group">
				<label htmlFor="password">Password</label>
				<input type="password" name="password" placeholder="********" id="password" className="form-control" required/>
			</div>
			<button disabled={loading} type='submit' className="btn btn-success">Sign in</button>
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