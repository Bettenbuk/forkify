const CONTAINER_PATH = '.search';
const QUERY_PATH = '.search__field';

export default class RecipeSearcherView {
  #container = document.querySelector(CONTAINER_PATH);
  #fieldContainer = this.#container.querySelector(QUERY_PATH);

  constructor(loadAndShowRecipeList) {
    this.#submitSearch(loadAndShowRecipeList);
  }

  getAndClearQuery() {
    const query = this.#fieldContainer.value;
    this.#fieldContainer.value = '';
    return query;
  }

  #submitSearch(fn) {
    this.#container.addEventListener('submit', function (e) {
      e.preventDefault();
      fn();
    });
  }
}
