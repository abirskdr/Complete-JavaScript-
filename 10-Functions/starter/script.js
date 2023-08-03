'use strict';

/////////////////////////////////////Functions///////////////////////////////////

/////////////////////////////////Default Parameters//////////////////////////////

//Booking Function

//************************************************************************
// Function parameters are the names listed in the function's definition.*
// Function arguments are the real values passed to the function.        *
// Parameters are initialized to the values of the arguments supplied.   *
//************************************************************************

const bookings = []; //empty array

//const createBooking = function (flightNum, numPassenger, price) {
//parameters without default values

const createBooking = function (
  // flightNum, price = 199 * numPassenger, numPassenger = 1, this way price will be undefined if  no argument passed for it while calling the function as it cannot be  dynamically calculated by default,its calculation involves numPassenger that is passed later, JS specifies the parameters in order.
  flightNum,
  numPassenger = 1,
  price = 199 * numPassenger //default vlaues can contain any expression, here we use numPassenger,which was set before it.
) {
  //ES6 default value setting
  // //old way of setting default parameters (ES5)
  // flightNum = flightNum || 'AS00'; //short-circuiting
  // numPassengers = numPassengers || 1; //short-circuiting
  // price = price || 199; //short-circuiting

  const booking = {
    flightNum,
    numPassenger,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking('LH123'); //without default parameters: {flightNum: "LH123", numPassenger: undefined, price: undefined}, as only first argument is passed, value of flightNum is set, and other values are not passed, numPassenger and price are undefined.

//console.log(bookings);

createBooking('LH123', 2, 243); //{flightNum: "LH123", numPassenger: 2, price: 243}

createBooking('LH123', 2); //{flightNum: "LH123", numPassenger: 2, price: 398}, her the price is calculated depending on the numPassengers and price value is not passed, defalut value takes its place.

//createBooking('LH123', , 243);//we cannot leave arguments while calling functions like this

createBooking('LH123', undefined, 243); //this way by setting undefined to the parameter/ not passing an argument to the parameter, we can leave that parameters at its default value.

/////////////////////////////////////////////////////////////////////////////////

////////////////How Passing Arguments Works: Value vs. Reference/////////////////

const flight = 'LH234';

const abir = {
  name: 'Abir Sikdar',
  passport: 21434654765,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999'; //changing the parameter
  passenger.name = 'Mr. ' + passenger.name;

  //*****************************************
  //Un comment these code lines to understand by output
  //*****************************************
  // if (passenger.passport == 2143464765) {
  //   alert('Checked In');
  // } else {
  //   alert('Wrong passport!');
  // }
};

checkIn(flight, abir); //flight variable and abir object passed as arguments

//flight is a primitive type, so when we pass that value into the function, the flightNum  now contains a copy of that original value, same as const flightNum=flight; flightNum is a completely different variable so when we have changed it here, it did not get reflected in the outside flight variable.
console.log(flight); //LH234, (same)

//when we pass a reference type to the function what really copied is the reference to the object in the memory heap, same as const passenger=abir; both here point to the same object in the memory, so when we manipulate the passener object, we are also manipulating the abir object.
console.log(abir); //{name: "Mr. Abir Sikdar", passport: 21434654765}, (changed)

//another example

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000);
};

newPassport(abir); //passing object abir and so reference to the object is copied to person, the passport number is then changed of the person which actually changes the passport number of the function abir, as person has the reference to the object abir.

checkIn(flight, abir); //says wrong passport as the passport number is changed in the function call newPassport.

console.log(abir); //shows random passport numbers

//In programming, there are two terms "passing by values" and "passing by reference", JS does not have pass by reference, it only has pass by value, In other languages like C++ where we could pass reference to any values, instead of the value itsef, which works even with primitives, so we could pass reference to a value (into a function) and then the value outside of the function would also be changed. In JS, for objects we do pass in a reference, however that reference itself is still a value, its simply a value that contains a memory address, so we pass a reference to the function but we do not pass by reference.

/////////////////////////////////////////////////////////////////////////////////

////////////////////First-Class Functions, Higher Order Functions////////////////

//*******************************************************************************
//////////////////////////////////In notebook////////////////////////////////////
//*******************************************************************************

