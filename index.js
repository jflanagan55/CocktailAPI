const baseIngredientURL =
  "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
const baseNameURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const displayBody = document.querySelector("#display-body");

function fetchRandomCocktail() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => displayDrinkInfo(data))
    .catch(errorHandler);
}

function fetchCocktailByIngredient() {
  const ingInput = document.querySelector("#ingredientInput").value;
  if (nameInput === "") {
    errorHandler();
  } else {
    return fetch(`${baseIngredientURL}${ingInput}`)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch(errorHandler);
  }
}

function fetchCocktailByName() {
  const nameInput = document.querySelector("#nameInput").value;
  if (nameInput === "") {
    errorHandler();
  } else {
    return fetch(`${baseNameURL}${nameInput}`)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch(errorHandler);
  }
}

const ingSearchButton = document.querySelector("#ingSearchButton");
ingSearchButton.addEventListener("click", ingredientResults);

const ingInput = document.querySelector("#ingredientInput");
ingInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector("#ingSearchButton").click();
  }
});

const nameSearchButton = document.querySelector("#nameSearchButton");
nameSearchButton.addEventListener("click", nameResults);

const nameInput = document.querySelector("#nameInput");
nameInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector("#nameSearchButton").click();
  }
});

const randomCocktailBtn = document.querySelector("#randomCocktailBtn");
randomCocktailBtn.addEventListener("click", async()=>{
    fetchRandomCocktail();
    openModal();
});

function openModal(){
    const modal = document.querySelector('.modal');
    modal.classList.add('is-active')
}
function closeModal(){
    const modal = document.querySelector('.modal');
    modal.classList.remove('is-active')
}

function makeResultItem (title){
    let link = document.createElement('a');
    link.classList.add("panel-block")
    link.classList.add('is-justify-content-center')
    link.innerText = title;
    return link;
}
async function ingredientResults() {
  clearDisplayBody();
  const data = await fetchCocktailByIngredient();
  if (data === undefined) {
    return;
  } else if (data.drinks === null) {
    errorHandler();
  } else {
      
    data.drinks.forEach((drink) => {
        let resultItem = makeResultItem(drink.strDrink);
        displayBody.append(resultItem);
        resultItem.addEventListener("click", () => {
        displayDrinkInfoHelper(drink.idDrink);
      });
    });

    resetInputBoxes();
  }
}
async function nameResults() {
  clearDisplayBody();
  const data = await fetchCocktailByName();
  if (data === undefined) {
    return;
  } else if (data.drinks === null) {
    errorHandler();
  } else {
    data.drinks.forEach((drink) => {
        let resultItem = makeResultItem(drink.strDrink);
        displayBody.append(resultItem);
        resultItem.addEventListener("click", () => {
        displayDrinkInfoHelper(drink.idDrink);
      });
    });
  }
  resetInputBoxes();
}

function clearDisplayBody() {
  while (displayBody.firstChild) {
    displayBody.removeChild(displayBody.firstChild);
  }
}

function displayDrinkInfoHelper(drink) {
  return fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink}`
  )
    .then((res) => res.json())
    .then((data) => displayDrinkInfo(data));
}
function displayDrinkInfo(drink) {
  resetInputBoxes();
  const drinkInfo = drink.drinks[0];
  console.log(drinkInfo)

  const drinkTitle = document.querySelector("#drink-title");
  drinkTitle.innerText = drinkInfo.strDrink;

  const drinkImage = document.querySelector("#drink-image");
  drinkImage.src = drinkInfo.strDrinkThumb
  drinkImage.alt = `${drinkTitle.innerText}`;


const ingContainer = document.querySelector('#ing-container')
  for (let i = 1; i < 15; i++) {
    if (drinkInfo[`strIngredient${i}`] === null) {
      break;
    } else {
      if (drinkInfo[`strMeasure${i}`] === null) {
        let li = document.createElement("li");
        li.innerText = drinkInfo[`strIngredient${i}`];
        ingContainer.append(li);
      } else {
        let li = document.createElement("li");
        let measure = drinkInfo[`strMeasure${i}`];
        let ingredient = drinkInfo[`strIngredient${i}`];
        li.innerText = `${measure} ${ingredient}`;
        ingContainer.append(li);
      }
    }
  }
  const directionContainer = document.querySelector("#direction-container");
  directionContainer.innerText = drinkInfo.strInstructions;

  const modal = document.querySelector('.modal');

}

function resetInputBoxes() {
  let ingSearch = document.querySelector("#ingredientInput");
  let nameSearch = document.querySelector("#nameInput");
  ingSearch.value = "";
  nameSearch.value = "";
}

function errorHandler() {
  let errorMessage = document.createElement("p");
  errorMessage.classList.add("panel-block")
  errorMessage.classList.add('is-justify-content-center')
  errorMessage.innerText = "Sorry no results, please try again!";
  displayBody.append(errorMessage);
}
