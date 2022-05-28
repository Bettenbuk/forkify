export default class RecipeMapper {
  mapToApiRecipe(recipeFromUI) {
    return {
      title: recipeFromUI.title,
      publisher: recipeFromUI.publisher,
      image_url: recipeFromUI.image,
      cooking_time: recipeFromUI.cookingTime,
      servings: recipeFromUI.servings,
      source_url: recipeFromUI.sourceUrl,
      ingredients: this.#mapIngredients(
        recipeFromUI.ingredient_1,
        recipeFromUI.ingredient_2,
        recipeFromUI.ingredient_3,
        recipeFromUI.ingredient_4,
        recipeFromUI.ingredient_5,
        recipeFromUI.ingredient_6
      ),
    };
  }
  #mapIngredients(...rawIngredients) {
    const ingredients = [];
    rawIngredients.forEach(x => {
      if (x.trim().length !== 0) ingredients.push(this.#mapIngredient(x));
    });
    return ingredients;
  }

  #mapIngredient(ingredient) {
    const [quantity, unit, description] = ingredient.split(',');
    if (!description)
      throw new Error(
        'Wrong ingredient format! Please use the correct format!'
      );
    return {
      quantity: quantity,
      unit: unit,
      description: description,
    };
  }
}
