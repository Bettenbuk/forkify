import Model from './Model.js';
import View from './View.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const state = {
  recipe: null,
  recipeList: null,
};

const model = new Model();
const view = new View(
  loadAndShowRecipe,
  handleBookmark,
  decreaseService,
  increaseService,
  loadAndShowRecipeList,
  showPrevRecipeListPage,
  showNextRecipeListPage,
  addRecipe
);

function init() {
  view.renderBookmarkList(model.getBookmarkList());
}

init();

async function loadAndShowRecipe() {
  try {
    const id = window.location.hash.slice(1);
    if (id) {
      view.waitForRecipe();
      state.recipe = await model.loadRecipe(id);
      view.showRecipe(state.recipe);
      if (state.recipeList) {
        view.refreshRecipeList(state.recipeList.currentPageItems());
      }
    }
  } catch (err) {
    console.error(`!+!+!+! ${err}`);
    view.errorRecipe();
  }
}

async function loadAndShowRecipeList() {
  try {
    const query = view.getQuery();
    if (query) {
      view.waitForRecipeList();
      state.recipeList = await model.loadRecipeList(query);
      view.showRecipeList(
        state.recipeList.currentPageItems(),
        state.recipeList.getPrevPageNumber(),
        state.recipeList.getNextPageNumber()
      );
      view.refreshBookmarkList(model.getBookmarkList());
    }
  } catch (err) {
    console.error(`!+!+!+! ${err}`);
    view.errorRecipeList();
  }
}

function showPrevRecipeListPage() {
  try {
    view.showRecipeList(
      state.recipeList.prevPageItems(),
      state.recipeList.getPrevPageNumber(),
      state.recipeList.getNextPageNumber()
    );
  } catch (err) {
    console.error(`!+!+!+! ${err}`);
    view.errorRecipe();
  }
}

function showNextRecipeListPage() {
  try {
    view.showRecipeList(
      state.recipeList.nextPageItems(),
      state.recipeList.getPrevPageNumber(),
      state.recipeList.getNextPageNumber()
    );
  } catch (err) {
    console.error(`!+!+!+! ${err}`);
    view.errorRecipe();
  }
}

function decreaseService() {
  try {
    state.recipe.decrease();
    view.showRecipe(state.recipe);
  } catch (err) {
    console.error(`!+!+!+! ${err}`);
    view.errorRecipe();
  }
}

function increaseService() {
  try {
    state.recipe.increase();
    view.showRecipe(state.recipe);
  } catch (err) {
    console.error(`!+!+!+! ${err}`);
    view.errorRecipe();
  }
}

function handleBookmark() {
  try {
    model.handleBookmark(state.recipe);
    view.showRecipe(state.recipe);
    view.renderBookmarkList(model.getBookmarkList());
  } catch (err) {
    console.error(`!+!+!+! ${err}`);
    view.errorRecipe();
  }
}

async function addRecipe(recipeFromUI) {
  try {
    view.waitForAddRecipe();
    state.recipe = await model.addRecipe(recipeFromUI);
    view.showRecipe(state.recipe);
    window.history.pushState(null, '', `#${state.recipe.id}`);
    handleBookmark();
    view.closeAddRecipeForm();
  } catch (err) {
    console.error(`!+!+!+! ${err}`);
    view.errorAddRecipe();
  }
}
