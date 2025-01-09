/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for(let i = 0; i < games.length; i++){
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");
        
        gameCard.innerHTML = `
            <img src="${games[i].img}" alt="${games[i].name}" class="game-img"/>
            <h3>${games[i].name}</h3>
            <p>${games[i].description}</p>
            <p>Backers: ${games[i].backers}</p> 
        `;

        gamesContainer.appendChild(gameCard);
    }
}
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

const totalContributions = GAMES_JSON.reduce((accumulator, game) => {
    return accumulator + game.backers; 
  }, 0); 
  contributionsCard.innerHTML = totalContributions.toLocaleString(); 
  

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

let totalRaised = GAMES_JSON.reduce((accumulator, game) => {
    return accumulator + game.pledged; 
  }, 0);
  raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`; 

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;

// Set the inner HTML of the gamesCard to display the total number of games
gamesCard.innerHTML = totalGames;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const listoflessamount = GAMES_JSON.filter ( (game) => {
        return game.pledged < game.goal;
    });

    addGamesToPage(listoflessamount);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    const listoffundedamount = GAMES_JSON.filter ( (game) => {
        return game.pledged >= game.goal;
    });

    addGamesToPage(listoffundedamount);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*****************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
// Use reduce to count the number of unfunded games
const numUnfundedGames = GAMES_JSON.reduce((count, game) => {
    return game.pledged < game.goal ? count + 1 : count;
}, 0);

// Calculate total amount raised
let total_Raised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

// Count total number of games
let total_Games = GAMES_JSON.length;

// Template string for dynamic display
const displayStr = `A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} game${totalGames !== 1 ? 's' : ''}. 
Currently, ${numUnfundedGames} game${numUnfundedGames !== 1 ? 's remain' : ' remains'} unfunded. 
We need your help to fund these amazing games!`;

// Create a new paragraph element
const descriptionElement = document.createElement("p");

// Set the innerHTML to the template string
descriptionElement.innerHTML = displayStr;

// Append the paragraph to the description container
descriptionContainer.appendChild(descriptionElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// Destructure to grab the first and second most funded games
const [firstGame, secondGame] = sortedGames;

// Create new elements to display the names of the games
const firstGameElement = document.createElement("h3");
firstGameElement.textContent = firstGame.name;

// Create a new element for the second game
const secondGameElement = document.createElement("h3");
secondGameElement.textContent = secondGame.name;

// Append these elements to their respective containers
firstGameContainer.appendChild(firstGameElement);
secondGameContainer.appendChild(secondGameElement);


