import AddRecipeView from './view/AddRecipeView.js';
import BookmarkListView from './view/BookmarkListView.js';
import RecipeListPagerView from './view/RecipeListPagerView.js';
import RecipeListView from './view/RecipeListView.js';
import RecipeSearcherView from './view/RecipeSearcherView.js';
import RecipeView from './view/RecipeView.js';

const OPEN_BUTTON_PATH = '.nav__btn--add-recipe';
const ERROR_RECIPE_VIEW_DEFAULT_MSG =
  'Something went wrong. Please try it later!';

/**
 * Manage the UI components
 * @author Bettenbuk István
 * */

export default class View {
  #recipeView;
  #recipeListView;
  #recipeSearcherView;
  #recipeListPagerView;
  #bookmarkListView;
  #addRecipeView;

  /** Constructor
   * @param {String} loadAndShowRecipe recipe load and show function
   * @param {String} handleBookmark bookmark handle function
   * @param {String} decreaseService service decrease function
   * @param {String} increaseService service increase function
   * @param {String} loadAndShowRecipeList recipe list load and show function
   * @param {String} showPrevRecipeListPage previous recipe list show function
   * @param {String} showNextRecipeListPage next recipe list show function
   * @param {String} addRecipe add new rexpe function
   * */

  constructor(
    loadAndShowRecipe,
    handleBookmark,
    decreaseService,
    increaseService,
    loadAndShowRecipeList,
    showPrevRecipeListPage,
    showNextRecipeListPage,
    addRecipe
  ) {
    this.#recipeView = new RecipeView(
      handleBookmark,
      decreaseService,
      increaseService
    );
    this.#recipeListView = new RecipeListView();
    this.#recipeSearcherView = new RecipeSearcherView(loadAndShowRecipeList);
    this.#recipeListPagerView = new RecipeListPagerView(
      showPrevRecipeListPage,
      showNextRecipeListPage
    );
    this.#bookmarkListView = new BookmarkListView();
    this.#addRecipeView = new AddRecipeView(addRecipe);
    this.#changeHash(loadAndShowRecipe);
    this.#showAddRecipeWindow();
  }

  /** Show a recipe
   * @param {Recipe} recipe the recipe to show
   * */

  showRecipe(recipe) {
    this.#recipeView.show(recipe);
  }

  /** Show a recipe error
   * @param {String} {message = Something went wrong}  the message to show
   * */

  errorRecipe(message = ERROR_RECIPE_VIEW_DEFAULT_MSG) {
    this.#recipeView.error(message);
  }

  /** Sign to waiting for loading the recipe
   * */

  waitForRecipe() {
    this.#recipeView.spinner();
  }

  getQuery() {
    return this.#recipeSearcherView.getAndClearQuery();
  }

  showRecipeList(recipeList, prevPage, nextPage) {
    this.#recipeListView.render(recipeList);
    this.#recipeListPagerView.activatePagerButtons(prevPage, nextPage);
  }

  refreshRecipeList(recipeList) {
    this.#recipeListView.refresh(recipeList);
  }

  /** Sign to waiting for loading the recipe list
   * */

  waitForRecipeList() {
    this.#recipeListView.spinner();
  }

  errorRecipeList() {
    this.#recipeListView.error();
  }

  renderBookmarkList(bookmarkList) {
    this.#bookmarkListView.render(bookmarkList);
  }

  refreshBookmarkList(bookmarkList) {
    this.#bookmarkListView.refresh(bookmarkList);
  }

  errorAddRecipe() {
    this.#addRecipeView.error();
  }

  /** Sign to waiting for uploading the new recipe
   * */

  waitForAddRecipe() {
    this.#addRecipeView.spinner();
  }

  /** Cloase add new recipe window after successful uploading
   * */

  closeAddRecipeForm() {
    this.#addRecipeView.close();
  }

  #changeHash(fn) {
    ['hashchange', 'load'].forEach(x => window.addEventListener(x, fn));
  }

  #showAddRecipeWindow() {
    const fn = this.#addRecipeView.show.bind(this.#addRecipeView);
    document.querySelector(OPEN_BUTTON_PATH).addEventListener('click', fn);
  }
}
