import Page from './Page';
import RecipeListItem from './RecipeListItem';

export default class RecipeList {
  #page;

  constructor(rawRecipeList) {
    this.recipeList = rawRecipeList.map(x => new RecipeListItem(x));
    this.#page = new Page(this.recipeList.length);
  }

  currentPageItems() {
    return this.recipeList.slice(
      this.#page.getItemsFrom(),
      this.#page.getItemsTo()
    );
  }

  nextPageItems() {
    this.#page.next();
    return this.currentPageItems();
  }

  prevPageItems() {
    this.#page.prev();
    return this.currentPageItems();
  }

  getNextPageNumber() {
    return this.#page.getNext();
  }

  getPrevPageNumber() {
    return this.#page.getPrev();
  }
}
