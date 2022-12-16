export const PRODUCTS_API_URL =
  "https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=76c35ff255d949609a93b46140528959&number=25&query=";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getIngredients = async (query) => {
  // console.log("calling promise");
  await sleep(500);
  return ["aaaa", "bbbb"];
  // try {
  //   const res = await fetch(PRODUCTS_API_URL + query);
  //   const ingredients = await res.json();
  //   console.log({ ingredients });
  //   return ingredients.map((i) => i.name);
  // } catch (e) {
  //   console.error(e);
  // }
};

// export const debouncedGetIngredients = debounce(getIngredients, 400);
