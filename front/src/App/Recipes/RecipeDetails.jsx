import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../../shared/Modal'
import { Loader } from '../../shared/Loader';
import { useToggle } from '../../hooks/generic'
import { EditFormRecipe } from './RecipeForm'

export function RecipeDetails({recipe, onClose, onEdit, ingredients, onUpdate}) {
	return(
		<Modal title={recipe.title} onClose={onClose}>
			{recipe.content ? <Instruction
													ingredients={ingredients}
													recipe={recipe}
													onEdit={onEdit}
													onUpdate={onUpdate}
												/> : <Loader content={recipe.title} />}
		</Modal>		
	)
}


function Instruction({ recipe, ingredients, onEdit, onUpdate }) {
	const [editMode, setEditMode] = useToggle(false);

	const htmlContent = { __html: recipe.content.split('\r\n').join('<br/>') };
	const handleSubmit = (data) => {
		onUpdate(recipe, data)
		setEditMode()
	}

	const handleEdit = () => {
		setEditMode()
		onEdit()
	}

	return (editMode ? <EditFormRecipe
		recipe={recipe}
		ingredients={ingredients}
		onUpdate={handleSubmit} /> :
		<div>
			<h6><i className="fas fa-utensils pr-2"> </i>Preparation : 5 min</h6>
			<h6><i className="fas fa-fire pr-2"></i>Cooking : 4 min</h6>
			<div className="my-3" dangerouslySetInnerHTML={htmlContent}></div>
			<h6><i class="fas fa-apple-alt pr-2"></i>Ingredients :</h6>
			{recipe.ingredients.map(i => <ul className="mb-0"><IngredientRow key={i.id} ingredient={i} /></ul>)}
			
			<div className="text-right">
				<button onClick={handleEdit} className=" btn btn-green-valid">Edit</button>
			</div>
		</div>
	)
}

function IngredientRow({ingredient}) {
	return (
		<li>
			{ingredient.title} ({ingredient.quantity}
			{ingredient.unit ? <span className="pl-1">{ingredient.unit}</span> : ""})
		</li>	

	)
}



RecipeDetails.propTypes = {
	recipe: PropTypes.object.isRequired
}