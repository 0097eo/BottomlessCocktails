document.addEventListener("DOMContentLoaded", function() {
    // Function to add CSS styles for the cocktail image
    function addCocktailImageStyles() {
        let style = document.createElement('style');
        style.innerHTML = `
        .cocktail-image {
        border-radius: 10%;
        width: 450px;
        height: 450px; 
        }
        `;
        document.head.appendChild(style);
    }
    addCocktailImageStyles();

    // Function to fetch cocktails
     const fetchCocktails = async () => {
        try {
            const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
            const data = await response.json();
            return data.drinks;
        } catch (error) {
            console.error('Error fetching cocktails:', error);
        }
    };

    // Function to render cocktails 
    function displayCocktails(cocktails) {
        const cocktailsList = document.getElementById('cocktails-list');
        cocktailsList.innerHTML = ''; 
        cocktails.forEach(cocktail => {
            const listItem = document.createElement('li');
            listItem.addEventListener('mouseover', function(){
                this.style.backgroundColor = 'red';
            })
            listItem.addEventListener('mouseout', function(){
                this.style.backgroundColor = ''
            })
            listItem.addEventListener('click', function() {
                displayCocktailDetails(cocktail.idDrink);
            })
            listItem.textContent = cocktail.strDrink;
            cocktailsList.appendChild(listItem);
        });
    }

    const displayCocktailDetails = async (cocktailId) => {
        try {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`);
            const data = await response.json();
            const cocktail = data.drinks[0];
            document.getElementById("cocktails-div").innerHTML = '';
            const cocktailDiv = document.createElement('div');
            cocktailDiv.innerHTML = `
                <h2>${cocktail.strDrink}</h2>
                <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}" class="cocktail-image">
                <h2>Ingredients & Measurements</h2>
                ${cocktail.strMeasure1 ? `<p>${cocktail.strMeasure1} ${cocktail.strIngredient1}</p>` : ''}
                ${cocktail.strMeasure2 ? `<p>${cocktail.strMeasure2} ${cocktail.strIngredient2}</p>` : ''}
                ${cocktail.strMeasure3 ? `<p>${cocktail.strMeasure3} ${cocktail.strIngredient3}</p>` : ''}
                ${cocktail.strMeasure4 ? `<p>${cocktail.strMeasure4} ${cocktail.strIngredient4}</p>` : ''}
                <h2>Instructions</h2>
                <p>${cocktail.strInstructions}</p>
                <h2>Serve in A</h2>
                <p>${cocktail.strGlass}</p>
            `;
            document.getElementById("cocktails-div").appendChild(cocktailDiv);
        } catch (error) {
            console.error('Error fetching cocktail details:', error);
        }
    };
    // Function to search for a cocktail by name
    const  getDrinkByName = async (name) => {
        try{
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
            const data = await response.json()
            return data.drinks
        }catch(error){
            console.error('Error fetching cocktail by name', error)
        }
    }

    // Event listener for the search form
    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault(); 
        const searchTerm = document.getElementById('search-input').value;
        getDrinkByName(searchTerm)
            .then(cocktails => displayCocktails(cocktails))
            .catch(error => alert('No such cocktail, try searching for another one', error));
    });

    // Event listener for the header title to navigate back to the home page
    document.getElementById("header-title").addEventListener("click", function() {
        window.location.reload()
    });

    // Fetch and display cocktails
    fetchCocktails()
        .then(cocktails => displayCocktails(cocktails))
        .catch(error => console.error('Error fetching cocktails:', error));
})
