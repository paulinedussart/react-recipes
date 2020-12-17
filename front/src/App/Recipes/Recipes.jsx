// libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
// functions
import { Loader } from "../../shared/Loader";
import { RecipeDetails } from "./RecipeDetails";
// scss
import "../../style/Icon.scss"
import "../../style/Card.scss"

export function Recipes ({ recipes, onClick }) {
	if (recipes === null) {
		return 	<Loader content={"recipes"} />
	}
	return (
		<div>
			<h2 className="mb-4">My Recipes</h2>
			<div className="row px-3">
				{recipes.map(recipe => <div className="cards col-xs-12 col-md-4"><Recipe key={recipe.id} recipe={recipe} onClick={onClick} /></div>)}
			</div>
		</div>
	)
}

function getRandomArbitrary(min, max) {
	const number = Math.random() * (max - min) + min;
	return Math.ceil(number)
}
// expected output: 0, 1 or 2
function Recipe({ recipe, onClick }) {
	const icon = <i className='fas fa-star'></i>;

	return (
		<Card key={recipe.id} >
			{/* <RecipeDetails recipe={recipe} /> */}
			<Card.Body>
				{[...Array(getRandomArbitrary(2, 5))].map((e, i) => icon)}
				<Card.Title>{recipe.title}</Card.Title>
				<Card.Text>
					{recipe.short}
				</Card.Text>
				<Button onClick={() => onClick(recipe)} className="btn-green-details">Details</Button>
			</Card.Body>
		</Card>
	)
}

Recipes.propTypes = {
	recipes: PropTypes.array,
	onClick: PropTypes.func.isRequired
}