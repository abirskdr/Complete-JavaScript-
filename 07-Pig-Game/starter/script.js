'use strict';

//Refactoring

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');

const score0El = document.querySelector('#score--0'); //as we are selecting the element through ID we can also use getElementById('score--0'), this is supposed to be a little bit faster than the querySelector.
const score1El = document.querySelector('#score--1');

const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

//////////////////////////////////////////

//Setting Values

// score0El.textContent = 0; //JS automatically converts "0" into sting.
// score1El.textContent = 0;

// diceEl.classList.add('hidden');

// const scores = [0, 0]; //final scores.
// let currentScore = 0; //helps in counting the current score.
// let activePlayer = 0; //helps in setting the current player.
// let playing = true; //boolean value (variable to prevent the buttons to be clickable when a player has won the match).

////////////////////////////////////////

//reset function and initial values

let scores, currentScore, activePlayer, playing; //declaring a bunch of empty variables together without assigning them a value.

//function for resetting values.
const init = function () {
  scores = [0, 0]; ////these variables if declared here will not be accessible outside the init function, so we have to remove the "let" and "const" as we are just assigning the variabes here and not declaring new variables here.(Note-declaring and assigning variables a value are not the same).
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  document.querySelector('.player--0').classList.remove('player--winner');

  document.querySelector('.player--1').classList.remove('player--winner');

  document.querySelector('.player--0').classList.add('player--active');

  document.querySelector('.player--1').classList.remove('player--active');

  diceEl.classList.add('hidden');
};
///////////////////////////////////////////

///////////////Main Code//////////////////

init(); //whenever we load the page for the very first time, all the values reset at that time.

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden'); //making the dice visible by removing the class "hidden".

    diceEl.src = `dice-${dice}.png`; //since the image files are named as dice-x.png where x belongs to [1,6], src=" " so no need to import or that kind of stuff

    //console.log(dice); //gives the random number (that is also the dice score)

    if (dice !== 1) {
      currentScore += dice;
      //console.log(currentScore);
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //when the dice is 1

      ///////////////////////////////////
      //switchPlayer();//we can call this function that has the exact same codes that are given below.
      //////////////////////////////////

      document.getElementById(`current--${activePlayer}`).textContent = 0; //setting the current score of the current player who got 1 to "0".
      currentScore = 0; //setting the currentScore to "0" for the player.
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); //when the current player gets 1, his turn ends and the color is changed by removing the class "player--active".
      //////////////////////////////////////////
      //switching the active player to help in switching to next player.
      activePlayer = activePlayer === 0 ? 1 : 0;
      /////////////////////////////////////////
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active'); //the next player gets the turn and his color changes by ading the class "player-active".
      ////////////////////////////////////////
      //we could also use the toggle method
      // document.querySelector('.player--0').classList.toggle('player--active');
      // document.querySelector('.player--1').classList.toggle('player--active');
    }
  }
});
////////////////////////////////////////////

//function for switching player (Refactoring).
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //setting the current score as zero when the player changes, so that when his turn comes again there is no confusion.
  currentScore = 0; //setting the current score for the new player as "0".
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active'); //removing player--active class from the old player.
  activePlayer = activePlayer === 0 ? 1 : 0; //switching player.
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active'); //adding player--active class to the next player.
};

///////////////////////////////////////////

//Holding the score and showing it in the score and also switching the player on hold

btnHold.addEventListener('click', function () {
  if (playing) {
    // console.log('hold');
    scores[activePlayer] += currentScore; //the currentScore of each turn adds to the scores array at each trun;
    //console.log(currentScore);
    // console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //////winnning condition//////
    if (scores[activePlayer] >= 100) {
      playing = false; //butons stop working
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); //adding "player-winner" class.
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); //removing "player--active" from the current player to prevent two different stylings overloading.

      //////Until someone scores 100, hold button changes player//////
    } else {
      switchPlayer();
    }
  }
});
//////////////////////////////////////////////

//New Game functionality
btnNew.addEventListener('click', function () {
  init(); //clicking on the New Game button resets the values, we call this function which then resets the values.
});
//////////////////////////////////////////////

//////////////////////////////////////////////
