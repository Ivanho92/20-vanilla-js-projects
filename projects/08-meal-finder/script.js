/**
 * Getting DOM into variables
 */
const recipe = document.getElementById("recipe");
const meals = document.getElementById("meals");
const randomBtn = document.getElementById("random");
const searchForm = document.getElementById("search-form");
const searchedKeywords = document.getElementById("searched-keywords");
let closeBtn;

/**
 * EventHandlers
 */
// Search through keywords
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  
  meals.innerHTML = '';

  const searchedValue = e.target[0].value;
  
  if (searchedValue !== '') {
    searchedKeywords.textContent = searchedValue;
    searchedKeywords.parentElement.style.display = 'block';
    getMeal(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedValue}`)
    .then(data => {
      data.meals.forEach(meal => {
        drawMealItem(meal)
      })
    })
    .catch(error => console.error(error));
  } else {
    searchedKeywords.parentElement.style.display = 'none';
    for (let i = 0; i < 12; i++) {
      getMeal('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(data => drawMealItem(data.meals[0]))
        .catch(error => console.error(error));
    }
  }

    
  
})

// Open Recipe
meals.addEventListener('click', e => {
  e.preventDefault();

  if (e.target.classList.contains('meal-info')) {
    const mealID = e.target.getAttribute('data-mealid');
    openMenu(mealID);
  } else if (e.target.parentElement.classList.contains('meal-info')) {
    const mealID = e.target.parentElement.getAttribute('data-mealid');
    openMenu(mealID);
  } else if (e.target.classList.contains('meal-item')) {
    const mealID = e.target.querySelector('.meal-info').getAttribute('data-mealid');
    openMenu(mealID);
  }
})

// Get Random Meals + Open Recipe for first meal
randomBtn.addEventListener('click', () => {
  meals.innerHTML = '';

  const promises = [];
  for (let i = 0; i < 12; i++) {
    promises.push(getMeal('https://www.themealdb.com/api/json/v1/1/random.php'))
  };
  Promise.all(promises)
    .then(data => {
      data.forEach(meal => drawMealItem(meal.meals[0]));
      firstMealItemID = meals.querySelector(':first-child').querySelector('div.meal-info').getAttribute('data-mealid');
      openMenu(firstMealItemID);
    })
    .catch(error => console.error(error));
})

/**
 * UI Functions
 */
function closeMenu() {
  recipe.classList.remove('show');
}

function openMenu(mealID) {
  getMeal(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(data => {
      drawRecipe(data.meals[0]);
      
      recipe.classList.add('show');
      
      // Close Recipe
      closeBtn = document.querySelector(".close");
      closeBtn.addEventListener('click', e => {
        e.preventDefault();
        closeMenu();
      });
    })
    .catch(error => console.error(error));
}

function drawMealItem(meal) {
  const a = document.createElement('a');
  a.className = 'meal-item';
  a.setAttribute('href', '#');
  a.innerHTML = `
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <div class="meal-info" data-mealid="${meal.idMeal}">
      <h3>${meal.strMeal}</h3>
    </div>
  `
  meals.append(a);
}

function drawRecipe(meal) {
  let ingredients = '';
  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;
    if(meal[ingredientKey] !== "" && meal[ingredientKey] !== null) {
      ingredients += `<li>${meal[ingredientKey]} - ${meal[measureKey]}</li>`
    };
  }

  let instructions = meal.strInstructions.split('\r\n');
  instructions = instructions.filter(step => step != '');
  instructions = instructions.filter(step => !/^[0-9]$/.test(step));

  let instructionsList = instructions.map(step => `<li>${step}</li>`);
  instructionsList = instructionsList.join('');

  recipe.innerHTML = `
    <a href="#" class="close">
      <i class="fas fa-times close" aria-hidden="true"></i>
    </a>
    <img src="${meal.strMealThumb}">
    <div class="bg-recipe">
      <div class="container">
        <h2>${meal.strMeal}</h2>
        <div class="labels">
          <p class="category"><span>Category: </span>${meal.strCategory}</p>
          <p class="area"><span>Origin: </span>${meal.strArea}</p>
        </div>
        <div class="ingredients">
          <h3>Ingredients</h3>
          <ul>
            ${ingredients}
          </ul>
        </div>
        <div class="instructions">
          <h3>Instructions</h3>
          <ul>${instructionsList}</ul>
        </div>
      </div>
    </div>
  `;
}

/**
 * API Fetch
 */
async function getMeal(endpoint) {
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error;
  const data = await res.json();
  return data;
}

/**
 * App init
 */
for (let i = 0; i < 12; i++) {
  getMeal('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(data => drawMealItem(data.meals[0]))
    .catch(error => console.error(error));
}