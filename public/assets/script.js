// script.js
const apiRootUrl = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=19533129&app_key=99f99420f7ca835f437b3ab67e21166e';

function fetchRecipe(searchQuery) {
  const apiSearchUrl = `${apiRootUrl}&${searchQuery}`;
  const searchResponse = await fetch(apiSearchUrl);
  
  console.log(searchResponse);
}