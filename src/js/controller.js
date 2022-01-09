import 'core-js/stable'; //polyfilling js

import * as model from './model';

import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

// if (module.hot) {
//   module.hot.accept();
// }

const recipeContainer = document.querySelector('.recipe');

const ControlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Spinner
    recipeView.RenderSpinner();

    // 1) load Recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.RenderError();
  }
};

const controlSerachResults = async function () {
  try {
    resultsView.RenderSpinner();
    // 1) get Query
    const query = searchView.getQuery();
    if (!query) {
      resultsView.RenderError('Please Type Something');
      return;
    }

    // 2)  Load Search Results
    await model.loadSearchResults(query);

    // 3) Render Results
    resultsView.render(model.loadResultsPerPage());

    // 4) Render Pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (GotoPage) {
  // 1) Render New Results
  resultsView.render(model.loadResultsPerPage(GotoPage));

  // 2) Render New Pagination
  paginationView.render(model.state.search);
};

const controlServings = function () {
  // Update recipe serving
  model.updateServings();
  // Update recipe view
};

//add event handlers
const init = function () {
  recipeView.addHandlerRender(ControlRecipes);
  searchView.addHandlerSearch(controlSerachResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
