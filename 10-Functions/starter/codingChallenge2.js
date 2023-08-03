// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    // callback function
    header.style.color = 'blue'; //used the "header" variable declared earlier
  });
})();

//By the time the callback function is executed on "click", the IIFE function has long gone, the variable "header" in the variable environment of the execution context of the IIFE is gone as well when the EC of the IIFE function pops off the call stack after its execution. But as the call back function was born in the same environment as the variable "header" was declared, i.e. inside the IIFE function, it has the access to the variable "header" through closure and can execute the code lines insdide it (the callback function) that involves the variable "header" successfully with the help of closure.
