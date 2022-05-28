import icons from 'url:../../img/icons.svg';
import AbstractDataView from './AbstractDataView';

export default class AbstractRecipeListView extends AbstractDataView {
  constructor(containerPath, defaultMsg) {
    const container = document.querySelector(containerPath);
    super(container, defaultMsg);
  }

  render(recipeList) {
    if (recipeList.length === 0) {
      this.message();
    } else {
      this._render(
        recipeList.map(x => this.#createRecipeLisItemtHtml(x)).join('')
      );
    }
  }

  refresh(recipeList) {
    this._refresh(
      recipeList.map(x => this.#createRecipeLisItemtHtml(x)).join('')
    );
  }

  #createRecipeLisItemtHtml(item) {
    const id = window.location.hash.slice(1);
    const active = id === item.id ? 'preview__link--active' : '';
    const own = item.isOwn ? `` : 'hidden';

    return ` 
    <li class="preview">
        <a class="preview__link ${active}" href="#${item.id}">
            <figure class="preview__fig">
                <img src="${item.imageUrl}" alt="Test" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${item.title}</h4>
                <p class="preview__publisher">${item.publisher}</p>
                <div class="preview__user-generated ${own}">
                    <svg>
                        <use href="${icons}#icon-users"></use>
                    </svg>
                </div>
            </div>
        </a>
    </li>`;
  }
}
