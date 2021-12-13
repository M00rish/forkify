import 'regenerator-runtime/runtime'; // polyfilling async-await
import { API_URL } from './Config';
import { getJson } from './helpers';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJson(`${API_URL}/${id}`);

    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    throw err;
  }
};

loadSearchResults = async function (query) {
  try {
    const data = await getJson(`${API_URL}/search=${query}`);
  } catch (err) {
    throw err;
  }
};