//////////////////////Functions Accepting Callback Functions/////////////////////

const oneWord = function (Str) {
  return Str.replace(/ /g, '').toLowerCase(); //replaces all the spaces with an empty string and also convert that into lower case
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' '); //separate the first word from the rest of the string, (rest operator used)
  return [first.toUpperCase(), ...others].join(' '); //first word is CAPITALISED and then joined wth the rest of the string
};

//HIGHER-ORDER FUNCTION
const transformer = function (str, fn) {
  //function will be passed an an argument, making the function passed to be a callback function and the transformer function to be a high-order function.

  console.log(`Old string: ${str}`); //gives the old function

  console.log(`Transformed String: ${fn(str)}`); //this is where we call the function

  console.log(`Transformed by ${fn.name}`); //".name" gives the name of the function
};

transformer('JavaScript is the Best!', upperFirstWord);

transformer('JavaScript is the Best!', oneWord);

const high5 = function () {
  console.log('HIGH FIVE!');
};

document.body.addEventListener('click', high5); //as soon as we click on the body, JS will call this function, the call-back function in this case is also called the event handler or event listener

['Jonas', 'Martha', 'Adam'].forEach(high5); //we get three high fives, as we have three elements in the array, one for EACH. We use the concept of callback function here as well.

//////////////////////About CALL BACK functions////////////////////
//CALL BACK function makes it easy to split up codes into more re-usable and interconnected parts.
//CALL BACK functions allows to create ABSTRACTION (hides the details of code implementation as they at times might overcomplicate, and allows us to think about problems at a higher more abstract level.
//Higher-order functions are called so as they operate at a higher level of abstraction while the callback functions operate at a lower level of abstraction.
//here "transformer" function does not really have the code that is needed to transform the string, it does so by calling other functions like "oneWord" or "upperFirstWord" functions which are the callback functions, therefore the "transformer" operates at a higher level of abstraction while the callback functions operate at a lower level of abstraction.

///////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////

//////////////////////Functions returning Functions//////////////////////////////

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

//******************************
//We can also use this in partial application as we see later

const greeterHey = greet('Hey'); //result of this function call will be the returned function, the value stored in "greeterHey" is so the returned function, so this means hat we can call greeterHEy as a function.

greeterHey('Jonas'); //Hey Jonas
greeterHey('Steven'); //Hey Steven

//closure involved in the above process (IMPORTANT)

greet('Hello')('Jonas'); //called in one line, Hello Jonas

//These are important in functional programming

//***********************************************
//arrow function returning another arrow function
//const greet = greeting => name => console.log(`${greeting} ${name}`);

/////////////////////////////////////////////////////////////////////////////////

///////////////////////The call and apply method/////////////////////////////////

const luftansa = {
  airline: 'Luftansa',
  iataCode: 'LH',
  bookings: [],
  //book:function(){}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name }); //adding a new object to the bookings
  },
};

luftansa.book(239, 'Abir Sikdar');
luftansa.book(635, 'Jonas Schedtmann');

//luftansa group decides to create a new airline
const euroWings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = luftansa.book; //this is possible because JS has first-class functions, we store the function as a value in the variable "book", outside to prevent copying the same function to different objects to give then the same feature, we are here copying the method and that makes it a function.

//book(23, 'SarahWilliams'); // Cannot read property 'airline' of undefined, this happens as now the book function is just a regular function call and the "this" keyword of a regular function call points to undefined, in strict mode
//THE book function called above is not a method anymore, it is a FUNCTION.

//"this" keyword depends on how the function is actually called

//To make the code work in the line 204,"this" keyword should point to some object and not "undefined", we have to specify it explicitly or manually, there are three function methods to do that and they are "call", "apply" and "bind".

/////////////////////////call() method///////////////////////////////

//call(x,y,z...) the first argument of the call() method is what we want the "this" keyword to point to, the call method then calls the function with the this keyword set to the first argument passed, the next arguments are for the function which the call() method will call, number of arguments after the first argument depents on the number of parameters the function has.

book.call(euroWings, 23, 'Sarah Williams');
console.log(euroWings);

book.call(luftansa, 239, 'Mary Cooper');
console.log(luftansa);

//new flight company
const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 453, 'Mary Cooper');

