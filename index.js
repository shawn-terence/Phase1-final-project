const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const searchBox = document.querySelector('#searchbx');
const searchBtn = document.querySelector('#searchbtn');
const cocktailList = document.querySelector('.cocktailList');
const recipeDiv = document.querySelector('.recipediv');
let ingredients = ''; 
document.addEventListener(`DOMContentLoaded`,()=>{
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        ingredients = searchBox.value; 
        const searchurl = `${apiUrl}${ingredients}`; 
        fetch(searchurl)
         .then(res => res.json())
         .then(data => showCocktailList(data.drinks));
    });
    
    function showCocktailList(drinks) {
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
                cocktailRecipe(drink.idDrink)
            })
        });
    }
    function cocktailRecipe(drinkId){
        const recipeapi= `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
        fetch(recipeapi)
        .then(res=>res.json())
        .then(data => {
            const drink= data.drinks[0]
    
                recipeDiv.innerHTML=`
                <div class="cardingDiv">
                    <div class="card-ovly"></div>
                    <div class="card-in">
                                    <div>
                                    <h2>${drink.strDrink}</h2>
                                    <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" class="recipeimage">
                                </div>
                            <div id="wordingDiv">
                                    <h4>Ingredients:</h4>
                                    <ul>
                                        <li>${drink.strIngredient1}</li>
                                        <li>${drink.strIngredient2}</li>
                                        <li>${drink.strIngredient3}</li>
                                        <li>${drink.strIngredient4}</li>

                                    </ul>
                                    <h3>Instructions:</h3>
                                <p>${drink.strInstructions}</p>
                                <p id="likes">0</p>
                                <button class="Likebutton" onclick="likeAdder()">Like</button>

                                <!-- Comment Section -->
                                <h3>Comments:</h3>
                                <input type="text" id="commentInput" placeholder="Enter your comment">
                                <button class="CommentButton" onclick="addComment()">Add Comment</button>
                                <ol id="commentList"></0l>
                            </div>
                    </div>
                </div>
    
                `
                document.querySelector(`.Likebutton`).addEventListener(`click`,()=>{
                    likeAdder()
                })
                document.querySelector(`commentButton`).addEventListener(`click`,()=>{
                    addComment()
                })
            
        })
    }
    function likeAdder(){
        let likes= document.getElementById(`likes`)
        let value = parseInt(likes.innerHTML)
        ++value
        document.getElementById("likes").innerHTML = value;
    }
    function addComment() {
        const commentInput = document.getElementById('commentInput');
        const commentList = document.getElementById('commentList');
        const commentText = commentInput.value;
    
        if (commentText) {
            const commentItem = document.createElement('li');
            commentItem.textContent = commentText;
            commentList.appendChild(commentItem);
            commentInput.value = ''; // Clear the input field after adding the comment
        }
    }
    likeAdder();

})
/*
                        <div>
                            <h2>${drink.strDrink}</h2>
                            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" class="recipeimage">
                        </div>
                        <div id="wordingDiv">
                                <h4>Ingredients:</h4>
                                <ul>
                                    <li>${drink.strIngredient1}</li>
                                    <li>${drink.strIngredient2}</li>
                                    <li>${drink.strIngredient3}</li>
                                    <li>${drink.strIngredient4}</li>
    
                                </ul>
                                <h3>Instructions:</h3>
                            <p>${drink.strInstructions}</p>
                            <p id="likes">0</p>
                            <button class="Likebutton" onclick="likeAdder()">Like</button>
    
                            <!-- Comment Section -->
                            <h3>Comments:</h3>
                            <input type="text" id="commentInput" placeholder="Enter your comment">
                            <button class="CommentButton" onclick="addComment()">Add Comment</button>
                            <ol id="commentList"></0l>
                        </div>
                        */



