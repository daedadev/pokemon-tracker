# team-project

Pokemon Card Collector and Price Checker

This project was designed to help users search the pokemon card database using specific search criteria based on the pokemons generation, type, and name.
After searchig, users will be able to compare te prices of different cards across several marketplaces, and save their preferred cards to return to later. This project was challenging, but interesting and gave us an opportunity to better understand APIs and their deployment, as well as hone our skills in HTML and CSS.

The CSS framework we used was Materialize CSS

*It has been deployed to GitHub Pages.

Pur project is interactive, and uses search bars, drop down menus, and buttons,
and our UI is polished and responsive

* We have used two server-side APIs.
- TCG API and Poke API
- https://pokemontcg.io/
- https://pokeapi.co/

* We have used modals, as apposed to alerts, confirms, or prompts.

* We have saved our cards using client-side storage and store persistent data.

* We have a clean repository that meets quality coding standards (file structure, naming conventions, follows best practices for class/id naming conventions, indentation, quality comments, etc.).

* Have a quality README (with unique name, description, technologies used, screenshot, and link to deployed application).


fetch("https://api.pokemontcg.io/v2/cards", {
  method: "GET",
  withCredentials: true,
  headers: {
    "X-API-KEY": apiKey,
    "Content-Type": "application/json",
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
