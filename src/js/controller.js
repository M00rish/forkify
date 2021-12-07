import * as model from './model';
import recipeView from './views/recipeView';

import icons from 'url:../img/icons.svg';
import 'core-js/stable'; //polyfilling js
import 'regenerator-runtime/runtime'; // polyfilling async-await

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const ControlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Spinner
    RenderSpinner(recipeContainer);

    // 1) load Recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};
ControlRecipes();

// window.addEventListener('hashchange', ControlRecipes);

['hashchange', 'load'].forEach(ev => addEventListener(ev, showRecipe));
