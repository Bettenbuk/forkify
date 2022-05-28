import icons from 'url:../../img/icons.svg';

export default class AbstractDataView {
  _container;
  _defaultMsg;

  constructor(container, defaultMsg) {
    this._container = container;
    this._defaultMsg = defaultMsg;
  }

  spinner() {
    this._render(this._createSpinerHtml());
  }

  error(message) {
    this._render(this._createMessageHtml(message), true);
  }

  message(message = this._defaultMsg) {
    this._render(this._createMessageHtml(message), false);
  }

  _render(html) {
    this._container.innerHTML = '';
    this._container.insertAdjacentHTML('afterbegin', html);
  }

  _refresh(html) {
    const newDOM = document.createRange().createContextualFragment(html);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(this._container.querySelectorAll('*'));

    for (let i = 0; i < newElements.length; i++) {
      const newElement = newElements[i];
      const currentElement = currentElements[i];
      if (!newElement.isEqualNode(currentElement)) {
        Array.from(newElement.attributes).forEach(x =>
          currentElement.setAttribute(x.name, x.value)
        );
        if (newElement.firstChild?.nodeValue.trim() !== '') {
          currentElement.textContent = newElement.textContent;
        }
      }
    }
  }

  _createSpinerHtml() {
    return `
      <div class="spinner">
        <svg>
            <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
  }

  _createMessageHtml(message, isError) {
    let icon;
    if (isError) icon = `${icons}#icon-alert-triangle`;
    else icon = `${icons}#icon-smile`;
    return `
      <div class="message">
        <div>
          <svg>
            <use href="${icon}"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
  }
}
