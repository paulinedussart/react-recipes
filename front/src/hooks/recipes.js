import { useReducer, useCallback } from "react";
import { apiFetch } from "../functions/api";


const initialState = { 
	listOfRecipes: null,
	// we are not charging for the initialState
	loading: false
};

function reducer(state, action) {
	console.log("RECIPES REDUCER:", action, action.payload);
	switch (action.type) {
		case 'FETCHING_RECIPES':
			return { ...state, loading: true };
		case 'SET_RECIPES':
			return { ...state, listOfRecipes: action.payload, loading: false }
		case 'SET_RECIPE':
			return { }
		default:
			throw new Error("Unknow action" +  action.type );
	}
}

export function useRecipes() {
	const [state, dispatch] = useReducer(reducer, initialState);
	return {
		recipes: state.listOfRecipes,
		fetchRecipes: async function () {
			if (state.loading || state.listOfRecipes !== null) {
				return;
			}
			dispatch({ type: "FETCHING_RECIPES" });
			const allRecipes = await apiFetch("/recipes");
			dispatch({ type: "SET_RECIPES", payload: allRecipes });
		},
		fetchRecipe: async function (recipe) {
			const theRecipe = await apiFetch("/recipes/" + recipe.id);
			dispatch({ type: "SET_RECIPE", payload: theRecipe})
		}
	}
}