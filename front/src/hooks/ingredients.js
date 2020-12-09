import { useReducer, useCallback } from "react";
import { apiFetch } from "../functions/api";

function reducer(state, action) {
	console.log("INGREDIENTS REDUCER:", action, action.payload );
	switch (action.type) {
		case 'FETCHING_INGREDIENTS':
			return { ...state, loading: true}
		case 'SET_INGREDIENTS':
			return { ...state, listOfIngredients: action.payload, loading: false }
		case 'DELETE_INGREDIENT':
			return { ...state, listOfIngredients: state.listOfIngredients.filter(i => i !== action.payload) }
		case 'ADD_INGREDIENT':
			return { ...state, listOfIngredients: [action.payload, ...state.listOfIngredients] }
		case 'UPDATE_INGREDIENT':
			return {...state, listOfIngredients: state.listOfIngredients.map(i => i === action.target ? action.payload : i)}
		default:
			throw new Error('Unknown action' + action.type)
		}
	}
		
export function useIngredients() {
	const [state, dispatch] = useReducer(reducer, {
		listOfIngredients: null, 
		// we are not charging 
		loading: false
	})
	return {
		ingredients: state.listOfIngredients, 
		fetchIngredients: useCallback(async function () {
			dispatch({ type: "FETCHING_INGREDIENTS" });
			// If our system is loading AND there is ingredients: leave the fn 
			// This allow us to not make a request all the time at every page change 
			if (state.loading || state.listOfIngredients) {
				return;
			}
			const allIngredients = await apiFetch("/ingredients");
			dispatch({ type: "SET_INGREDIENTS", payload: allIngredients });
		}, [state]), 
		deleteIngredient: useCallback(async function (ingredient) {
			await apiFetch("/ingredients/" + ingredient.id, {
				method: 'DELETE'
			});
			dispatch({ type: 'DELETE_INGREDIENT', payload: ingredient})
		}, []), 
		updateIngredient: useCallback(async function (ingredient, data) {
			const updatedIngredient = await apiFetch("/ingredients/" + ingredient.id, {
				method: 'PUT', 
				body: data
			});
			//payload: ce qui est recu par l'api
			dispatch({ type: 'UPDATE_INGREDIENT', payload: updatedIngredient, target: ingredient })
		}, []), 
		createIngredient: useCallback(async function (data) {
			const newIngredient = await apiFetch("/ingredients", {
				method: 'POST',
				body: data
			})
			dispatch({ type: 'ADD_INGREDIENT', payload: newIngredient })
		}, [])
	}
}