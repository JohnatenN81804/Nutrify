const apiRootUrl = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=19533129&app_key=99f99420f7ca835f437b3ab67e21166e';
const searchBtn = $(`.search-btn`);
const resultCards = $('#result-cards')

async function fetchRecipe(searchQuery) {
  // call fetch() method: post here..
  // then express server will get that POST request with the search query and render the handlebars search page.
  // any client-side logic browser for the search page results will then be on the /assets/search.js file.
  // send "searchQuery" to express via the POST fetch() call.

  const apiSearchUrl = `${apiRootUrl}&q=${searchQuery}`;
  const searchResponse = await fetch(apiSearchUrl);

  const searchData = await searchResponse.json();
  
  renderResults(searchData);
}

// render each search result as a bootstrap card
function renderResults(searchData) {
  console.log(searchData);

  resultCards.html(``);

  for (result of searchData.hits) {

    const nutrients = result.recipe.totalDaily;
    let ingredients = result.recipe.ingredients; // ingredients.food for title and ingredients.text for description
    let ingredientsList = ingredients.map(item => `<li>${item.text}</li>`).join('');

    let card = `<div class="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 align-self-end">
                  <div class="card mt-2">
                    <div class="card-header text-center">
                      <a href="${result.recipe.shareAs}" target="_blank">
                      <img class="card-img-top img-fluid food-pic" src="${result.recipe.images.SMALL.url}"/>
                      </a>
                    </div>
                    <div class="card-body">
                      <h6 class="card-title" id="recipe-name">${result.recipe.label}</h6>
                      <p class="card-text" id="cuisine-type">${result.recipe.cuisineType[0]}</p>
                      <p class="card-text" id="calories">Calories: <span style="font-family:monospace">${parseInt(result.recipe.calories)}</span></p>
                      <p class="card-text" id="number-of-ingredients">Number of ingredients: <span style="font-size: 16px">${result.recipe.ingredients.length}</span></p>
                      <div class="information-container" id="nutrition-container">
                        <p class="card-text"><strong>Nutrition Details</strong></p>
                        <ul class="nutrition-info">
                          <li>${nutrients.CA.label}: ${nutrients.CA.quantity.toFixed(1)}</li>
                          <li>${nutrients.CHOCDF.label}: ${nutrients.CHOCDF.quantity.toFixed(1)}</li>
                          <li>${nutrients.CHOLE.label}: ${nutrients.CHOLE.quantity.toFixed(1)}</li>
                          <li>${nutrients.ENERC_KCAL.label}: ${nutrients.ENERC_KCAL.quantity.toFixed(1)}</li>
                          <li>${nutrients.FASAT.label}: ${nutrients.FASAT.quantity.toFixed(1)}</li>
                          <li>${nutrients.FAT.label}: ${nutrients.FAT.quantity.toFixed(1)}</li>
                          <li>${nutrients.FE.label}: ${nutrients.FE.quantity.toFixed(1)}</li>
                          <li>${nutrients.FIBTG.label}: ${nutrients.FIBTG.quantity.toFixed(1)}</li>
                          <li>${nutrients.FOLDFE.label}: ${nutrients.FOLDFE.quantity.toFixed(1)}</li>
                          <li>${nutrients.K.label}: ${nutrients.K.quantity.toFixed(1)}</li>
                          <li>${nutrients.MG.label}: ${nutrients.MG.quantity.toFixed(1)}</li>
                          <li>${nutrients.NA.label}: ${nutrients.NA.quantity.toFixed(1)}</li>
                          <li>${nutrients.NIA.label}: ${nutrients.NIA.quantity.toFixed(1)}</li>
                          <li>${nutrients.P.label}: ${nutrients.P.quantity.toFixed(1)}</li>
                          <li>${nutrients.PROCNT.label}: ${nutrients.PROCNT.quantity.toFixed(1)}</li>
                          <li>${nutrients.RIBF.label}: ${nutrients.RIBF.quantity.toFixed(1)}</li>
                          <li>${nutrients.THIA.label}: ${nutrients.THIA.quantity.toFixed(1)}</li>
                          <li>${nutrients.TOCPHA.label}: ${nutrients.TOCPHA.quantity.toFixed(1)}</li>
                          <li>${nutrients.VITA_RAE.label}: ${nutrients.VITA_RAE.quantity.toFixed(1)}</li>
                          <li>${nutrients.VITB12.label}: ${nutrients.VITB6A.quantity.toFixed(1)}</li>
                          <li>${nutrients.VITB12.label}:: ${nutrients.VITB12.quantity.toFixed(1)}</li>
                          <li>${nutrients.VITC.label}: ${nutrients.VITC.quantity.toFixed(1)}</li>
                          <li>${nutrients.VITD.label}: ${nutrients.VITD.quantity.toFixed(1)}</li>
                          <li>${nutrients.VITK1.label}: ${nutrients.VITK1.quantity.toFixed(1)}</li>
                          <li>${nutrients.ZN.label}: ${nutrients.ZN.quantity.toFixed(1)}</li>
                        </ul>
                      </div>
                      <div class="information-container" id="ingredients-container">
                      <p class="card-text"><strong>Ingredients</strong></p>
                      <p class="ingredient-info">
                        <ul>
                          ${ingredientsList}
                        </ul>
                      </p>
                      </div>
                    </div>
                    <div class="card-footer">
                      <button class="btn btn-success btn-green view-ingredients" style="width:100%">View Ingredients</button>
                      <button class="btn btn-success btn-green view-nutrition mt-1" style="width:100%">View Nutrition Information</button>
                      <button class="btn btn-primary btn-add-recipe mt-1" style="width:100%">Add to Recipe Box</button>
                    </div>
                  </div>
                </div>`
    
    resultCards.append(card);
  }

  // event listener to show nutrition details on the search result card
  $('.view-nutrition').on('click', function () {
    const card = $(this).closest('.card');
    const nutritionContainer = card.children('.card-body').children('#nutrition-container');
    
    nutritionContainer.toggle();
  });

  $('.view-ingredients').on('click', function () {
    const card = $(this).closest('.card');
    const ingredientsContainer = card.children('.card-body').children('#ingredients-container');
    
    ingredientsContainer.toggle();
  });

  $('.btn-add-recipe').on('click', function() {
    const card = $(this).closest('.card');
    const recipeName = card.children('.card-body').children('#recipe-name');
    const cuisineType = card.children('.card-body').children('#cuisine-type');
    const calories = card.children('.card-body').children('#calories');
    const numberOfIngredients = card.children('.card-body').children('#number-of-ingredients');
    
  })
};

// when search button is clicked, send input
searchBtn.on('click', () => {
  let searchQuery = $(`.search-box`).val();

  // check to see if search box contains any input
  if (searchQuery !== '') {
    
    fetchRecipe(searchQuery);
  } else {
    console.log(`\ninvalid search query (null)`);
  }
});