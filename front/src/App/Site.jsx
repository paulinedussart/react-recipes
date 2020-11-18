import "./../CSS/Home.css";
import React, { useState } from "react";

export function Site() {
	// detect the actual page
	const [page, setPage] = useState('ingredients');

	return ( <div>
		<LogoApp />
		<div id="home-content"	className="row">
			<div  className="col-md-auto  h-100">
				<SideBar currentPage={page} onChangePage={setPage}/>
			</div>
			<div className="col-9">
				{page}
			</div>
		</div>
	</div>
	)	
}



function SideBar({ currentPage, onChangePage }) {
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
		<div id="sidebar-list" className="h-75 mt-4 d-flex justify-content-center">
			<ul className="mt-5 list-unstyled p-4">
				<li className={activeClass("recipes")} onClick={() => handleClick("recipes")}>
					<a href="#" className="text-decoration-none px-3"><i className="fas fa-book mr-3"></i>Recipes</a>
				</li>
				<li className={activeClass("ingredients")} onClick={() => handleClick("ingredients")}>
					<a href="#" className="text-decoration-none px-3"><i className="fas fa-carrot mr-3"></i>Ingredients</a>
				</li>
				<li className={activeClass("newRecipe")} onClick={() => handleClick("newRecipe")}>
					<a href="#" className="text-decoration-none px-3"><i className="fas fa-plus mr-3"></i>New Recipe</a>
				</li>
			</ul>
		</div>
	) 
}

// Logo App
function LogoApp() {
	return <div><i className="fas fa-cookie-bite p-3 fa-lg"></i><b id="title-app-bold-black">Flavour</b>	</div>
}