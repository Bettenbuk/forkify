import AbstractRecipeListView from './AbstractRecipeListView';

const DEFAULT_MSG = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
const CONTAINER_PATH = '.bookmarks__list';

export default class BookmarkListView extends AbstractRecipeListView {
  constructor() {
    super(CONTAINER_PATH, DEFAULT_MSG);
  }
}
