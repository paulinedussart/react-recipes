// Functions
import React from 'react'
import PropTypes from 'prop-types';
import { Loader } from '../../shared/loader';

export function Ingredients({ ingredients, onDelete, onUpdate }) {
	return (
		<div>
			<h2>My Ingredients</h2>
			{ingredients === null ?
				<span className="d-flex justify-content-center mt-5">
					<Loader content={"ingredients"} />
				</span> :
				// JSON.stringify(ingredients)}
				<IngredientsList ingredients={ingredients} onDelete={onDelete} onUpdate={onUpdate} />}
		</div>
	)
}


function IngredientsList({ ingredients, onDelete, onUpdate }) {
	return (
		<div>
			{ingredients.map(ingredient => <Ingredient key={ingredient.id} onDelete={onDelete} onUpdate={onUpdate} ingredient={ingredient}/>)}
		</div>
	)
}

function Ingredient({ ingredient, onDelete, onUpdate }) {
	const handleDelete = (e) => {
		e.preventDefault()
		onDelete(ingredient)
	}
	return (
		<form className="form-inline">
			<input type="text" className="form-control m-1" defaultValue={ingredient.title} name="ingredients" />
			<input type="text" className="form-control m-1" defaultValue={ingredient.unit} name="unit" />
			<i class="btn-blue-update fas fa-save mx-2"></i>
			<i onClick={handleDelete} class="btn-red-delete fas fa-trash mx-2"></i>
		</form>
	)
}

Ingredients.propTypes = {
	ingredients: PropTypes.array
}