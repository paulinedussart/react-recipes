// libraries
import React, { useState, memo  } from 'react'
import PropTypes from 'prop-types';
// functions
import { Loader } from '../../shared/Loader';
import { Field } from '../../shared/Field';
import { ApiError } from '../../functions/api';

export function Ingredients({ ingredients, onDelete, onUpdate, onCreate }) {
	return (
		<div>
			<h2>My Ingredients</h2>
			<CreateIngredientForm onSubmit={onCreate}/>
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
		<div id="app-content">
			{ingredients.map(ingredient => <Ingredient key={ingredient.id} onDelete={onDelete} onUpdate={onUpdate} ingredient={ingredient}/>)}
		</div>
	)
}

const Ingredient = memo(function ({ ingredient, onDelete, onUpdate }) {
	const [erreur, setError] = useState([])
	const handleDelete = async (e) => {
		e.preventDefault()
		await onDelete(ingredient)
	}

	const handlesubmit = async (e) => {
		e.preventDefault()
		setError([])
		try {
			await onUpdate(ingredient, new FormData(e.target))
		} catch (e) {
			if (e instanceof ApiError) {
				setError(e.errors);
			} else {
				throw new Error(e)
			}
		}
	}
	// render the error of the target field
	const errorFor = function (field) {
		// find the error which has the field that match the asked field 
		const error = erreur.find(e => e.field === field)
		if (error) {
			return error.message
		}
		return null
	}
	return (
		<form className="form-inline" onSubmit={handlesubmit}>
			<Field defaultValue={ingredient.title} name="ingredients" error={errorFor("title")}/>
			<Field defaultValue={ingredient.unit} name="unit" error={errorFor("unit")} />
			<button className="btn-blue-update" type="submit"><i className=" fas fa-save mx-2"></i></button>
			<i onClick={handleDelete} className="btn-red-delete fas fa-trash mx-2"></i>
		</form>
	)
})

function CreateIngredientForm ({ onSubmit }) {
	const [erreur, setError] = useState([])
	
	const handleSubmit = async (e) => {
		const form = e.target
		e.preventDefault()
		setError([])
		try {
			await onSubmit(new FormData(e.target))
			form.reset()
		} catch (e) {
			if (e instanceof ApiError) {
				setError(e.errors)
			} else {
				throw new Error(e)
			}
		}
	} 

	// render the error of the target field
	const errorFor = function (field) {
		// find the error which has the field that match the asked field 
		const error = erreur.find(e => e.field === field)
		if (error) {
			return error.message
		}
		return null
	}

	return (
		<form className="form-inline" onSubmit={handleSubmit}>
			<Field placeholder='new ingredient' name="ingredients" error={errorFor("title")}/>
			<Field placeholder='new unit' name="unit" error={errorFor("unit")}/>
			<button className="btn-purple-create" type="submit"><i className="fas fa-plus-square mx-2"></i></button>
		</form>
)}

Ingredients.propTypes = {
	ingredients: PropTypes.array
}