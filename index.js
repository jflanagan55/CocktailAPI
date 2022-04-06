const baseIngredientURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='
const nameIngredientURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const displayBody = document.querySelector('#displayBody')

 function fetchRandomCocktail(){
     fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => displayDrinkInfo(data))
    .catch(errorHandler)
}

 function fetchCocktailByIngredient(){
    const ingInput = document.querySelector('#ingredientInput').value
     return fetch(`${baseIngredientURL}${ingInput}`)
    .then(res => res.json())
    .then(data => { return data})
    .catch(errorHandler)
}

 function fetchCocktailByName(){
    const nameInput = document.querySelector('#nameInput').value
     return fetch(`${nameIngredientURL}${nameInput}`)
    .then(res => res.json())
    .then(data => {return data})
    .catch(errorHandler)
}

const ingSearchButton = document.querySelector('#ingSearchButton')
ingSearchButton.addEventListener('click',ingredientResults)
const nameSearchButton = document.querySelector('#nameSearchButton')
nameSearchButton.addEventListener('click',nameResults)
const randomCocktailBtn = document.querySelector('#randomCocktailBtn')
randomCocktailBtn.addEventListener('click', fetchRandomCocktail)

async function ingredientResults(){
    clearDisplayBody();
    const data = await fetchCocktailByIngredient();
    const results = data.drinks;
    results.forEach(drink => {
        let drinkDiv = document.createElement('div')
        drinkDiv.classList.add('drinkDiv')

        let drinkOption = document.createElement('h3')
        drinkOption.classList.add('drinkOptionLink')
        drinkOption.innerText = drink.strDrink
        drinkDiv.append(drinkOption)
        displayBody.append(drinkDiv)
        drinkOption.addEventListener('click',()=>{
            displayDrinkInfoHelper(drink.idDrink)}
            
        )
        
        
    })
    resetInputBoxes();

}
async function nameResults(){
    clearDisplayBody();
    const data = await fetchCocktailByName();
    const results = data.drinks;
    results.forEach(drink => {
        let drinkDiv = document.createElement('div')
        drinkDiv.classList.add('drinkDiv')

        let drinkOption = document.createElement('h3')
        drinkOption.classList.add('drinkOptionLink')
        drinkOption.innerText = drink.strDrink
        drinkDiv.append(drinkOption)
        displayBody.append(drinkDiv)
        drinkOption.addEventListener('click',()=>{
            displayDrinkInfoHelper(drink.idDrink)}
            
        )
        
        
    })
    
    resetInputBoxes();
    

}

function clearDisplayBody (){
    while (displayBody.firstChild) {
        displayBody.removeChild(displayBody.firstChild);
    }
}



function displayDrinkInfoHelper(drink){
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink}`)
    .then(res => res.json())
    .then(data=>displayDrinkInfo(data))
    
}
function displayDrinkInfo(drink){
    clearDisplayBody()
    resetInputBoxes()
    const drinkInfo = drink.drinks[0]
    const drinkTitle = document.createElement('h2')
    drinkTitle.innerText = drinkInfo.strDrink
    displayBody.append(drinkTitle)

    const drinkImg = document.createElement('img')
    drinkImg.src = drinkInfo.strDrinkThumb
    displayBody.append(drinkImg)

    const ingredientList = document.createElement('ul');
    ingredientList.innerText = "Ingredients"
    displayBody.append(ingredientList);

    for(let i =1; i < 15; i++){
      if(drinkInfo[`strIngredient${i}`] === null){
        break;
      }
      else{
        if(drinkInfo[`strMeasure${i}`] === null){
          let li = document.createElement('li');
          li.innerText = drinkInfo[`strIngredient${i}`];
          ingredientList.append(li);
        }
        else{
          let li = document.createElement('li');
          let measure = drinkInfo[`strMeasure${i}`]
          let ingredient = drinkInfo[`strIngredient${i}`]
          li.innerText = `${measure} ${ingredient}`
          ingredientList.append(li);
          
        }
    }
    }
    const instructionsHeader = document.createElement('h3')
    instructionsHeader.innerText = "Instructions"
    displayBody.append(instructionsHeader) 

    const drinkInstructions = document.createElement('p')
    drinkInstructions.innerText = drinkInfo.strInstructions
    displayBody.append(drinkInstructions)
}

function resetInputBoxes(){
    let ingSearch = document.querySelector('#ingredientInput')
    let nameSearch = document.querySelector('#nameInput')
    ingSearch.value = ""
    nameSearch.value = ""
}

function errorHandler(){
    let resultsHeader = document.createElement('h2')
    resultsHeader.innerText = "Results"

    let errorMessage = document.createElement('p')
    errorMessage.innerText = "Sorry no results, please try again!"

    displayBody.append(resultsHeader,errorMessage)
}