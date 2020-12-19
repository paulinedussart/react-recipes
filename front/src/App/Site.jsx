// Functions 
import React, { useEffect, useState } from "react";
import { useIngredients } from "../hooks/ingredients";
import { useRecipes } from "../hooks/recipes"
import { useToggle } from "../hooks/generic"
import { Ingredients } from './ Ingredients/Ingredients'
import { Recipes } from './Recipes/Recipes'
import { RecipeDetails } from "./Recipes/RecipeDetails";
import { CreateRecipeModal } from "./Recipes/CreateRecipe";
import { Modal } from "./../shared/Modal"
// SCSS
import "./../style/SideBar.scss";
import "./../style/AppContent.scss";

export function Site() {
	// detect the actual page
	const [page, setPage] = useState('recipes');
	const [add, toggleAdd] = useToggle(true);

	let content = null
	
	// get the hook useIngredients
	const {
		ingredients,
		fetchIngredients,
		deleteIngredient,
		updateIngredient, 
		createIngredient
	} = useIngredients()

	// get the hook useRecipes
	const {
		recipes,
		recipe,
		deselectRecipe,
		fetchRecipes,
		fetchRecipe
	} = useRecipes()

	useEffect(() => {
		if (page === "ingredients") {
			fetchIngredients()
		} else if (page === 'recipes') {
			fetchRecipes()
		}
	}, [page, fetchIngredients, fetchRecipes])

	if (page === 'ingredients') {
		content = <Ingredients
			ingredients={ingredients}
			onDelete={deleteIngredient}
			onUpdate={updateIngredient}
			onCreate={createIngredient}	
		/>
	} else if ((page === 'recipes')) {
		content = <Recipes recipes={recipes} onClick={fetchRecipe}/>
	}

	return ( <div>
		<LogoApp />
		<div id="home-content"	className="row">
			<div className="col-md-3">
				<SideBar currentPage={page} onChangePage={setPage} onButtonClick={toggleAdd}/>
			</div>
			<div className="col-md-9">
				{JSON.stringify(add)}
				{recipe ? <RecipeDetails recipe={recipe} onClose={deselectRecipe} /> : null}
				{add && <Modal title='Créer une nouvelle recette' onClose={toggleAdd}>
									<CreateRecipeModal />
								</Modal>}
				{content}
			</div>
		</div>
	</div>
	)	
}



function SideBar({ currentPage, onChangePage, onButtonClick }) {
	// add a class active on the current Page
	const activeClass = (page) => {
		let className;
		if (page === currentPage) {
			className = "active"
		}
		return className;
	}

	function handleClick(pages) {
		onChangePage(pages)
	}
	
	return (
		<div id="sidebar-list" className="h-75 d-flex justify-content-center">
			<ul className="mt-5 list-unstyled p-4">
				<li className={activeClass("recipes")} onClick={() => handleClick("recipes")}>
					<a href="#recipes" className="text-decoration-none px-3"><i className="fas fa-book mr-3"></i>All Recipes</a>
				</li>
				<li className={activeClass("ingredients")} onClick={() => handleClick("ingredients")}>
					<a href="#ingredients" className="text-decoration-none px-3"><i className="fas fa-carrot mr-3"></i>Ingredients</a>
				</li>
				<li className={activeClass("newRecipe")} onClick={onButtonClick}>
					<a href="#new" className="text-decoration-none px-3"><i className="fas fa-plus mr-3"></i>New Recipe</a>
				</li>
			</ul>
		</div>
	) 
}

// Logo App
function LogoApp() {
	return <div className="p-2"><i className="fas fa-cookie-bite p-3 fa-lg"></i><b id="title-app-bold-black">Flavour</b>	</div>
}