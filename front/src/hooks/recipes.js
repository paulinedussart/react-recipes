import { useReducer, useCallback } from "react";
import { apiFetch } from "../functions/api";


const initialState = { 
	listOfRecipes: null,
	// we are not charging for the initialState
	loading: false,
	// allow to know if we are on a recipe (actual recipe) and avoid useless download
	recipeId: null
};

function reducer(state, action) {
	console.log("RECIPES REDUCER:", action, action.payload, state);
	switch (action.type) {
		case 'FETCHING_RECIPES':
			return { ...state, loading: true };
		case 'SET_RECIPES':
			return { ...state, listOfRecipes: action.payload, loading: false }
		// it is the same as UPDATE_RECIPE
		case 'SET_RECIPE':
			// changer la recette qui correspond à notre payload
			return { ...state, listOfRecipes: state.listOfRecipes.map(r => r.id === action.payload.id ? action.payload : r )}
		case 'FETCHING_RECIPE':
			return { ...state, recipeId: action.payload.id }
		case 'DESELECT_RECIPE':
			return { ...state, recipeId: null }
		case 'DELETE _RECIPE':
			return { ...state, listOfRecipes: state.listOfRecipes.filter( r => r !==  action.payload) }
		case 'ADD_RECIPE':
			return { ...state, listOfRecipes: [action.payload, ...state.listOfRecipes] }
		default:
			throw new Error("Unknow action" +  action.type );
	}
}

export function useRecipes() {
	const [state, dispatch] = useReducer(reducer, initialState);

	// recupérer la recette actuellement selectionné 
	// trouver l'identifiant de la recette qui correspond à l'id de la reccette actuellement selectionné
	const currentRecipe = state.listOfRecipes ? state.listOfRecipes.find(r => r.id === state.recipeId) : null;

	return {
		recipes: state.listOfRecipes,
		recipe: currentRecipe,
		fetchRecipes: async function () {
			if (state.loading || state.listOfRecipes !== null) {
				return;
			}
			dispatch({ type: "FETCHING_RECIPES" });
			const allRecipes = await apiFetch("/recipes");
			dispatch({ type: "SET_RECIPES", payload: allRecipes });
		},
		fetchRecipe: useCallback( async function (recipe) {
			// lorsque l'on recupère une recette, on va appeler fetching_recipe et on va lui indiquer quelle recette on veut récupérer. 
			dispatch({ type: "FETCHING_RECIPE", payload: recipe })
			if (!recipe.ingredients) {
				const theRecipe = await apiFetch("/recipes/" + recipe.id);
				dispatch({ type: "SET_RECIPE", payload: theRecipe})
			}
		}, []), 
		createRecipe: useCallback(async function (data) {
			const recipe = await apiFetch("/recipes", {
				method: "POST", 
				body: data
			})
			dispatch({type: "ADD_RECIPE", payload: recipe})
		}),
		deselectRecipe: async function () {
			dispatch({ type: "DESELECT_RECIPE"})
		}, 
		updateRecipe: useCallback(async function (recipe, data) {
			const theRecipe = await apiFetch("/recipes/" + recipe.id, {
				method: "PUT",
				body: data
			})
			dispatch({ type: "SET_RECIPE", payload: theRecipe })
		}),
		deleteRecipe: useCallback(async function (recipe) {
			const theRecipe = await apiFetch("/recipes/" + recipe.id, {
				method: "DELETE"
			})
			dispatch({ type: "DELETE_RECIPE", payload: theRecipe })
		})

	}
}