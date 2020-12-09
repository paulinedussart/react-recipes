// libraries
import React from 'react';
import { Card, Button } from 'react-bootstrap';
// functions
import { Loader } from "../../shared/Loader"
// scss
import "../../style/Icon.scss"
import "../../style/Card.scss"

export const Recipes = ({ recipes }) => {
	return (
		<div >
			<h2>My Recipes</h2>
			{ recipes === null ?
				<span className="d-flex justify-content-center mt-5">
					<Loader content={"recipes"} />
				</span> :
				<RecipeList recipes={recipes} /> }
		</div>
	)
}

function getRandomArbitrary(min, max) {
	const number = Math.random() * (max - min) + min;
	return Math.ceil(number)
}
// expected output: 0, 1 or 2
function RecipeList({ recipes }) {
	const icon = <i className='fas fa-star'></i>;
	return (
		<div className="cards">
		{	recipes.map(recipe  => <Card key={recipe.title} id={recipe.id}>
			<Card.Body >
				{[...Array(getRandomArbitrary(2, 5))].map((e, i) => icon)}
						<Card.Title>{recipe.title}</Card.Title>
						<Card.Text>
					{recipe.short}
						</Card.Text>
						<Button className="btn-green-details">Go somewhere</Button>
					</Card.Body>
				</Card>)}
			
		</div>
	)
}