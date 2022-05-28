import AbstractRecipeListView from './AbstractRecipeListView';

const CONTAINER_PATH = '.results';
const DEFAULT_MSG = 'No recipes found for your query! Please try again!';

export default class RecipeListView extends AbstractRecipeListView {
  constructor() {
    super(CONTAINER_PATH, DEFAULT_MSG);
  }
}
