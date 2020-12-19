import { Field } from "../../shared/Field";

export function CreateRecipeModal() {
	return (
		<div>
			Name
			<Field name="name" placeholder="Risotto with mushrooms and asparagus" />
			Short description
			<Field name="name" placeholder="A very fast veggie recipe" />
			Large description
			<Field name="name" type="textarea" placeholder="1. Clean the mushrooms and cut..." />
		</div>
	)
}