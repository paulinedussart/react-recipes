import PropTypes from "prop-types";
import { Field } from "../../shared/Field";
import { Loader } from "../../shared/Loader";
import { useState, useCallback } from "react"
import { ApiError } from "../../functions/api";


// Cntent for the newRecipe Modal
export function CreateRecipeModal({ ingredients, onSubmit }) {
	return (
		<RecipeForm ingredients={ingredients} onSubmit={onSubmit} />
	)
}

export function EditFormRecipe({ ingredients, onSubmit, recipe }) {
	return (
		<RecipeForm ingredients={ingredients} onSubmit={onSubmit} recipe={recipe} />
	)
}


// Cntent for the newRecipe Modal
export function RecipeForm({ ingredients, onSubmit, recipe = {} }) {
	const [erreur, setError] = useState([])

	async function handleSubmit(e) {
		e.preventDefault()
		const form = e.target;
		const formData = Object.fromEntries(new FormData(form));
		formData.ingredients = recipeIngredients;
		console.log(formData)
		setError([])
		try {
			await onSubmit(formData)
			form.reset()
			resetIngredients()
		} catch (e) {
			if (e instanceof ApiError) {
				setError(e.errors);
			} else {
				throw e
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

	const {
		ingredients: recipeIngredients,
		addIngredient,
		updateQuantity,
		deleteIngredient,
		resetIngredients,
	} = useIngredients(recipe.ingredients)

	const filteredIngredients = (ingredients || []).filter(ingredient =>
		!recipeIngredients.some(i => i.id === ingredient.id)
	)

	return (
		<form onSubmit={handleSubmit}>
			<div className="row">
				<div className="col-md-6">
					<h6 className="mb-0 mt-2">Name</h6>
					<Field name="name" placeholder="Risotto with mushrooms and asparagus" defaultValue={recipe.title} error={errorFor("name")} />
					<h6 className="mb-0 mt-2">Short description</h6>
					<Field name="short" placeholder="A very fast veggie recipe" error={errorFor("short")} defaultValue={recipe.short} />
					<h6 className="mb-0 mt-2">Large description</h6>
					<Field name="content" type="textarea" placeholder="1. Clean the mushrooms and cut..." defaultValue={recipe.content} error={errorFor("content")} />
				</div>
				<div className="col-md-6">
					<h6>Ingredients</h6>
					{ingredients ? <Select ingredients={filteredIngredients} onChange={addIngredient} /> : <Loader content="ingredients" />}
					{recipeIngredients.map(ingredient => <RowIngredient key={ingredient.id} ingredient={ingredient} onDelete={deleteIngredient} onChange={updateQuantity} />)}
				</div>
			</div>
			<div className="mt-5 text-right">
				<button type="submit" className="btn btn-green-valid">Submit</button>
			</div>
		</form>

	)
}

// hook personnalisé
function useIngredients(initial) {
	const [ingredients, setIngredients] = useState(initial || [])

	return {
		ingredients: ingredients,
		addIngredient: function (ingredient) {
			setIngredients(state => [...state, ingredient])
		},
		updateQuantity: function (ingredient, quantity) {
			setIngredients(state => state.map(i => i === ingredient ? { ...i, quantity } : i))
		},
		deleteIngredient: function (ingredient) {
			setIngredients(state => state.filter(i => i !== ingredient))
		},
		resetIngredients: useCallback(function () {
			//allow us to reinitialize the ingredients of our form
			setIngredients([])
		}, [])
	}
}

function RowIngredient({ ingredient, onChange, onDelete }) {

	function handleChange(e) {
		onChange(ingredient, e.target.value)
	}

	function handleDelete() {
		onDelete(ingredient)
	}

	return (
		<div className="d-flex align-items-center">
			{ingredient.title}
			<input className="mx-2 w-25 form-control my-2" type="text" defaultValue={ingredient.quantity} placeholder="quantity" onChange={handleChange} />
			{ingredient.unit}
			<i className="btn-red-delete fas fa-trash mx-2" onClick={handleDelete}></i>
		</div>
	)
}


// The Select Field
function Select({ ingredients, onChange }) {

	function handleSelectChange(e) {
		onChange(ingredients[parseInt(e.target.value, 10)])
	}

	return (
		<select className="form-control" name="ingredients" id="ingredient-select" onChange={handleSelectChange} >
			<option>Select your ingredient</option>
			{ingredients.map((i, k) => <option key={i.id} value={k} name={i.title} id={i.title}> {i.title} {i.unit ? "(" + i.unit + ")" : ""}</option>)}
		</select>
	)
}


// Prop_Types
RecipeForm.propTypes = {
	ingredients: PropTypes.array,
}