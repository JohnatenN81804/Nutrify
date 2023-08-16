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

  for (result of searchData.hits) { // result.recipe
    let card = `<div class="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 align-self-end">
                  <div class="card mt-2">
                    <div class="card-header text-center">
                      <a href="${result.recipe.shareAs}" target="_blank">
                      <img class="card-img-top img-fluid food-pic" src="${result.recipe.images.SMALL.url}"/>
                      </a>
                    </div>
                    <div class="card-body">
                      <h6 class="card-title">${result.recipe.label}</h6>
                      <p class="card-text">${result.recipe.cuisineType[0]}</p>
                      <p class="card-text">Calories: <span style="font-family:monospace">${parseInt(result.recipe.calories)}</span></p>
                      <p class="card-text">Number of ingredients: <span style="font-size: 16px">${result.recipe.ingredients.length}</span></p>
                      <ul class="health-labels mt-2"> 
                        <li>${result.recipe.healthLabels[0]}</li>
                        <li>${result.recipe.healthLabels[1]}</li>
                        <li>${result.recipe.healthLabels[2]}</li>
                        <li>${result.recipe.healthLabels[3]}</li>
                      </ul>
                      <br/>
                      <div class="nutrition-container">
                        <p class="card-text"><strong>Nutrition Details</strong></p>
                        <ul class="nutrition-info">
                          <li>Calcium: ${result.recipe.totalDaily.CA.quantity.toFixed(1)}</li>
                          <li>Carbs: ${result.recipe.totalDaily.CHOCDF.quantity.toFixed(1)}</li>
                          <li>Cholesterol: ${result.recipe.totalDaily.CHOLE.quantity.toFixed(1)}</li>
                          <li>Energy (K-cal): ${result.recipe.totalDaily.ENERC_KCAL.quantity.toFixed(1)}</li>
                          <li>Saturated: ${result.recipe.totalDaily.FASAT.quantity.toFixed(1)}</li>
                          <li>Fat: ${result.recipe.totalDaily.FAT.quantity.toFixed(1)}</li>
                          <li>Iron: ${result.recipe.totalDaily.FE.quantity.toFixed(1)}</li>
                        </ul>
                      </div>
                    </div>
                    <div class="card-footer">
                      <button class="btn btn-success view-nutrition" style="width:100%">View Nutrition Information</button>
                      <button class="btn btn-success mt-1" style="width:100%">Add to Recipe Book</button>
                    </div>
                  </div>
                </div>`
    
    resultCards.append(card);
  }

  // event listener to show nutrition details on the search result card
  $('.view-nutrition').on('click', function () {
    const card = $(this).closest('.card');
    const nutritionContainer = card.children('.card-body').children('.nutrition-container');
    
    nutritionContainer.toggle();
  });
}

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