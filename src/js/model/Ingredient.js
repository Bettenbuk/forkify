export default class Ingredient {
  #baseQuantity;
  #baseServings;

  constructor(rawIngredient, servings) {
    this.quantity = rawIngredient.quantity;
    this.unit = rawIngredient.unit;
    this.description = rawIngredient.description;
    this.#baseQuantity = this.quantity;
    this.#baseServings = servings;
  }

  setServings(servings) {
    if (this.quantity) {
      this.quantity = (this.#baseQuantity * servings) / this.#baseServings;
    }
  }
}
