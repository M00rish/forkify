import * as model from './model';
import recipeView from './views/recipeView';

import 'core-js/stable'; //polyfilling js

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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

//add event handlers
const init = function () {
  recipeView.addHandlerRender(ControlRecipes);
};
init();
