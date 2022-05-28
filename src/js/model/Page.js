export default class Page {
  static #size;
  static #first = 1;

  static setSize(size) {
    Page.#size = size;
  }

  #last;
  #current;

  constructor(numberOfItems) {
    this.#last = Math.ceil(numberOfItems / Page.#size);
    this.#current = Page.#first;
  }

  getCurrent() {
    return this.#current;
  }

  next() {
    if (this.#current === this.#last) throw new Error('Page is too high');
    return ++this.#current;
  }

  prev() {
    if (this.#current === Page.#first) throw new Error('Page is too low');
    return --this.#current;
  }

  getNext() {
    if (this.#current === this.#last) return null;
    return this.#current + 1;
  }

  getPrev() {
    if (this.#current === Page.#first) return null;
    return this.#current - 1;
  }

  getItemsFrom() {
    return (this.#current - 1) * Page.#size;
  }

  getItemsTo() {
    return this.#current * Page.#size;
  }
}
