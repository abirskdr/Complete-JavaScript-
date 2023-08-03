'use strict';

// Coding Challenge #1

/* 

We're building a football betting app!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored 

*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
  printGoals: function (...playerNames) {
    for (let i = 0; i < playerNames.length; i++) {
      let countGoals = 0;
      let j = 0;
      while (j < game.scored.length) {
        if (playerNames[i] == game.scored[j]) {
          countGoals++;
          j++;
        } else {
          j++;
        }
      }
      console.log(playerNames[i], countGoals);
    }
  },
};

console.log(' ');

console.log('coding Challenge 1');

console.log(' ');

//1
const [players1, players2] = game.players;

console.log(players1);
console.log(players2);

//2
const [gk1, ...fieldPlayers1] = players1;
console.log(gk1, fieldPlayers1);

const [gk2, ...fieldPlayers2] = players2;
console.log(gk2, fieldPlayers2);

//3
const [...allPlayers] = [...players1, ...players2];
console.log(allPlayers);

//4
const [...players1Final] = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

//5
//destructuring inner object
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

//6
//In this we are passing some names and checking if they have scored any goals (from the existing array "scored"), but the quetion asks for passing the names of the players as they have scored goals, printing their names and then use playerNames.length to print the total numbers of goals which were scored.
game.printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');

//7
//more the value less the probability of winning
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');

///////////////////////////////////////////////////////////////////////////////////////

console.log(' ');

console.log('coding Challenge 2');

console.log(' ');

// Coding Challenge #2

/* 

Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

*/

//1
for (const [gNo, player] of game.scored.entries())
  console.log(`Goal ${gNo + 1}: ${player}`);

//2
let avg = 0,
  n = 0;
for (const odds of Object.values(game.odds)) {
  avg += odds;
  n++;
}
console.log(avg / n);

//3
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`; //here the variable "team" stores the key values "team1","x","team2". And the "odd" variable store the values, game[team1]=Bayern Munich, game[team2]=Borussia Dortmund.
  console.log(`Odd of ${teamStr} ${odd}`);
}

// BONUS
// So the solution is to loop over the array, and add the array elements as object properties, and then increase the count as we encounter a new occurence of a certain element
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1); //if player does not exist in the object scorers, then make the value 1, if the player already exists in the object, increment the value.
}
///////////////////////////////////////////////////////////////////////////////////////

console.log(' ');

console.log('coding Challenge 3');

console.log(' ');

// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

console.log(gameEvents);

//1
const events = [...new Set(gameEvents.values())]; //events is an array, values of map is then made into the elements of set,which then is spread, and stored in an array
console.log(events);

//2
gameEvents.delete(64);
console.log(gameEvents);

//3
console.log(
  `An event happened, on average every ${90 / gameEvents.size} minutes`
);

//alternate solution

const time = [...gameEvents.keys()].pop(); //the keys of the map is spread intop an array and the last irem is popped, "92", time of the last event
console.log(time);
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
);

//4
for (const [key, value] of gameEvents) {
  if (key <= 45) {
    console.log(`[FIRST HALF] ${key}: ${value}`);
  } else {
    console.log(`[SECOND HALF] ${key}: ${value}`);
  }
}

//better solution
// for (const [min, event] of gameEvents) {
//     const half = min <= 45 ? 'FIRST' : 'SECOND';
//     console.log(`[${half} HALF] ${min}: ${event}`);
//   }
