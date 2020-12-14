import React from 'react';
import PropTypes from 'prop-types';

export function RecipeDetails({recipe}) {
	return(
		<div>{recipe.title}</div>		
	)
}

RecipeDetails.propTypes = {
	recipe: PropTypes.object.isRequired
}