/////////////////////////////////////////////////////////////////////

///////////////////////////apply() method////////////////////////////

//apply(x,y) is same as the call() method, but the apply method does not take a list of arguments, after the first argument (that sets the "this" keyword), instead it takes an array of arguments as the second argument (y).

const flightData = [534, 'George Cooper']; //array of data

book.apply(swiss, flightData);
console.log(swiss);

// book.call(swiss, ...flightData);//better method

/////////////////////////////////////////////////////////////////////////////////

////////////////////////////////bind() method////////////////////////////////////

//bind() method also allows us to manually set the "this" keyword for any function call, but the difference is that the bind() method does not immediately call the function, instead it returns a new function where the "this" keyword is bound/set to whatever value we pass into bind();

const bookEW = book.bind(euroWings); //will not call the book function, instead it will return a new function where the "this" keyword is always set to euroWings.

console.log('The function returned in bind() method');
console.log(book.bind(euroWings));

bookEW(23, 'Steven Williams'); //here we no longer need to specify the "this" keyword again.
console.log(euroWings);

const bookLH = book.bind(luftansa); //function with "this" keyword set to luftansa

const bookLX = book.bind(swiss); //function with :"this" keyword set to swiss

//In the bind() method we can pass multiple arguments apart from setting the "this" keyword only...

//Partial application, a part of the arguments of the original function are already applied/set

const bookEW23 = book.bind(euroWings, 23); //passing 23 as an argument here will always call the function book with 23 as the first parameter ("flightNum") and the "this" keyword set to euroWings ofcourse.

//both of the names are booked for the same flightNum i.e. 23.
bookEW23('Martha Cooper');
bookEW23('Jonas Schedtmann');

bookEW23(34, 'Erling Haaland'); //even though I pass two arguments, still the flightNum is 23 and not 34, rather 34 is considered as the next argument that the function expects and "Erling Haaland" is ignored as there are no more arguments that the function expects  //34 booked a seat on Eurowings flight EW23

//const bookEWJonas = book.bind(euroWings, undefined, 'Jonas'); //this does not word, we cannot skip an argument and make the book function use "Jonas" as the second argument always.
//bookEWJonas(34); //Jonas booked a seat on Eurowings flight EWundefined,  thought it will work but the function will not be able to have different flightNum.

///////////////////////With Event Listeners/////////////////////////

//adding to the luftansa object
luftansa.planes = 300;
luftansa.buyPlane = function () {
  console.log(this); //<button class="buy">Buy new plane 🛩</button>, in an event handler function the "this" keyword always points to the element that it is attached to.
  this.planes++;
  console.log(this.planes); //NaN
};

document.querySelector('.buy').addEventListener('click', luftansa.buyPlane); //In this case the event handler is calling the function buyPlane and so the element it is attached to becomes the "this" keyword.

luftansa.buyPlane(); //this: luftansa object, increment in planes

//to make the code work in the line 285, we have to set the "this" keyword o the object luftansa
document
  .querySelector('.buy')
  .addEventListener('click', luftansa.buyPlane.bind(luftansa)); //this:luftansa object, increment in planes.

//this points to "swiss" and this.planes is NaN as the function is not in the swiss object
// document
//   .querySelector('.buy')
//   .addEventListener('click', luftansa.buyPlane.bind(swiss));

////////////////////////////////////////////////////////////////////

/////////////////////Partial Application////////////////////////////

//we preset the parameters

const addTax = (rate, value) => value + value * rate;

console.log(addTax(0.1, 200));

//creating a brand new more specific function based on a more general function using the .bind() method

const addVAT = addTax.bind(null, 0.23); //here we have set the "this" keyword to null as that is not the main interest, we preset the rate parameter to 0.23 and store it in a variable addVAT that is also a function and can be called with just passing the value now.

//const addVAT = value => value + value * 0.23; //this is same as the code in the line 309

console.log(addVAT(505)); //we are just passing the value here on which the VAT tax is applied.

////////////////////////////////////////////////////////////////////

/////////////////////////////challenge//////////////////////////////

//apply partial application using function returning function
const tax = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const vat = tax(0.23);
console.log(vat(505));

////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////

////////////////////Immediately invoked function expressions//////////////////////

