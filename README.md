# team-project

Overwatch Game Stat + Achievement Tracker

* Use a CSS framework other than Bootstrap.
- Bulma/Tailwind

* Be deployed to GitHub Pages.
- ok

* Be interactive (i.e., accept and respond to user input).
- Clickable buttons to toggle/display different information

* Use at least two server-side APIs.
- TCG API and Poke API
- https://pokemontcg.io/
- https://pokeapi.co/

* Does not use alerts, confirms, or prompts (use modals).
- Modal

* Use client-side storage to store persistent data.
- Save cards

* Be responsive.

* Have a polished UI.

* Have a clean repository that meets quality coding standards (file structure, naming conventions, follows best practices for class/id naming conventions, indentation, quality comments, etc.).

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