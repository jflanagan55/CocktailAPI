const baseIngredientURL =
  "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
const baseNameURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const displayBody = document.querySelector("#displayBody");

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
randomCocktailBtn.addEventListener("click", fetchRandomCocktail);

async function ingredientResults() {
  clearDisplayBody();
  const data = await fetchCocktailByIngredient();
  if (data === undefined) {
    return;
  } else if (data.drinks === null) {
    errorHandler();
  } else {
    let resultsHeader = document.createElement("h2");
    resultsHeader.innerText = "Results";
    displayBody.append(resultsHeader);

    data.drinks.forEach((drink) => {
      let drinkDiv = document.createElement("div");
      drinkDiv.setAttribute("id", "drinkDiv");
      drinkDiv.innerText = drink.strDrink;
      displayBody.append(drinkDiv);
      drinkDiv.addEventListener("click", () => {
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
    let resultsHeader = document.createElement("h2");
    resultsHeader.innerText = "Results";
    displayBody.append(resultsHeader);

    data.drinks.forEach((drink) => {
      let drinkDiv = document.createElement("div");
      drinkDiv.setAttribute("id", "drinkDiv");
      drinkDiv.innerText = drink.strDrink;
      displayBody.append(drinkDiv);
      drinkDiv.addEventListener("click", () => {
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
  clearDisplayBody();
  resetInputBoxes();
  const drinkInfo = drink.drinks[0];

  const drinkTitle = document.createElement("h2");
  drinkTitle.innerText = drinkInfo.strDrink;

  const drinkImg = document.createElement("img");
  const imgContainer = document.createElement("div");
  drinkImg.src = drinkInfo.strDrinkThumb;
  drinkImg.alt = `${drinkTitle.innerText}`;
  imgContainer.append(drinkImg);

  const ingredientList = document.createElement("ul");
  ingredientList.innerText = "Ingredients";

  for (let i = 1; i < 15; i++) {
    if (drinkInfo[`strIngredient${i}`] === null) {
      break;
    } else {
      if (drinkInfo[`strMeasure${i}`] === null) {
        let li = document.createElement("li");
        li.innerText = drinkInfo[`strIngredient${i}`];
        ingredientList.append(li);
      } else {
        let li = document.createElement("li");
        let measure = drinkInfo[`strMeasure${i}`];
        let ingredient = drinkInfo[`strIngredient${i}`];
        li.innerText = `${measure} ${ingredient}`;
        ingredientList.append(li);
      }
    }
  }
  const instructionsHeader = document.createElement("h3");
  instructionsHeader.innerText = "Instructions";

  const drinkInstructions = document.createElement("p");
  drinkInstructions.innerText = drinkInfo.strInstructions;

  displayBody.append(
    drinkTitle,
    imgContainer,
    ingredientList,
    instructionsHeader,
    drinkInstructions
  );
}

function resetInputBoxes() {
  let ingSearch = document.querySelector("#ingredientInput");
  let nameSearch = document.querySelector("#nameInput");
  ingSearch.value = "";
  nameSearch.value = "";
}

function errorHandler() {
  let resultsHeader = document.createElement("h2");
  resultsHeader.innerText = "Results";

  let errorMessage = document.createElement("p");
  errorMessage.innerText = "Sorry no results, please try again!";

  displayBody.append(resultsHeader, errorMessage);
}
