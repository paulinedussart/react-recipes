import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../../shared/Modal'
import { Loader } from '../../shared/Loader';

export function RecipeDetails({recipe}) {
	return(
		<Modal title={recipe.title} onClose={(() => null)}>
			{recipe.content ? <Instruction recipe={recipe} /> : <Loader content={recipe.title}/>}
		</Modal>		
	)
}


function Instruction({ recipe }) {
	const htmlContent = { __html: recipe.content.split('\r\n').join('<br/>') };
	return (
		<div>
			<h6><i className="fas fa-utensils pr-2"> </i>Preparation : 5 min</h6>
			<h6><i className="fas fa-fire pr-2"></i>Cooking : 4 min</h6>
			<div className="my-3" dangerouslySetInnerHTML={htmlContent}></div>
			<h6><i class="fas fa-apple-alt pr-2"></i>Ingredients :</h6>
			{recipe.ingredients.map(i => <AllIngredients ingredient={i} />)}
		</div>
	)
}

function AllIngredients({ingredient}) {
	return (
		<div>
			
			
			{ingredient.title} ({ingredient.quantity}
			{ingredient.unit ? <span className="pl-1">{ingredient.unit}</span> : ""})
		</div>	

	)
}



RecipeDetails.propTypes = {
	recipe: PropTypes.object.isRequired
}