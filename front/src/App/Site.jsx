// Functions 
import React, { useEffect, useState } from "react";
import { useIngredients } from "../hooks/ingredients";
import { useRecipes } from "../hooks/recipes"
import { useToggle } from "../hooks/generic"
import { Ingredients } from './ Ingredients/Ingredients'
import { Recipes } from './Recipes/Recipes'
import { RecipeDetails } from "./Recipes/RecipeDetails";
import { CreateRecipeModal } from "./Recipes/RecipeForm";
import { Modal } from "./../shared/Modal"
// SCSS
import "./../style/SideBar.scss";
import "./../style/AppContent.scss";

export function Site() {
	// detect the actual page
	const [page, setPage] = useState('recipes');
	const [add, toggleAdd] = useToggle(false);

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
		fetchRecipe, 
		createRecipe, 
		updateRecipe,
		deleteRecipe
	} = useRecipes()

	useEffect(() => {
		if (page === "ingredients" || add === true) {
			fetchIngredients()
		} else if (page === 'recipes') {
			fetchRecipes()
		}
	}, [page, add])

	if (page === 'ingredients') {
		content = <Ingredients
			ingredients={ingredients}
			onDelete={deleteIngredient}
			onUpdate={updateIngredient}
			onCreate={createIngredient}	
		/>
	} else if ((page === 'recipes')) {
		content = <Recipes recipes={recipes} onClick={fetchRecipe} onDelete={deleteRecipe}/>
	}

	return ( <div>
		<LogoApp />
		<div id="home-content"	className="row">
			<div className="col-md-3">
				<SideBar currentPage={page} onChangePage={setPage} onButtonClick={toggleAdd}/>
			</div>
			<div className="col-md-9">
				{recipe ? <RecipeDetails
										recipe={recipe}
										ingredients={ingredients}
										onClose={deselectRecipe}
										onEdit={fetchIngredients}
										
										onUpdate={updateRecipe}
										/> : null}
				{add && <Modal title='Create a new recipe' onClose={toggleAdd}>
									<CreateRecipeModal
										ingredients={ingredients}
										onSubmit={createRecipe} />
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