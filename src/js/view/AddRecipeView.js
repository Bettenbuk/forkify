import icons from 'url:../../img/icons.svg';
import AbstractDataView from './AbstractDataView';

const DEFAULT_MSG = 'Recipe was successfully uploaded :)';
const CONTAINER_PATH = '.upload';
const CLOSE_BUTTON_PATH = '.btn--close-modal';
const OVERLAY_PATH = '.overlay';
const WINDOW_PATH = '.add-recipe-window';

export default class AddRecipeView extends AbstractDataView {
  #uploadFn;

  constructor(addRecipe) {
    const container = document.querySelector(CONTAINER_PATH);
    super(container, DEFAULT_MSG);
    this.#uploadFn = addRecipe;
    this.#closeAddRecipeWindow();
  }

  #toggleWindow() {
    document.querySelector(WINDOW_PATH).classList.toggle('hidden');
    document.querySelector(OVERLAY_PATH).classList.toggle('hidden');
  }

  #closeAddRecipeWindow() {
    document
      .querySelector(OVERLAY_PATH)
      .addEventListener('click', this.#toggleWindow);
    document
      .querySelector(CLOSE_BUTTON_PATH)
      .addEventListener('click', this.#toggleWindow);
  }

  #clickOnAddRecipe() {
    const fn = this.#uploadFn;
    this._container.addEventListener('submit', function (e) {
      e.preventDefault();
      fn(Object.fromEntries(new FormData(this)));
    });
  }

  close() {
    this.message();
    setTimeout(this.#toggleWindow.bind(this), 2500);
  }

  show() {
    this._render(this.#createAddRecipeHtml());
    this.#clickOnAddRecipe();
    console.log('show');
    this.#toggleWindow();
  }

  #createAddRecipeHtml() {
    return ` 
    <div class="upload__column">
      <h3 class="upload__heading">Recipe data</h3>
      <label>Title</label>
      <input value="TEST1" required name="title" type="text" />
      <label>URL</label>
      <input value="TEST2" required name="sourceUrl" type="text" />
      <label>Image URL</label>
      <input value="TEST3" required name="image" type="text" />
      <label>Publisher</label>
      <input value="TEST4" required name="publisher" type="text" />
      <label>Prep time</label>
      <input value="75" required name="cookingTime" type="number" />
      <label>Servings</label>
      <input value="2" required name="servings" type="number" />
    </div>

    <div class="upload__column">
      <h3 class="upload__heading">Ingredients</h3>
      <label>Ingredient 1</label>
      <input
        value="0.5,kg,Rice"
        type="text"
        required
        name="ingredient_1"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 2</label>
      <input
        value="1,,Avocado"
        type="text"
        name="ingredient_2"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 3</label>
      <input
        value=",,salt"
        type="text"
        name="ingredient_3"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 4</label>
      <input
        type="text"
        name="ingredient_4"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 5</label>
      <input
        type="text"
        name="ingredient_5"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 6</label>
      <input
        type="text"
        name="ingredient_6"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
    </div>

    <button class="btn upload__btn">
      <svg>
        <use href="${icons}#icon-upload-cloud"></use>
      </svg>
      <span>Upload</span>
    </button>`;
  }
}
