'use strict';

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),

  //ANSWER 1

  registerNewAnswer: function () {
    //1.1
    const userOption = Number(
      prompt(`${this.question}
    ${this.options.join('\n')}\n (Write option number)`)
    );

    //1.2
    if (typeof userOption === 'number' && userOption >= 0 && userOption <= 3) {
      this.answers[userOption]++;
    }
    //jonas' code
    //typeof userOption ==='number' && userOption<this.answers.length && this.answers[userOption]++;//short-circuiting used
    /////////////
    else {
      console.log(`${userOption} wouldn't make sense,right?`);
    }

    //ANSWER 4

    this.displayResults();
    this.displayResults('string');
  },

  //ANSWERS 3
  displayResults: function (type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

//bonus question code
// DATA1: [5, 2, 3];
// DATA2:[1, 5, 3, 9, 6, 1];

//ANSWERS 2

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

//BONUS QUESTION ANSWER
poll.displayResults.call({ answers: [5, 2, 3] }); //we use the call() method to make the "this" keyword point to our new object that we created with the same name ("answers") as that of the property inside the object "poll" that is actually printed in the method displayResults, doing so we can print our own array by the same method without changing the code inside of it, while calling the method with the call() method, the "this" keyword in the code line 90 points to the answer object that we created and not the answer property in the object "poll".

poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