//sometimes we need a function that is only executed once, and then never again, a function that disappears right after calling once. (Technique needed later in async and wait)

const testFunc = function () {
  console.log('"testFunc" function is called');
};

testFunc(); //can be called multiple times and will still work and call the function, that will make the function run. There is nothing stopping us from making it run again.

//we want the function to be executed immediately, not having to save it somewhere.

//Immediately invoked function expression (IIFE)
(function () {
  //if we try to run this function statement like this, without assigning it to any variable, we will get an error: Function statements require a function name
  console.log('This will never run again');
  const isPrivate = 23;
})(); //we trick JS by wrapping the statement into parenthesis"()"", and transform it into an expression

//**********************************
//above function structure explained

// //(function () {
//   //if we try to run this function expression like this, without assigning it to any variable, we will get an error: Function statements require a function name
//   console.log('This will never run again');
// })//function value        ();//calling the function immediately.

//also works with arrow functions
(() => console.log('This will also never run again'))();

//Why was IIFE created?

//we already know that functions create scopes,An outer scope does not have access to variables from the inner scope.

//console.log(isPrivate); //isPrivate is not defined.

//All data defined inside a scope is private, the data is encapsulated inside the scope. It is important to hide variables and scopes are a good tool.

//IIFE is not a feature of JS but a pattern that developers came out with.

//Now, variables declared with let or const, create their own scope inside a block.

{
  const stillPrivate = 23;
  var isAccessible = 23;
  let letsSEE = 23;
}

//console.log(stillPrivate);//stillPrivate is not defined

//console.log(isAccessible); //23

//console.log(letsSEE); //letsSEE is not defined

//We do not use immediately invoked function expressions are not that used anymore, if all we want is data privacy, now in modern JS we can create a block using "{}" to create a scope of its own that does not let variables declares with const or let to be accessible outside.

//But if we need a functions to be executed just once then the IFFE is still the way to go.

/////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////Closures///////////////////////////////////////
//*******************************************************************************
/////////////////////////also inlcludes notebook notes///////////////////////////

