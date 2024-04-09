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
    //display cocktails list
    function displayCocktails(cocktails){
        const cocktailsList = document.getElementById('cocktails-list') 
        cocktailsList.innerHTML = ''
        cocktails.forEach(cocktail => {
            const listItem = document.createElement('li')
            listItem.textContent = cocktail.strDrink
            cocktailsList.appendChild(listItem)
        })
    }

    //function to fetch a cocktail by id display it in the UI
    // function displayCocktailDetails(cocktailId){
    //     fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         const cocktail = data.drinks[0]
    //         document.getElementById('cocktails-div').innerHTML = ''
    //         //creating and populating 
    //     })
    // }
    fetchCocktails()
        .then(cocktails => displayCocktails(cocktails))
        .catch(error => console.error('Error fetching cocktails', + error))
})