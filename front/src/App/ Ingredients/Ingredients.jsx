// Functions
import React from 'react'
import PropTypes from 'prop-types';
import { Loader } from '../../shared/loader';

export function Ingredients({ ingredients, onDelete }) {
	return (
		<div>
			<h2>My Ingredients</h2>
			{ingredients === null ?
				<span className="d-flex justify-content-center mt-5">
					<Loader content={"ingredients"} />
				</span> :
				// JSON.stringify(ingredients)}
				<IngredientsList ingredients={ingredients} onDelete={onDelete} />}
		</div>
	)
}


function IngredientsList({ ingredients, onDelete }) {
	return (
		<ul>
			{ingredients.map(ingredient => <Ingredient key={ingredient.id} onDelete={onDelete} ingredient={ingredient}/>)}
		</ul>
	)
}

function Ingredient({ ingredient, onDelete }) {
	const handleDelete = (e) => {
		e.preventDefault()
		onDelete(ingredient)
	}
	return (
		<li>
			{ingredient.title}
			{ingredient.unit === null ? null : " (" + ingredient.unit + ")"}
			<i onClick={handleDelete} class="btn-red-delete fas fa-trash ml-2"></i>
		</li>
	)
}

Ingredients.propTypes = {
	ingredients: PropTypes.array
}