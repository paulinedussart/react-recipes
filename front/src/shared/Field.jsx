import React from 'react';
import PropTypes from 'prop-types';

export const Field = ({name, children, type = "text", error, ...props}) => {
	return (
		<div className="p-2">
			{/* here children are used for the labelfield */}
			<input type={type} name={name} id={name} className={`form-control ${error ? 'is-invalid' : ''}`} {...props}/>
			{error && <div className="invalid-feedback mt-0">{error}</div>}
		</div>
	);
} 

Field.propTypes = {
	name: PropTypes.string, 
	children: PropTypes.node,
	type: PropTypes.string,
	error: PropTypes.string
}