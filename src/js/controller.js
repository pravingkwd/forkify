import * as model from './model';
import { MODAL_CLOSE_SEC } from './config';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import PaginationView from './views/paginationView';
import bookmarkedView from './views/bookmarkedView';
import addRecipeView from './views/addRecipeView';

//import icons from '../img/icons.svg'; // parcel1
import icons from 'url:../img/icons.svg'; // parcel2
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import paginationView from './views/paginationView';

if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async function() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    //0 update result view to mark selcted serarch result
    resultsView.update(model.getSearchResultPage());
    // update bookmarks view
    bookmarkedView.update(model.state.bookmarks);
    //1 loading receipe
    await model.loadRecipe(id);

    //2 rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function() {
  try {
    resultsView.renderSpinner();
    // Get search query
    const query = searchView.getQuery();

    if (!query) return;
    // load search result
    await model.loadSearchResults(query);

    //console.log(model.state.search.results);
    resultsView.render(model.getSearchResultPage());

    //4 Render inital pagination
    paginationView.render(model.state.search);

    // Render
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function(gotoPage) {
  console.log('paginarion');
  // render new page
  resultsView.render(model.getSearchResultPage(gotoPage));

  //4 Render inital pagination
  paginationView.render(model.state.search);
};

const controlServings = function(newServings) {
  // Update the recipe servings(in state)
  model.updateServings(newServings);

  // update the receipt view
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function() {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  console.log('add bookmarksssss', model.state.recipe);
  recipeView.update(model.state.recipe);
  // Render bookmarks
  bookmarkedView.render(model.state.bookmarks);
};

const controlBookmarks = function() {
  bookmarkedView.render(model.state.bookmarks);
};

const controlAddRecipe = async function(newRecipe) {
  // upload new recipe data
  try {
    // show loadig spinner
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);

    console.log(model.state.recipe);

    // Render receipe
    recipeView.render(model.state.recipe);
    // sucess message
    addRecipeView.renderMessage();
    // Render the bookmarks view
    bookmarkedView.render(model.state.bookmarks);

    // change id in the url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // close the window from
    setTimeout(function() {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    //console.error(`error is comint ${err}`);
    addRecipeView.renderError(err);
  }
};

const newFeature = function() {
  console.log('Welcome ti new feature');
};

const init = function() {
  bookmarkedView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  newFeature();
};
init();

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
