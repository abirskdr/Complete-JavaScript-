'use strict';

/////////////////////////////************SCOPE**********/////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

console.log(' ');
console.log('SCOPE');
console.log(' ');

/////////////////////////////////////////////////////////////////////////////////////////////////

//function scoping
function calcAge(birthYear) {
  const age = 2037 - birthYear;
  //console.log(lastName); //variable not found anywhere so we get error (this lastName is not defined).
  //console.log(firstName); //available since global variable.

  //child function scoping
  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`; //gets age variable from parent function and firstName from the global scope and birthYear from its outer function scope.
    console.log(output);

    //block scoping
    if (birthYear >= 1981 && birthYear <= 1996) {
      var millennial = true;
      const firstName = 'Steven'; //DECLARING A NEW VARIABLE firstName INSIDE THIS BLOCK..... the firstName here and the firstName in the global scope are completely different variables as they are defined in different scope, we can have multiple variables with the same name if they are defined in different scopes and can have different values.

      const str = `oh, and you are a millennial, ${firstName}`; //gets firstName from the same scope as JS looks for firstName though both variables have the same name, but have different values, variable lookup starts from the same scope as it is found in the same scope we see Steven  and JS does not go for variable lookup in the scope chain.
      console.log(str);

      /////////////////////////////////
      //function is also a block scoped (only in strict mode) as per ES6

      function add(a, b) {
        return a + b;
      }

      add(2, 3); //calling the function inside the block.

      output = 'NEW OUTPUT'; //reassigning a variable inside a child scope that we accessed from the parent scope.
    }
    console.log(millennial); //can be accessed as var is not block scoped.
    //console.log(str); //const and let variables inside a block "{}" are block scoped

    //add(2, 3); //cannot call the function here as function are block scoped and can be only called inside the block where it was defined.

    console.log(output); //NEW OUTPUT... as we have reassigned the variable we have not created a new variable that is restricted to its scope, so output here has the value we last assigned it.
  }
  printAge();
  return age;
}

//

//

//console.log(age); //here we will not be able to access the age variable as this is outside the scope.

//printAge();//here we will not be able to access the printAge() function as this is outside the scope.

// console.log(calcAge(1991)); //if called here gives error as firstName is still not declared.

const firstName = 'Abir'; //global variable.

console.log(calcAge(1991)); //No problem here as the firstName variable is already in the global execution context, the code inside the function is executed only after the code is called.

/////////////////////////////////////////////////////////////////////////////////////////////////

console.log(' ');
console.log('HOISTING AND TDZ');
console.log(' ');

/////////////////////////////Hoisting and TDZ////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

console.log(me); //undefined
//console.log(job); //job variable is still in the temporal dead zone (TDZ)...remember.....THE TDZ FOR ANY VARIABLE STARTS FROM THE BEGINNING OF THE CURRENT SCOPE HERE, THE GLOBAL SCOPE TO THE POINT WHERE IT IS DEFINED HERE,
//console.log(year);//same error for year

var me = 'Jonas';
let job = 'teacher';
const year = 1991;

console.log(addDec(2, 3)); //works for function declaration

//console.log(addExpr(2, 3)); //gives error as the function here is a const variable and is in the TDZ too.

//console.log(addArow(2, 3));//gives error as the function here is a const variable and is in the TDZ too.

function addDec(a, b) {
  //function declaration
  return a + b;
}

const addExpr = function (a, b) {
  //function expression
  return a + b;
};

const addArrow = (a, b) => a + b; //arrow function

/////////var////////////

// console.log(adExpr(3,4));//if now this is called we get an error as this is not a function. This is because any variable defined with var will be hoisted and set to undefined and we are trying to call undefined

// console.log(adArrow(3,4));//if now this is called we get an error as this is not a function. This is because any variable defined with var will be hoisted and set to undefined and we are trying to call undefined

// var adExpr = function (a, b) {
//   return a + b;
// };

// var adArrow = (a, b) => a + b;

///////////////////////////pitfall of hoisting (using var)////////////////////////////

if (!numProducts) deleteShoppingCart(); //we get "All products deleted" even if numPrducts is not 0
//here numProducts is undefined which is also a falsy value so we get the above statement right
//SO DONT USE VAR TO DECLARE VARIABLES TO AVOID THESE TYPES OF BUGS

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted');
}

var x = 1; //variables created with var will create a property on the global window object and that can have some implications in some cases.
let y = 2; //variables created with let will not create a property on the global window object.
const z = 3; //variables created with const will not create a property on the global window object.

console.log(x === window.x); //true

console.log(y === window.y); //false

console.log(z === window.z); //false

////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////

console.log(' ');
console.log('"THIS" Keyword ');
console.log(' ');

////////////////////////////////////////"THIS" Keyword////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

console.log(this); //this keyword in the global scope is the window object.

//

//regular function
const calculateAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); //in strict mode this keyword inside a regular function(when the function is not attached to any object) is undefined in strict mode, in sloppy mode it will be the global object as before.
};
calculateAge(1991);

//

//arrow function
const calculateArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this); //the arrow function does not get its own this keyword, it uses the this keyword of its parent(lexical this keyword) function/scope.In this case the scope is window.
};
calculateArrow(1991);

//

//this keyword inside a method
const abir = {
  year: 2000,
  calcAgeOfPerson: function () {
    console.log(this); //here this gives us the abir object.abir is the owner of the method
    console.log(2037 - this.year); //37
  },
};
abir.calcAgeOfPerson(); //this keyword will point to the object that is calling the method, this keyword will not simply point the object in which we wrote the method
//abir object is calling calcAgeOfPerson that is why this points to abir, not because the method is in the object.

const matilda = {
  year: 2017,
};

///////////////////////method borrowing/////////////////////////////
matilda.calcAgeOfPerson = abir.calcAgeOfPerson; //we copy the calcAgeOfPerson function from abir to matilda.

console.log(matilda.calcAgeOfPerson); //We will be able to see calcAgeOfPerson function in matilda object also.

matilda.calcAgeOfPerson(); //this keyword in the calcAgeOfPerson function will now point to matilda as matilda is the object that is calling the method,so this.year=2017 now

//copying function into a variable
const f = abir.calcAgeOfPerson; //we are copying the function into a new variable. Because function is a value

console.log(f); //shows the method calcAgeOfPerson

//f(); //'this' will now be undefined, this happens because as we have copied the method from the abir object to a variable, it has now become a regular function call, 'this' is undefied in a regular function call.

////////////////////////////////////////////////////////////////////////////////////////////////////

console.log(' ');
console.log('Regular Functions vs. Arrow Functions');
console.log(' ');

////////////////////////////////////////////Regular Functions vs. Arrow Functions/////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////using arrow function inside object///////////////////////////////////////

const gabriel = {
  //objects are not blocks, it DO NOT create its own scope, it is an object literal, all of the key value pairs inside it are still in the global scope, but they cannot be accessed by the arrow function even by calling it with the method they are in as "this" used in arrow functions point to window scope, to access them the "this" should point the object they are in.[******Check the fact that they are in the global scope******].
  fName: 'Gabriel',
  date: 25,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.date);
  },
  greet: () => {
    console.log(this);
    console.log(`Hey ${this.fName}`);
  },
};
gabriel.greet(); //Hey undefined, arrow function does not get its own this keyword, it uses the this keyword of its parents function/this points to the parent's scope. As there is no fName in window object we get undefined.

console.log(this); //window object, this proves that objects are not block,they are object literals, so as arrow functions do not get their own "this" keyword, they look for their parent scope and as objects do not have their own scope the this inside of the arrow function goes for the global scope, points to the window object.

console.log(this.fName); //this gives us "undefined" as there is no fName till now in the window object

var fName = 'Mat'; //when we use var to create any variable, we create a property in the window object, as this of arrow object points towards the window object it finds fName.
gabriel.greet(); //Hey Mat///even though the arrow function was called by the gabriel object.

//never use arrow function as the method////////////////////////////////////////////////////

//////////////////////function inside of a method///////////////////////////////////////////

const kyle = {
  nickName: 'kyle',
  year: 2002,
  kyleAge: function () {
    console.log(this);
    console.log(2037 - this.year);

    // //[PRE ES6 SOLUTION OF USING A FUNCTION INSIDE A METHOD]///////////////////

    // const self = this; //creating a self(or that) as the this keyword inside a regular function is undefined.

    // const isMillenial = function () {
    //   console.log(self.year >= 1981 && self.year <= 1996); //now JS goes up the scope chain to find the self variable in the parent scope and through that it gets access to the year key.

    //   // console.log(this.year >= 1981 && this.year <= 1996); //this keyword is undefined
    // };
    // isMillenial(); //this is a regular function call, and inside a regular function call the "this" keyword is undefined,

    // ///////////////////////////////////////////////////////////////////////////

    //[SOLUTION 2 IS USING AN ARROW FUNCTION INSIDE A METHOD TO USE THIS PROPERLY]

    const arrowIsMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996); //as arrow functions do not have thier own this keyword they use the this keyword of their parent scope (HERE THE PARENT SCOPE IS A METHOD)
    };
    arrowIsMillenial();

    //////////////////////////////////////////////////////////////////////////////
  },
  greetings: () => {
    console.log(this);
    console.log(`Hey ${this.nickName}`);
  },
};
kyle.kyleAge();

//

//Arguments Keyword in functions//////////////////////////////////////////////////

//Regular function

const expressionAddition = function (a, b) {
  console.log(arguments); //printing the arguments keyword
  return a + b;
};
expressionAddition(2, 5); //we have specified exactly the arguments that we have here in the list of parameters

expressionAddition(2, 5, 8, 9); //It is allowed to add more arguments, they will not have name but they exist, they do appear in the arguments (in form of array elements) and we can use them.

//In arguments keyword the arguments are arranged in an array and we can use loops to use them.

//Arrow function

const expressionArrowAdd = (a, b) => {
  console.log(arguments); //arguments keyword do not exist in arrow function.
  return a + b;
};
//expressionArrowAdd(2, 5, 8);

///////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////

console.log(' ');
console.log('Primitives Vs. Objects(Primitive vs. Reference Types) ');
console.log(' ');

////////////Primitives Vs. Objects(Primitive vs. Reference Types) /////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

let myAge = 30;

let myOldAge = myAge; // at this point myAge was still 30 so prints so

myAge = 31;

console.log(myAge); //31

console.log(myOldAge); //30

const myself = {
  name: 'Jonas',
  age: 30,
};

const friend = myself; //copying the myself object to friend variable (suppose friend has the same name but different age)

friend.age = 27; //we want to change the age of friend object to 27

console.log('Friend:', friend); //age 27

console.log('Myself', myself); //age 27

//both have ages 27

//Primitive Types are stored in the CALL STACK

let lastName = 'Williams'; //suppose the variable is pointing to the address 0001 and has the value 'Williams'.(variables do not point to the value but the address they are stored in)

let oldLastName = lastName; //as we do this the oldLastName olso points to the address 0001

lastName = 'Davis'; //as we change the value of lastName a new address is created where the new value is stored (values to a certain address are immutable, cannot be changed) so now the lastName variable points to the new address 0002 which has the value 'Davis'

console.log(lastName, oldLastName); //both values are different.

//Reference Types are stored in HEAP

const jessica = {
  //the values of objects can be large and so are stored in the heap, suppose the address where the values of this object is stored is D504, in the call stack the variable jessica points to the address suppose 0003 which has the value same as the address in the heap stack that is D504, the memory created in the call stack points to the memory which hold the object in the heap by using memory address in the (piece of the memoy in the call stack has reference to the piece of memory in heap which holds for the object, this is why we call objects reference types)
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

const marriageJessica = jessica; //copying the original jessica object to the constant variable marriedJessica when we are copying we are actually creating a new variable that is pointing to the same address 0003 in the call stack that jessica was pointing to, this way both point to the same object (DOES NOT CREATE A NEW OBJECT IN THE HEAP).

marriedJessica.lastName = 'Davis'; //we can make changes to the contents of the object even though it is constant as we are not changing the address of the variable in the call stack nor we are changing the reference, change occurs in the heap where the object is stored.

console.log('Before Marriage', jessica); //both have the same lastName
console.log('After Marriage', marriedJessica); //both have the same lastName

//marriedJessica = {}; //now it is assigned to a complete new empty object, this will not work as we have to change the reference and this is const

///////copying an object [Shallow copy]//////////////////////////////////////////

const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'], //array is also an object
};

const jessicaCopy = Object.assign({}, jessica2); //this function merges two objects and returns a new object that is created in the heap and has no connection with the objects it is merged out of (here we merge an empty object with jessica2).

jessicaCopy.oldLastName = 'Davis';

console.log('Before Marriage', jessica2); //Williams
console.log('After Marriage', jessicaCopy); //Davis

//PROBLEM: this technique only works for the first level, that is if there is an innner object (object inside of the object) the inner object will still be the same (still point to the sme place in the memory), that is why this is called a SHALLOW COPY.

//manipulating the family object (array) from the object jessicaCopy

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log('Before Marriage', jessica2);
console.log('After Marriage', jessicaCopy);
//both have 4 elements in the family object (inner object)

//to prevent this we need to create a deep copy.
