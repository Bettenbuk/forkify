import { API_URL, API_KEY, TIMEOUT_SEC, MAX_PAGE_SIZE } from './ModelConfig.js';
import Bookmark from './model/Bookmark';
import Page from './model/Page';
import Recipe from './model/Recipe';
import RecipeList from './model/RecipeList';
import RecipeMapper from './model/RecipeMapper';
import Utility from './Utility.js';

/**
 * Manage the business data behind the Forkify application
 * @author Bettenbuk István
 * */

export default class Model {
  #utility;
  #bookmark;
  #recipeMapper;

  constructor() {
    this.#utility = new Utility();
    this.#bookmark = new Bookmark();
    this.#recipeMapper = new RecipeMapper();
    Page.setSize(MAX_PAGE_SIZE);
  }

  /** Get a recipe based on its ID
   * @param {String} id recipe ID
   * @returns {Recipe} the searched recipe if exists
   * */

  async loadRecipe(id) {
    const url = `${API_URL}/${id}?key=${API_KEY}`;
    const result = await this.#utility.getJson(url, TIMEOUT_SEC);
    const recipe = new Recipe(result.data.recipe);
    this.#bookmark.setAsBookmarkedIfNeeded(recipe);
    return recipe;
  }

  /** Get a list of recipes that match your search criteria
   * @param {String} query searchnig criteria
   * @returns {RecipeList} the searched recipes list
   * */

  async loadRecipeList(query) {
    const url = `${API_URL}?search=${query}&key=${API_KEY}`;
    const result = await this.#utility.getJson(url);
    return new RecipeList(result.data.recipes);
  }

  /** Get the bookmarked recipes list
   * @returns {RecipeList} the bookmarked recipes list
   * */

  getBookmarkList() {
    return this.#bookmark.getList();
  }

  /** Switch bookmark on a recipe
   * @param {Recipe} recipe recipe involved in bookmark switching
   * */

  handleBookmark(recipe) {
    if (recipe.isBookmarked) this.#bookmark.remove(recipe);
    else this.#bookmark.add(recipe);
  }

  /** Add a new recipe as bookmark it instantly
   * @param {Object} recipeFromUI recipe in UI structure
   * @returns {Recipe} tho stored new recipe
   * */

  async addRecipe(recipeFromUI) {
    const url = `${API_URL}?key=${API_KEY}`;
    const recipe = this.#recipeMapper.mapToApiRecipe(recipeFromUI);
    const result = await this.#utility.sendJson(url, recipe, TIMEOUT_SEC);
    return new Recipe(result.data.recipe);
  }
}
