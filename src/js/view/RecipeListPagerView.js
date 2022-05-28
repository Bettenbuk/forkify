import icons from 'url:../../img/icons.svg';

const CONTAINER_PATH = '.pagination';
const PREV_BUTTON_PATH = '.pagination__btn--prev';
const NEXT_BUTTON_PATH = '.pagination__btn--next';

export default class RecipeListPagerView {
  #container = document.querySelector(CONTAINER_PATH);
  #prevFn;
  #nextFn;

  constructor(showPrevRecipeListPage, showNextRecipeListPage) {
    this.#prevFn = showPrevRecipeListPage;
    this.#nextFn = showNextRecipeListPage;
  }

  activatePagerButtons(prev, next) {
    this.#container.innerHTML = '';
    this.#container.insertAdjacentHTML(
      'afterbegin',
      this.#getPagerButtonsHtml(prev, next)
    );
    if (prev) this.#clickOnPrevButton(this.#prevFn);
    if (next) this.#clickOnNextButton(this.#nextFn);
  }

  #getPagerButtonsHtml(prev, next) {
    let html = '';
    if (prev) html += this.#getPrevButtonHtml(prev);
    if (next) html += this.#getNextButtonHtml(next);
    return html;
  }

  #getPrevButtonHtml(prev) {
    return `
      <button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${prev}</span>
      </button>`;
  }
  #getNextButtonHtml(next) {
    return `
      <button class="btn--inline pagination__btn--next">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      <span>Page ${next}</span>
    </button>`;
  }

  #clickOnPrevButton(fn) {
    this.#container
      .querySelector(PREV_BUTTON_PATH)
      .addEventListener('click', function (e) {
        e.preventDefault();
        fn();
      });
  }

  #clickOnNextButton(fn) {
    this.#container
      .querySelector(NEXT_BUTTON_PATH)
      .addEventListener('click', function (e) {
        e.preventDefault();
        fn();
      });
  }
}
