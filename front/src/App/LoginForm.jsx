import React from 'react';
import PropTypes from 'prop-types'; // ES6
import './../CSS/LoginForm.css';

export default function LoginForm () {
	return (
		<form id="login-form">
			<h2 className="mb-5">Sign In</h2>
			<div className="form-group">
				<label htmlFor="username">Username</label>
				<input type="text" name="username" id="username" placeholder='gatsby16' className="form-control"/>
			</div>
			<div className="form-group">
				<label htmlFor="password">Password</label>
				<input type="text" name="password" placeholder="********" id="password" className="form-control"/>
			</div>
			<button type='submit' className="btn btn-success">Sign in</button>
		</form>
	)
}

// get a first small validation to make sure that there is no particular problem for the moment
LoginForm.propTypes = {
	onConnect: PropTypes.func.isRequired
}