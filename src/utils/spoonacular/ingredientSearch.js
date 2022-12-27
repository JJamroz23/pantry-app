export const PRODUCTS_API_URL =
  "https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=76c35ff255d949609a93b46140528959&number=25&query=";

export const getIngredients = async (query) => {
  try {
    const res = await fetch(PRODUCTS_API_URL + query);
    const ingredients = await res.json();
    console.log({ ingredients });
    return ingredients.map((i) => i.name);
  } catch (e) {
    console.error(e);
  }
};
