export default class RecipeListItem {
  constructor(rawRecipe) {
    this.id = rawRecipe.id;
    this.title = rawRecipe.title;
    this.publisher = rawRecipe.publisher;
    this.imageUrl = rawRecipe.image_url
      ? rawRecipe.image_url
      : rawRecipe.imageUrl;
    this.isOwn = rawRecipe.key ? true : false;
  }
}
