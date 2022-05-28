import RecipeListItem from './RecipeListItem';
import Store from './Store';

const STORE_NAME = 'Bookmark';

export default class Bookmark {
  #store;

  constructor() {
    this.#store = new Store(STORE_NAME, data => new RecipeListItem(data));
  }

  add(recipe) {
    const recipeListItem = new RecipeListItem(recipe);
    this.#store.add(recipe.id, recipeListItem);
    recipe.addBookmark();
  }

  setAsBookmarkedIfNeeded(recipe) {
    if (this.#store.get(recipe.id)) recipe.addBookmark();
  }

  remove(recipe) {
    this.#store.delete(recipe.id);
    recipe.removeBookmark();
  }

  getList() {
    return this.#store.getAll();
  }
}
