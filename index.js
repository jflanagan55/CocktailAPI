const baseIngredientURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='
const nameIngredientURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const displayBody = document.querySelector('#displayBody')

 function fetchRandomCocktail(){
     fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => console.log(data));
}

 function fetchCocktailByIngredient(){
    const ingInput = document.querySelector('#ingredientInput').value
     return fetch(`${baseIngredientURL}${ingInput}`)
    .then(res => res.json())
    .then(data => { return data});
}

 function fetchCocktailByName(){
    const nameInput = document.querySelector('#nameInput').value
     return fetch(`${nameIngredientURL}${nameInput}`)
    .then(res => res.json())
    .then(data => {return data});
}

const ingSearchButton = document.querySelector('#ingSearchButton')
ingSearchButton.addEventListener('click',ingredientResults)
nameSearchButton.addEventListener('click',nameResults)

async function ingredientResults(){
    clearDisplayBody();
    const data = await fetchCocktailByIngredient();
    const results = data.drinks;
    results.forEach(drink => {
        let drinkOption = document.createElement('button')
        drinkOption.innerText = drink.strDrink
        displayBody.append(drinkOption)
    })
    

}
async function nameResults(){
    const data = await fetchCocktailByName();
    const results = data.drinks;
    results.forEach(drink => console.log(drink.strDrink))
    
    

}

function clearDisplayBody (){
    while (displayBody.firstChild) {
        displayBody.removeChild(displayBody.firstChild);
    }
}

