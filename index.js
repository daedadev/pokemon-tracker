searchButton = document.getElementById("search-button");
resultsContainer = document.getElementById("pokeResults");
currentSelect = document.getElementById("pokeSelect");
nameSearch = document.getElementById("current-search");
cardsOnPage = document.getElementsByClassName("resultsImage");

//Instantiate Modal
var modal = document.getElementById("myModal");
var modalCardName = document.getElementById("modal-card-name");
var reverseHolofoilPrice = document.getElementById("modal-reverseHolofoil-price");
var holoFoilPrice = document.getElementById("modal-HoloFoil-price");
var normalPrice = document.getElementById("modal-normal-price");
var modalCardImage = document.getElementById("modal-card-image");
var modalCardType = document.getElementById("modal-card-type");

// Get the <span> element that closes the modal [This is just w3Schools basic modal setup]
var span = document.getElementsByClassName("close")[0];

// Function that returns both the name and parameter search inputs
function searchingPokeData(parameter, name){

    // Check to see if there is a parameter and no name inputed
    if(parameter && !name){

        finalURL = "https://pokeapi.co/api/v2/" + parameter;

        fetch(finalURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            // Check if the user is searching by generation
            if(finalURL.includes("generation")){     
                
                var pokemonNameArray = [];
    
                for(i=0; i<data.pokemon_species.length; i++){
                    
                    pokemonNameArray.push(data.pokemon_species[i].name)
        
                }
        
                console.log(pokemonNameArray);
                searchingTCGData(pokemonNameArray);
            }

            // Check if the user is searching by pokemon type
            if(finalURL.includes("type")){

                var pokemonNameArray = [];
    
                for(i=0; i<data.pokemon.length; i++){
                    
                    pokemonNameArray.push(data.pokemon[i].pokemon.name)
        
                }
        
                console.log(pokemonNameArray);
                searchingTCGData(pokemonNameArray);

            }
        });
    // Check if there was a name inputed
    }else if(name){

        finalURL = "https://pokeapi.co/api/v2/pokemon/" + name;

        fetch(finalURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
    
            var pokemonNameArray = [];
            pokemonNameArray.push(data.name);
            searchingTCGData(pokemonNameArray);

        });
    }
}

// Takes the names from the PokeAPI database and runs for matches in TCG
function searchingTCGData(pokemonData){

    for(i=0; i < pokemonData.length; i++){

        pokeCardURL = "https://api.pokemontcg.io/v2/cards?q=name:" + pokemonData[i]

        fetch(pokeCardURL, {
            method: "GET",
            withCredentials: true,
            headers: {
            "X-API-KEY": "f67d2ff5-723b-4794-bbfb-6b0a4e846179",
            "Content-Type": "application/json",
            },
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
           
            console.log(data);

            postPokemonCardInfo(data.data);

        });

    }

}

// Takes the TCG data and pulls individual card data
// Sets the card id as the actual html item id
function postPokemonCardInfo(dataTCG){

    for(i=0; i<5; i++){

        console.log(dataTCG[i]);
        var cardImage = document.createElement('img');
        resultsContainer.appendChild(cardImage);
        cardImage.id = dataTCG[i].id;
        cardImage.setAttribute("class", "resultsImage");
        cardImage.src = dataTCG[i].images.small;

        cardImage.addEventListener("click", function(e){

            console.log(this);
            var cardID = this.id;

            cardClickInformation(cardID);
        
        })

    }
}

// Runs a search query based on the current card you clicked
function cardClickInformation(cardObject){

    clickCardURL = "https://api.pokemontcg.io/v2/cards/" + cardObject;

    fetch(clickCardURL, {
        method: "GET",
        withCredentials: true,
        headers: {
        "X-API-KEY": "f67d2ff5-723b-4794-bbfb-6b0a4e846179",
        "Content-Type": "application/json",
        },
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
       
        console.log(data.data);
        cardModalInformation(data.data);

    });
}

function cardModalInformation(modalCard){

    modalCardName.innerHTML = "Pokemon Card Title: "+modalCard.name;
    modalCardImage.src = modalCard.images.large;

    if(modalCard.tcgplayer){

        if(modalCard.tcgplayer.prices.normal){

            normalPrice.innerHTML = "Market Price: "+modalCard.tcgplayer.prices.normal.market.toFixed(2);

        }else{

            normalPrice.innerHTML = "Market Price: N/A"

        }

        if(modalCard.tcgplayer.prices.reverseHolofoil){

            reverseHolofoilPrice.innerHTML = "Market Price: "+modalCard.tcgplayer.prices.reverseHolofoil.market.toFixed(2);

        }else{

            reverseHolofoilPrice.innerHTML = "Market Price: N/A"

        }

        if(modalCard.tcgplayer.prices.holoFoil){

            holoFoilPrice.innerHTML = "Market Price: "+modalCard.tcgplayer.prices.holoFoil.market.toFixed(2);

        }else{

            holoFoilPrice.innerHTML = "Market Price: N/A"

        }

    }
    //modalCardType.innerHTML = modalCard.types[0];

    modal.style.display = "block";

}

// Modal handling
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

// Button click event that passes input info
searchButton.addEventListener("click", function(){

    parameterSelect = currentSelect.value;
    searchedName = nameSearch.value;

    resultsContainer.innerHTML = ""
    searchingPokeData(parameterSelect, searchedName);

})

