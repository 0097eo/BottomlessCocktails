document.addEventListener('DOMContentLoaded', function() {
    //fetching cocktails
    function fetchCocktails(){
        return fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then(res => res.json())
        .then(data => data.drinks)
    }
    //fetching a cocktail by name
    function getDrinkByName(name){
        return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
        .then(res => res.json())
        .then(data => data.drinks)

    }
})