import { useReducer } from "react";
import { apiFetch } from "../functions/api";

function reducer(state, action) {
	console.log("INGREDIENTS REDUCER:", action, action.data );
	switch (action.type) {
		case 'FETCHING_INGREDIENTS':
			return { ...state, loading: true}
		case 'SET_INGREDIENTS':
			return { ...state, listOfIngredients: action.data, loading: false }
		case 'DELETE_INGREDIENT':
			return { ...state, listOfIngredients: state.listOfIngredients.filter(i => i !== action.data) }
		case 'ADD_INGREDIENT':
			return { ...state, listOfIngredients: [...state.listOfIngredients, action.data] }
		case 'UPDATE_INGREDIENT':
			return {...state, listOfIngredients: state.listOfIngredients.map(i => i === action.target ? action.data : i)}
		default:
			return null;
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
		fetchIngredients: async function () {
			dispatch({ type: "FETCHING_INGREDIENTS" });
			// If our system is loading AND there is ingredients: leave the fn 
			// This allow us to not make a request all the time at every page change 
			if (state.loading || state.listOfIngredients) {
				return;
			}
			const allIngredients = await apiFetch("/ingredients");
			dispatch({ type: "SET_INGREDIENTS", data: allIngredients });
		}, 
		deleteIngredient: async function (ingredient) {
			await apiFetch("/ingredients/" + ingredient.id, {
				method: 'DELETE'
			});
			dispatch({ type: 'DELETE_INGREDIENT', data: ingredient})
		}
	}
}