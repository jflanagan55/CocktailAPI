const baseIngredientURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='
const nameIngredientURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

async function fetchRandomCocktail(){
    await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => console.log(data));
}

async function fetchCocktailByIngredient(){
    const ingInput = await document.querySelector('#ingredientInput').value
    await fetch(`${baseIngredientURL}${ingInput}`)
    .then(res => res.json())
    .then(data => console.log(data));
}

async function fetchCocktailByName(){
    const nameInput = await document.querySelector('#nameInput').value
    await fetch(`${nameIngredientURL}${nameInput}`)
    .then(res => res.json())
    .then(data => console.log(data));
}

const ingSearchButton = document.querySelector('#ingSearchButton')
ingSearchButton.addEventListener('click',fetchCocktailByIngredient)
nameSearchButton.addEventListener('click',fetchCocktailByName)

