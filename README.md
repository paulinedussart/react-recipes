https://www.paulinedussart.com/portfolio/recipe

App

- user

LoginForm

- error
- login
- < onConnect(user)

Site

- page
- ingredients
- recipes
- currentRecipe

Recipes

- > recipes

RecipeDetail

- > id
- > recipe

RecipeEditForm

- > recipe
- > ingredients
- < onSubmit(recipe, newRecipe)

Ingredients

- > ingredients
- < onUpdate(ingredient, newIngredient)
- < onDelete(ingredient)
- < onCreate(ingredient)

RecipeCreateForm

- > ingredients
- < onSubmit(newRecipe)
