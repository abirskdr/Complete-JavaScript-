'use strict';

// console.log(document.querySelector('.message').textContent); //selects class message and shows the text contents of the class that is "start guessing...."

// document.querySelector('.message').textContent = 'Correct Number'; //changing the text content of class to the given string.

// // console.log(document.querySelector('.message').textContent); //after changing the textContent when read again it will be changed to "Correct Number".

// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 0;

//console.log(document.querySelector().value);  //we get error as the querySelector method expects atleast one argument.

/////////////////////////textContent vs input.value/////////////////////////
//[...] textContent returns the concatenation of the textContent of every child node, excluding comments and processing instructions. This is an empty string if the node has no children.

// console.log(document.querySelector('span').textContent);
//<span> this text </span> but not this one

////////////////////output/////////////////////
// this text but not this one

//<input> elements however cannot have children. The value that is associated with them can only be accessed via the value property.

// console.log(document.querySelector('.guess').value);

// document.querySelector('.guess').value = 23; //setting the value.

//
//
//
//
//

//EVENT LISTENER

//event is something that happens on the page, an Event Listener we detect an event and react to it.

let secretNumber = Math.trunc(Math.random() * 20) + 1; //trunc is a method that returns the integer part of the number ignoring any fractional part, random is a method that returns a random number between [0,1). " Math.trunc(Math.random() * 20) + 1" here we get a random number between [1,20].

// document.querySelector('.number').textContent = secretNumber;

let score = 20;
let highscore = 0;

//Refactoring using function
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  //The first argument in the function addEventListener is the event and as the second argument the function expects a eventhandler function, since function is also a value we can pass it as argument

  const guess = Number(document.querySelector('.guess').value); //we do not call the function anywhere but it is the JS engine that calls the function as soon as the event happens
  console.log(guess); //Whenever we get some input from the user interface it is usually a string, so to compare numbers together we have to convert them to numbers.

  if (!guess) {
    // document.querySelector('.message').textContent = 'No number';

    displayMessage('No number');
  } else if (guess === secretNumber) {
    // document.querySelector('.message').textContent = 'Correct Number';

    displayMessage('Correct Number');

    document.querySelector('.number').textContent = secretNumber;

    document.querySelector('body').style.backgroundColor = '#60b347'; //in JS when we use style all the property names that have two or more words (with "-" in between) will get changed into camelCase  (eg. background-color -> backgroundColor)

    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  }

  //Refactoring: Restructure the code without changing how it works.

  //if the guess is wrong
  else if (guess != secretNumber) {
    if (score > 1) {
      // document.querySelector('.message').textContent =
      //   guess > secretNumber ? 'Too High' : 'Too Low'; //ternery operator used to shorten the code.

      displayMessage(guess > secretNumber ? 'Too High' : 'Too Low');

      score = score - 1;
      document.querySelector('.score').textContent = score;
    } else {
      // document.querySelector('.message').textContent = 'You lost the game';

      displayMessage('You lost the game');
    }
  }

  //if guess is too high
  // else if (guess > secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = 'Too High';
  //     score = score - 1;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = 'You lost the game';
  //   }
  // }

  // //if guess is too low
  // else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = 'Too Low';
  //     score = score - 1;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = 'You lost the game';
  //   }
  // }
});

//
//
//Coding Challenge #1
//
//

document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  document.querySelector('body').style.backgroundColor = '#222';

  document.querySelector('.number').style.width = '15rem';

  // document.querySelector('.message').textContent = 'Start Guessing...';

  displayMessage('Start Guessing...');

  score = 20;
  document.querySelector('.score').textContent = score;

  document.querySelector('.guess').value = '';

  document.querySelector('.number').textContent = '?';
});
