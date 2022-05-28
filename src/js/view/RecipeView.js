import icons from 'url:../../img/icons.svg';
import AbstractDataView from './AbstractDataView';

const DEFAULT_MSG = 'We could not find that recipe. Please try another one!';
const CONTAINER_PATH = '.recipe';
const BOOKMARK_BUTTON_PATH = '.btn--bookmark';
const DECREASE_BUTTON_PATH = '.btn--decrease-servings';
const INCREASE_BUTTON_PATH = '.btn--increase-servings';

export default class RecipeView extends AbstractDataView {
  #handleBookmarkFn;
  #decreaseFn;
  #increaseFn;
  #currentRecipe;

  constructor(handleBookmark, decreaseService, increaseService) {
    const container = document.querySelector(CONTAINER_PATH);
    super(container, DEFAULT_MSG);
    this.#handleBookmarkFn = handleBookmark;
    this.#decreaseFn = decreaseService;
    this.#increaseFn = increaseService;
  }

  show(recipe) {
    if (this.#currentRecipe === recipe.id) {
      this._refresh(this.#createRecipeHtml(recipe));
    } else {
      this.#currentRecipe = recipe.id;
      this._render(this.#createRecipeHtml(recipe));
      this.#clickOnDecreaseButton(this.#decreaseFn);
      this.#clickOnIncreaseButton(this.#increaseFn);
      this.#clickOnBookmarkButton(this.#handleBookmarkFn);
    }
  }

  #createRecipeHtml(recipe) {
    const bookmarkIcon = `${icons}#icon-bookmark${
      recipe.isBookmarked ? '-fill' : ''
    }`;
    const own = recipe.isOwn ? `` : 'hidden';

    return `<figure class="recipe__fig">
                <img src="${recipe.imageUrl}" 
                    alt="${recipe.title}" 
                    class="recipe__img" />
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>
                <div class="recipe__details">
                    <div class="recipe__info">
                        <svg class="recipe__info-icon">
                            <use href="${icons}#icon-clock"></use>
                        </svg>
                        <span class="recipe__info-data recipe__info-data--minutes">${
                          recipe.cookingTime
                        }</span>
                        <span class="recipe__info-text">minutes</span>
                    </div>
                    <div class="recipe__info">
                        <svg class="recipe__info-icon">
                            <use href="${icons}#icon-users"></use>
                        </svg>
                        <span class="recipe__info-data recipe__info-data--people">${
                          recipe.servings
                        }</span>
                        <span class="recipe__info-text">servings</span>
                        <div class="recipe__info-buttons">
                            <button class="btn--tiny btn--decrease-servings">
                                <svg>
                                    <use href="${icons}#icon-minus-circle"></use>
                                </svg>
                            </button>
                            <button class="btn--tiny btn--increase-servings">
                                <svg>
                                    <use href="${icons}#icon-plus-circle"></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="recipe__user-generated ${own}">
                        <svg>
                            <use href="${icons}#icon-user"></use>
                        </svg>
                    </div>
                    <button class="btn--round btn--bookmark">
                        <svg class="">
                            <use href="${bookmarkIcon}"></use>
                        </svg>
                    </button>
                </div>
                <div class="recipe__ingredients">
                    <h2 class="heading--2">Recipe ingredients</h2>
                    <ul class="recipe__ingredient-list">
                    ${recipe.ingredients
                      .map(x => this.#createRecipeIngredientHtml(x))
                      .join('')}
                    </ul>
                </div>
                <div class="recipe__directions">
                    <h2 class="heading--2">How to cook it</h2>
                        <p class="recipe__directions-text">
                            This recipe was carefully designed and tested by
                            <span class="recipe__publisher">${
                              recipe.publisher
                            }</span>. Please check out directions at their website.
                        </p>
                    <a
                        class="btn--small recipe__btn"
                        href="${recipe.sourceUrl}"
                        target="_blank"
                    >
                        <span>Directions</span>
                        <svg class="search__icon">
                            <use href="${icons}#icon-arrow-right"></use>
                        </svg>
                    </a>
                </div>`;
  }

  #createRecipeIngredientHtml(ingredient) {
    return ` 
      <li class="recipe__ingredient">
              <svg class="recipe__icon">
                  <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">
                ${this.#calcPrettyQuantity(ingredient.quantity)}
              </div>
              <div class="recipe__description">
              <span class="recipe__unit">${ingredient.unit}</span>
                  ${ingredient.description}
          </div>
      </li>`;
  }

  #calcPrettyQuantity(rawQuantity) {
    return rawQuantity ? rawQuantity : '';
  }

  #clickOnDecreaseButton(fn) {
    this._container
      .querySelector(DECREASE_BUTTON_PATH)
      .addEventListener('click', function (e) {
        e.preventDefault();
        fn();
      });
  }

  #clickOnIncreaseButton(fn) {
    this._container
      .querySelector(INCREASE_BUTTON_PATH)
      .addEventListener('click', function (e) {
        e.preventDefault();
        fn();
      });
  }

  #clickOnBookmarkButton(fn) {
    this._container
      .querySelector(BOOKMARK_BUTTON_PATH)
      .addEventListener('click', function (e) {
        e.preventDefault();
        fn();
      });
  }
}
