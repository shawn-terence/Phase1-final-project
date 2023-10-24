const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const searchBox = document.querySelector('#searchbx');
const searchBtn = document.querySelector('#searchbtn');
const cocktailList = document.querySelector('.cocktailList');
const recipeDiv = document.querySelector('.recipediv');
let ingredients = ''; // Initialize ingredients with an empty string

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    ingredients = searchBox.value; // Get the value from the search box
    const searchurl = `${apiUrl}${ingredients}`; // Construct the search URL correctly
    fetch(searchurl)
     .then(res => res.json())
     .then(data => showCocktailList(data.drinks));
});

function showCocktailList(drinks) {
    // Clear previous content before adding new items
    cocktailList.innerHTML = '';

    // make the drinks array to get a maximum of 25 drinks only
    const limitedDrinks = drinks.slice(0, 25);

    limitedDrinks.forEach(drink => {
        // Append new list items to the cocktailList
        const listItem = document.createElement('li');
        listItem.className = 'list-item';
        listItem.textContent = drink.strDrink;
        cocktailList.appendChild(listItem);
        listItem.addEventListener(`click`,()=>{
            cocktailRecipe(data)
        })
    });
}


