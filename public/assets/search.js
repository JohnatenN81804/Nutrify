const apiRootUrl = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=19533129&app_key=99f99420f7ca835f437b3ab67e21166e';
const searchBtn = $(`.search-btn`);
const logoutBtn = $('#logout-btn')
const resultCards = $('#result-cards')

async function fetchRecipe(searchQuery) {
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
                        <p class="card-text"><strong>Nutrition Percent Daily Value</strong></p>
                        <ul class="nutrition-info">
                          <li>${nutrients.CA.label}: ${nutrients.CA.quantity.toFixed(1)} %</li>
                          <li>${nutrients.CHOCDF.label}: ${nutrients.CHOCDF.quantity.toFixed(1)} %</li>
                          <li>${nutrients.CHOLE.label}: ${nutrients.CHOLE.quantity.toFixed(1)} %</li>
                          <li>${nutrients.ENERC_KCAL.label}: ${nutrients.ENERC_KCAL.quantity.toFixed(1)} %</li>
                          <li>${nutrients.FASAT.label}: ${nutrients.FASAT.quantity.toFixed(1)} %</li>
                          <li>${nutrients.FAT.label}: ${nutrients.FAT.quantity.toFixed(1)} %</li>
                          <li>${nutrients.FE.label}: ${nutrients.FE.quantity.toFixed(1)} %</li>
                          <li>${nutrients.FIBTG.label}: ${nutrients.FIBTG.quantity.toFixed(1)} %</li>
                          <li>${nutrients.FOLDFE.label}: ${nutrients.FOLDFE.quantity.toFixed(1)} %</li>
                          <li>${nutrients.K.label}: ${nutrients.K.quantity.toFixed(1)} %</li>
                          <li>${nutrients.MG.label}: ${nutrients.MG.quantity.toFixed(1)} %</li>
                          <li>${nutrients.NA.label}: ${nutrients.NA.quantity.toFixed(1)} %</li>
                          <li>${nutrients.NIA.label}: ${nutrients.NIA.quantity.toFixed(1)} %</li>
                          <li>${nutrients.P.label}: ${nutrients.P.quantity.toFixed(1)} %</li>
                          <li>${nutrients.PROCNT.label}: ${nutrients.PROCNT.quantity.toFixed(1)} %</li>
                          <li>${nutrients.RIBF.label}: ${nutrients.RIBF.quantity.toFixed(1)} %</li>
                          <li>${nutrients.THIA.label}: ${nutrients.THIA.quantity.toFixed(1)} %</li>
                          <li>${nutrients.TOCPHA.label}: ${nutrients.TOCPHA.quantity.toFixed(1)} %</li>
                          <li>${nutrients.VITA_RAE.label}: ${nutrients.VITA_RAE.quantity.toFixed(1)} %</li>
                          <li>${nutrients.VITB12.label}: ${nutrients.VITB6A.quantity.toFixed(1)} %</li>
                          <li>${nutrients.VITB12.label}: ${nutrients.VITB12.quantity.toFixed(1)} %</li>
                          <li>${nutrients.VITC.label}: ${nutrients.VITC.quantity.toFixed(1)} %</li>
                          <li>${nutrients.VITD.label}: ${nutrients.VITD.quantity.toFixed(1)} %</li>
                          <li>${nutrients.VITK1.label}: ${nutrients.VITK1.quantity.toFixed(1)} %</li>
                          <li>${nutrients.ZN.label}: ${nutrients.ZN.quantity.toFixed(1)} %</li>
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
                      <div class="row">
                        <div class="col-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 col-xxl-6 d-flex justify-content-center">
                          <button class="mx-auto w-100 btn btn-success btn-green view-nutrition mt-1">Nutrients</button>
                        </div>
                        <div class="col-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 col-xxl-6 d-flex justify-content-center">
                          <button class="mx-auto w-100 btn btn-success btn-green view-ingredients mt-1" text-nowrap>Ingredients</button>
                        </div>
                      <button class="btn btn-success btn-add-recipe mt-1">Add</button>
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
    const recipeName = card.find('#recipe-name').text();
    const cuisineType = card.find('#cuisine-type').text();
    const calories = card.find('#calories span').text();
    const numberOfIngredients = card.find('#number-of-ingredients span').text();
    const imageLink = card.find('.food-pic').attr('src');
    const recipeLink = card.find('.food-pic').parent().attr('href');

    const recipeData = {
      recipeName: recipeName,
      cuisineType: cuisineType,
      calories: calories,
      numberOfIngredients: numberOfIngredients,
      imageLink: imageLink,
      recipeLink: recipeLink
    };
  
    console.log(JSON.stringify(recipeData));
    // call function here to do something else with this data, like store it in the user's recipe box..
    // example: function addRecipeToBox(name, type, cals, ingredientsQty, nutritionInfo, IngredientsInfo) {};
    // ...
    // Send recipe data to the server
    fetch('/api/recipeBox', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeData),
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      location.href = '/recipeBox';
    })
    .catch(error => {
      console.error(error);
      alert('Adding recipe failed!');
    });
  })
};

// when search button is clicked, send input
searchBtn.on('click', () => {
  anime({
    targets: '.navbar-brand',
    translateX: 270,
    direction: 'alternate',
    easing: 'easeInOutSine'
  });

  let searchQuery = $(`.search-box`).val();

  // check to see if search box contains any input
  if (searchQuery !== '') {
    
    fetchRecipe(searchQuery);
  } else {
    console.log(`\ninvalid search query (null)`);
  }
});

logoutBtn.on('click', () => {
  // Make fetch POST to hit DELETE route to destroy user session, thus logging out user.
  fetch('/api/user', {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    alert('logged out!');
    location.href = '/';
  })
  .catch(error => {
    console.error(error);
    alert("logging out user failed");
  })
});