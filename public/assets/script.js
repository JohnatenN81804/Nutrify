// script.js
const apiRootUrl = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=19533129&app_key=99f99420f7ca835f437b3ab67e21166e';

async function fetchRecipe(searchQuery) {
  const apiSearchUrl = `${apiRootUrl}&q=${searchQuery}`;
  const searchResponse = await fetch(apiSearchUrl);

  const searchData = await searchResponse.json();
  console.log(searchData);
}


fetchRecipe("tacos");