//a closue is not a feature that we explicitly use, we dont create closures manually like we create a new function or an array. A closure simply happens automatically in certain situations, we just need to identify those situations.
const secureBooking = function () {
  let passengerCount = 0; //cannot be accessed or manipulated from outside, as it is inside the function scope

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking(); //booker is now a function as the function returned by the secureBooking function is stored in it.

//calling the booker function multiple times

booker(); //1 passengers
booker(); //2 passengers
booker(); //3 passengers

//THE BOOKER FUNCTION IS SIMPLY A FUNCTION THAT EXISTS OUT IN THE GLOBAL SCOPE

//the booker function is able to manipulate the passengerCount variable

//this seems to be not possible as the passengerCount variable is in the secureBooking function that has already finished its execution

//the secureBooking function has already finished its execution, so its EXECUTION CONTEXT is no longer in the stack

//but still the inner function (booker function) is able to access the passengerCount variable thats inside of the secureBooking function that should no longer exist

//this is due to CLOSURE

//THE BOOKER FUNCTION IS SIMPLY A FUNCTION THAT EXISTS OUT IN THE GLOBAL SCOPE, THE ENVIRONMENT IN WHICH THE INNER FUNCTION WAS CREATED (inside the secureBooking function) IS NO LONGER ACTIVE, BUT THE BOOKER FUNCTION IS STILL SOMEHOW ABLE TO ACCESS THE VARIABLE THAT WAS PRESENT AT THE TIME THE IT WAS CREATED (here variable is the passengerCount). THIS IS WHAT CLOSURE DOES, IT MAKES A FUNCTION REMEMBER ALL THE VARIABLES THAT WERE PRESENT AT THE FUNCTIONS BIRTHPLACE (here the secureBooking).

//This cannot simply be explained wtih the scope chain alone.

//The secret of closure lies in the fact that, any function has always the access to the variable environment of the EC in which the function was created (here secureBooking) even after that EC is gone.

//scope chain is actually preserved through the closure even though the scope is already destroyed because its EC is gone, variable environment somehow keeps living in the engine even though its EC is destroyed.

//CLOSURE HAS A PRIORITY OVER SCOPE CHAIN
//If a variable is not present in the current scope, JS will immediately look into closure and see if it can find variable there and it does this even before looking into the scope chain. Even if there was a global variable with the same name, JS would still use the one in  the closure, so closure has the priority over the scope chain.

//When booker() function is called multiple time, it manupulates the passengerCount, logs it into the console (as the function here instructs if to) and then its EC pops out of the call stack after the function has completed its execution. Next time when the function is called again, we get a new EC, the closure is still there, attached to the function, with the last updated value. Again, the function manipulates the value of passengerCount and logs it and its EC pops out of the call stack once the function has colmpleted its execution.

//We do not have to create closures manually, it is a feature of JS that happens automatically, it is an internal property of a function. WE CANNOT ACCESS CLOSED-OVER VARIABLES EXPLICITLY. WE CAN OBSERVE CLOSURE BUT WE CANNOT DIRECTLY ACCESS THESE VARIABLES.

//HOWEVER WE CAN LOOK AT ITS INTERNAL PROPERTY

console.dir(booker); //ƒ anonymous()
//                       arguments: (...)
//                       caller: (...)
//                       length: 0
//                       name: ""
//                       prototype: {constructor: ƒ}
//                       [[FunctionLocation]]: script.js:406
//                       [[Prototype]]: ƒ ()
//                       [[Scopes]]: Scopes[3]                                  //double square brackets mean it is an internal property and we cannot access it with our code

//                          0: Closure (secureBooking) {passengerCount: 3}      //***closure***

//                          1: Script {bookings: Array(4),flight: "LH234", abir: {…}, createBooking:ƒ,  checkIn: ƒ, …}

//                          2: Global {window: Window, self: Window, document: document, name: "", location: Location, …}

/////////////////////////////////////////////////////////////////////////////////

//////////////////////////////closure examples///////////////////////////////////

//we dont always need to return a function from another function to create a closure.

///////////////////EXAMPLE 1////////////////////

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

//f value assigned a second function
const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g(); //a will be 23, f will become a function; g() function finishes execution, VE of g no longer there.

f(); //46//the f() function (assigned as function inside the g function) closes-over any variable in the execution context in which it was defined (here g() function) even thought f was at first not a function and was not defined/born in the EC of g(), it was defined in the global scope.

console.dir(f); //[[Scopes]]: Scopes[3]
//                      0: Closure (g) {a: 23}

h(); //b will be 777, f will be assigned again as a function; h() function finishes execution, VE of h() no longer.

f(); //1554// the f function now closes-over the variable environment of function h() where it was re-assigned, even thought it was already assigned as a function in function g()

console.dir(f); //[[Scopes]]: Scopes[3]
//                     0: Closure (h) {b: 777}

//a closure can change as the function is re-assigned, closure always makes sure that the function does not loose the connection to the variables that was present at its birthplace, here at first inside g() and again in h().

////////////////////////////////////////////////

//////////////////EXAMPLE 2/////////////////////

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    //call back function
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups each with ${perGroup} passengers`);
  }, wait * 1000); //the setTimeout function takes two arguments, the first one is a function and the second is the time in milliseconds after which that function will be executed.

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000; //the callback function will not use this as this is in the global scope, it will use the perGroup in its closure, closure has priority over scope chain.

boardPassengers(180, 3); //Will start boarding in 3 seconds       (this will be logged to the console immediately)

//                          (after 3 seconds the lines below will be logged to the console)

//                         We are now boarding all 180 passengers
//                         There are 3 groups each with 60 passengers

//When the boardPassengers function is called, the perGroup variable is created, the setTimeout function is called and that will register the callback function (which will be called later), then the remaining lines of the function are executed, here "console.log(`Will start boarding in ${wait} seconds`);". The EC of the function boardPassengers() with its variable environment is popped off the call stack after execution and then after calulated time the callbackl function is executed.

//The call back function was executed completely independently from the boardPassengers() function, still the call back function was able to use all the variables that were in the variable environment in which it was created (variables are perGroup and n (argument, local variables in the function)). This is a closure. The call back function was able to access the variables defined the function boardPassengers() which finished its execution earlier, as it created a closure.

/////////////////////////////////////////////////////////////////////////////////
