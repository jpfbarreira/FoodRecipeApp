const APP_ID = "448620a5";
const APP_KEY = "c908d42ef60cd64256b3e6570a2eda6c";

const mealName = document.querySelector("#search");
const mealsArea = document.querySelector("#mealsArea");

let listRandomMeals = [];
let random = true;

mealName.addEventListener("click", (e) => {
  e.preventDefault();
  const searchQuery = document.querySelector("#search-input").value;
  getMealByFoodName(searchQuery);
});


function loadpage() {
  getRandomMeals()
}

function generateRandomMealsCards(recipes) {
  let generateHTML = "";
  recipes.map((recipe) => {
    console.log(recipe)
    generateHTML += `
    <div class="mealCard-container">
  <img src=${recipe.strMealThumb} alt="food" />
  <div class="meal-info">
    <div class="recipe-header">
      <h4>${recipe.strMeal}</h4>
    </div>
    <div class="recipe-decription">
      <div class="recipe-info">
        <p><b>Calories: </b>no-info</p>
        <p><b>Area: </b>${recipe.strArea ? recipe.strArea : 'none'} </p>
        <p><b>Tags: </b>${recipe.strTags ? recipe.strTags.split(",")[0] : 'none'}</p>
      </div>
      <div class="view-btn">
        <a href="${recipe.strSource}" target="blank_">
          <button class="view-recipe-btn">View Recipe</button>
        </a>
      </div>
    </div>
  </div>
</div>
    `;
  });
  mealsArea.innerHTML = generateHTML;
}

function generateMealsCards(recipes) {
  let generateHTML = "";
  recipes.map((recipe) => {
    console.log(recipe.recipe.healthLabels[0]);
    generateHTML += `
    <div class="mealCard-container">
  <img src=${recipe.recipe.image} alt="food" />
  <div class="meal-info">
    <div class="recipe-header">
      <h4>${recipe.recipe.label}</h4>
    </div>
    <div class="recipe-decription">
      <div class="recipe-info">
        <p><b>Calories: </b>${parseInt(recipe.recipe.calories)}</p>
        <p><b>Area: </b>${
          recipe.recipe.cuisineType[0] ? recipe.recipe.cuisineType[0] : "none"
        }</p>
        <p><b>Tags: </b>${
          recipe.recipe.dietLabels[0] ? recipe.recipe.dietLabels[0] : "none"
        }</p>
      </div>
      <div class="view-btn">
        <a href=${recipe.recipe.url} target="blank_">
          <button class="view-recipe-btn">View Recipe</button>
        </a>
      </div>
    </div>
  </div>
</div>
    `;
  });
  mealsArea.innerHTML = generateHTML;
}

async function getMealByFoodName(foodName) {
  let generateHTML = `<div class="loader"></div>`
  mealsArea.innerHTML = generateHTML
  if (foodName) {
    response = await fetch(
      `https://api.edamam.com/search?q=${foodName}&app_id=${APP_ID}&app_key=${APP_KEY}&to=24`
    );
    const data = await response.json();
    console.log(data);
    generateMealsCards(data.hits);
  } else {
    window.alert("Invalid Input");
  }
}

async function getRandomMeals() {
  let generateHTML = `<div class="loader"></div>`
  mealsArea.innerHTML = generateHTML
  while (listRandomMeals.length != 24) {
    response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await response.json();
    const randomRecipe = data.meals[0];
    listRandomMeals.push(randomRecipe);
  }
  generateRandomMealsCards(listRandomMeals)
}
