import Ingredient from './Ingredient';
import RecipeListItem from './RecipeListItem';

export default class Recipe extends RecipeListItem {
  #maxServings = 10;
  #minServings = 1;

  constructor(rawRecipe) {
    super(rawRecipe);
    this.servings = rawRecipe.servings;
    this.cookingTime = rawRecipe.cooking_time;
    this.sourceUrl = rawRecipe.source_url;
    this.ingredients = rawRecipe.ingredients.map(
      x => new Ingredient(x, this.servings)
    );
    this.isBookmarked = false;
  }

  increase() {
    if (this.servings < this.#maxServings) {
      this.servings++;
      this.ingredients.forEach(x => x.setServings(this.servings));
    }
  }

  decrease() {
    if (this.servings > this.#minServings) {
      this.servings--;
      this.ingredients.forEach(x => x.setServings(this.servings));
    }
  }

  addBookmark() {
    this.isBookmarked = true;
  }

  removeBookmark() {
    this.isBookmarked = false;
  }
}
