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
    function displayCocktailDetails(cocktailId){
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`)
        .then(res => res.json())
        .then(data => {
            const cocktail = data.drinks[0]
            document.getElementById('cocktails-div').innerHTML = ''
            //creating and populating  the detailed cocktail information
            const cocktailDiv = document.createElement('div')
            cocktailDiv.innerHTML = `
                <h2>${cocktail.strDrink}</h2>
                <img src='${cocktail.strDrinkThumb}' alt='${cocktail.strDrink}' class='cocktail-image'>
                <h2>Ingredients & Measurements</h2>
                    ${cocktail.strMeasure1 ? `<p>${cocktail.strMeasure1} ${cocktail.strIngredient1}</p>` : ''}
                    ${cocktail.strMeasure2 ? `<p>${cocktail.strMeasure2} ${cocktail.strIngredient2}</p>` : ''}
                    ${cocktail.strMeasure3 ? `<p>${cocktail.strMeasure3} ${cocktail.strIngredient3}</p>` : ''}
                    ${cocktail.strMeasure4 ? `<p>${cocktail.strMeasure4} ${cocktail.strIngredient4}</p>` : ''}
                <h2>Instructions</h2>
                <p>${cocktail.strInstructions}</p>
                <h2>Served In A: </h2>
                <p>${cocktail.strGlass}</p>
            `
            document.getElementById('cocktails-div').appendChild(cocktailDiv)
        })
    }

    fetchCocktails()
        .then(cocktails => displayCocktails(cocktails))
        .catch(error => console.error('Error fetching cocktails', + error))
})