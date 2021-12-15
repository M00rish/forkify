import * as model from './model';
import recipeView from './views/recipeView';

import 'core-js/stable'; //polyfilling js
import searchView from './views/searchView';
import resultsView from './views/resultsView';

if (module.hot) {
  module.hot.accept;
}

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
    if (!query) return;

    // 2)  Load Search Results
    await model.loadSearchResults(query);

    // 3) Render Results
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

//add event handlers
const init = function () {
  recipeView.addHandlerRender(ControlRecipes);
  searchView.addHandlerSearch(controlSerachResults);
};
init();
