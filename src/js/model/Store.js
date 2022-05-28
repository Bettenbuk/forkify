export default class Store {
  #store;

  constructor(dataName, createObjectFromStoreFn) {
    this.dataName = dataName;
    if (localStorage.getItem(this.dataName)) {
      this.#store = new Map(JSON.parse(localStorage.getItem(this.dataName)));
      this.#store.forEach((value, key) =>
        this.#store.set(key, createObjectFromStoreFn(value))
      );
    } else {
      this.#store = new Map();
    }
  }

  _storeChanges() {
    localStorage.setItem(
      this.dataName,
      JSON.stringify(Array.from(this.#store.entries()))
    );
  }

  data() {
    return this.#store;
  }

  getAll() {
    return Array.from(this.#store.values());
  }

  add(id, item) {
    this.#store.set(id, item);
    this._storeChanges();
  }

  get(id) {
    return this.#store.get(id);
  }

  delete(id) {
    this.#store.delete(id);
    this._storeChanges();
  }

  update(id, item) {
    if (this.get(id)) this.add(id, item);
  }

  reset() {
    localStorage.removeItem(this.dataName);
  }
}
