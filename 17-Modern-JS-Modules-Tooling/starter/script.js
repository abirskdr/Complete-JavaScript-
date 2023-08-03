///////////////////An overview of modern JS Development//////////////////
//***********************************************************************
//check notes
//***********************************************************************
/////////////////////////////////////////////////////////////////////////

//////////////////An Overview of Modules in JS///////////////////////////
//***********************************************************************
//check notes
//***********************************************************************
/////////////////////////////////////////////////////////////////////////

///////////////////////Expporting and Importion in ES6///////////////////

////////////////////////////IMPORTING MODULE/////////////////////

/////////////////////////////////////////////////////////////////

// //we didnt use strict mode as all modules are executed in strict mode

// import './shoppingCart.js';

// //*****error- Cannot use import statement outside a module*****, when we want to connect the module to the HTML file, we have to specify the "type" in the script tag as "module"

// console.log('importing module');

// //////////////////////

// //exporting module  //this code is executed first
// //importing module

// //////////////////////

/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////

// // import './shoppingCart.js'; //all the importing statements are hoisted to the top

// // console.log(shippingCost); //shipping cost is not defined
// //shippingCost is scoped to the current module

// import { addToCart } from './shoppingCart.js';

// //we can call the function as if it was defined in the same scope

// addToCart('bread', 5);

/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////

// //we can also export multiple values at once using named exports

// import { totalPrice as price, tq } from './shoppingCart.js';
// //we impory totalPrice as price, when we use it we use "price"

// console.log(price, tq);

/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////

// //we can also import all the exports of a module at the same time

// import * as ShoppingCart from './shoppingCart.js';
// //creates a namespace for all the values exported from that module

// console.log(ShoppingCart); // creates an object containing all the exported values from the module

// //the module "shoppingCart.js" is exporting (like/ kind of) a public API just like a class, it is as if the object "ShoppingCart" is an object created from a class, which has these properties and methods

// ShoppingCart.addToCart('bread', 5);

// console.log(ShoppingCart.totalPrice, ShoppingCart.tq);

/////////////////////////////////////////////////////////////////

//////////////////IMPORTING Default export///////////////////////

// import add from './shoppingCart.js';

// add('pizza', 2);

// //we can also mix importing named exports and default exports, but in practice we nexer do that

// // import add2, { addToCart, totalPrice as price, tq } from './shoppingCart.js';

/////////////////////////////////////////////////////////////////

////////////IMPORTS ARE A LIVE CONNECTION to EXPORTS/////////////

import add, { cart } from './shoppingCart.js';

add('pizza', 2);
add('bread', 5);
add('apple', 4);

console.log(cart); //this is not an empty array anymore, whatever changes we make in the cart is reflected, we now have an array of object, this shows that cart is not simply a copy of the value that we exported here

//IMPORTS ARE NOT COPIES OF THE EXPORT< THEY ARE INSTEAD LIKE A LIVE CONNECTION THEY POINT TO THE SAME PLACE IN MEMORY

/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////

/////////////////////////TOP-LEVEL AWAIT (ES2022)////////////////////////

// //we can now use the "await" keyword outside of the async functions, atleast in modules

// //right now this only works in modules (<script type="module"   ...> is required for top-level await to work)

// //before we had to write
// //async function x() {}

// //now with top-level await in modules it is no longer necessary, "await" keyword is now working outside of an async function
// const res = await fetch('c');

// const data = await res.json();

// console.log(data);

// ////////THIS ACTUALLY BLOCKS THE EXECUTION OF THE ENTIRE MODULE///////

// console.log('something'); //in the nework tab, we change it into slow 3G, it takes some time to fetch the data and until then 'something' is not logged to the console

// //the "await" keyword working outside of as async function is blocking the execution of the entire module

// //////////////////////a more real-world example////////////////////

// const getLastPost = async function () {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();
//   console.log(data);

//   return { title: data.at(-1).title, text: data.at(-1).body };
// };

// const lastPost = getLastPost();

// console.log(lastPost); // this returns a promise, and not the object that we were expecting, as calling an async function, will always returns a promise, because by the tiime we are running 125th line of code, the data has not yet arrived, so we have that pending promise

// lastPost.then(last => console.log(last)); //we get the object after some time

// // *********************************************************************
// // this way of doing it is not really clean, we can use top-level await for this.

// const lastPost2 = await getLastPost(); //top-level await in this line blocks the execution of code in the module after this line until it fetches the data, so lastPost2 is logged only after we have recieved the data and not a pending promise
// console.log(lastPost2);

// //////////////////////////////////////////////////////////////////////

// ///////////IMPORTANT IMPLICATION OF USING TOP-LEVEL AWAIT/////////////

// //if one module imports a module which has a top-level await, then the importing module will wait for the imported module to finish the blocking code

// //"script.js" is the "importing module", "shoppingCart.js" is the "imported module" here

/////////////////////////////////////////////////////////////////////////

////////////////////////////THE MODULE PATTERN///////////////////////////

// ///////the module pattern that we used to use before in order to implement modules in JS///////

// //main goal of module pattern is to encapsulate functionality, to have private data and to expose a public API just like in modules in ES6

// //

// //we write an IFFE, this way we dont have to call it separately and also ensure that is only called once

// //the only purpose of this function is to create a new scope and return data just once

// const ShoppingCart2 = (function () {
//   const cart = [];
//   const shippingCost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(
//       `${quantity} ${product} was added to the cart, shipping cost is ${shippingCost}`
//     );
//   };
//   //"addToCart" has access to shippingCost due to closure, closures allows a function to have access to all the variables that were present at its birthplace, IFFE function is the birthplace of the "addToCart" function and it never looses its connection to its birthplace, in its birthplace we have the variables as cart, shoppingCost, etc.. and it can access these variables as well (note that we are not using "this.shippingCost").

//   const orderStock = function (product, quantity) {
//     console.log(`${quantity} ${product} ordered from supplier`);
//   };

//   //we simply return an object of stuff we want to make public (public API)

//   //the returned object is not stored anywhere, right now, if we want to store it, we assign the result of this IFFE to a variable
//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();

// ShoppingCart2.addToCart('apple', 4);
// ShoppingCart2.addToCart('pizza', 2);

// console.log(ShoppingCart2); //the object we returned

// // ShoppingCart2 is not available in the console, as it is basically the global scope, as ShoppingCart2 is in the module "script.js", everything inside of a module is private to that very module

// console.log(ShoppingCart2.shoppingCost); //undefined (property that we did not return in the object is still private and not accessible)

// /////////////The Problems With This///////////////

// //If we wanted one module per file, we would have to create different scripts and link all of then in the HTML file and that creates problems as then we would have to be careful in order we declare them in HTML, and would have all of the variables living in the global scope, and we also couldnt bundle them together using a module bundler

// //////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////

//////////////////////////COMMON JS MODULES//////////////////////////////

//There are also other module systems that have been used by JS in the past, they were not native JS, they relied on some external JS implementation, e.g.- AMD MODULES, COMMON JS MODULES

//COMMON JS MODULES are used in NODE JS, it is very recent that ES6 modules have been implemented in Node JS.

//almost all the modules in the npm repository still use the common js module system
//npm was originally only intended for node js, later npm became the standard repository for the whole JS world

//just like ES6 modules, in common JS one file is one module

////////TO EXPORT////////

// export.addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(
//     `${quantity} ${product} was added to the cart, shipping cost is ${shippingCost}`
//   );
// };

// // this does not work in the browser, but it works in node js

// // the "export" keyword is an object

/////////TO IMPORT////////

// const {addToCart}=require('./shoppingCart.js');

// // "require" function is called

/////////////////////////////////////////////////////////////////////////

////////////////////////////Intro to Command Line////////////////////////
//***********************************************************************
// revise from video
//***********************************************************************
/////////////////////////////////////////////////////////////////////////

//////////////////////////Introduction to NPM////////////////////////////
//***********************************************************************
//check notes
//***********************************************************************

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
//for all module bundlers we do not need to give the full path to any module

import cloneDeep from 'lodash-es';
//parcel will then automatically find the path to this module, and import it
//this works with all kinds of assets HTML, CSS, images, modules (not only ES6 modules but also commonJS modules)

//deeply nested object
const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

//copying an object using JS
const stateClone = Object.assign({}, state);

// state.user.loggedIn = false;

console.log(stateClone); //loggedIn in stateClone is also false

//////////creating a DEEP COPY///////////

const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;

console.log(stateDeepClone); //loggedIn in stateDeepClone is not false, this shows that it is a true deep copy

/////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////

//npm i (installs all the packages looking at the dependencies)

///////////////////BUNDLING WITH PARCEL AND NPM SCRIPTS//////////////////
//***********************************************************************
//check notes
//***********************************************************************

//dev dependencies are tools that we need to build our application.

//whenever we save, it reloads the page, however in parcel we can activate something even better, that is "hot-module-replacement"

//code piece that only parcel understands, it does not make it into our final bundle, as browser does not understand any of it
if (module.hot) {
  module.hot.accept();
}
//this means whenever we change one of the modules, it will then ofcourse trigger a rebuild, that new modified bundle will then automatically get injected into the browser without triggering a whole page reload
//************************************* */
//good for maintaining state while testing

//NOTICE that the cart keeps growing each time we save, the reason is hot module replacement, the state is maintained whenever we reload the page, 3 items keep on adding to the cart, we are simply adding new objects to the object that keeps persisting over page reloads (works with all states)

/////////////////////////////////////////////////////////////////////////

/////////////////////Configuring Babel and Polyfilling///////////////////

//Babel is used to transpile the new modern code to old ES5 code

//It is useful as there are many people who are stuck with old browsers

//Parcel automatically uses babel to transpile our code

//we go with default

//go to babeljs.io

//babel works with plugins and presets that can be both configured

//Parcel uses @babel/preset-env

//@babel/preset-env only includes the final features, features that are already part of the language, after passing the 4 stages of the ECMA process

//checking if 'class-fields' are supported by @babel/preset-env

///////////////transpiling class-fields//////////////////////

class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}

const jonas = new Person('Jonas'); //works

/////////////////////////////////////////////////////////////

//We see in the video that @babel/preset-env converts the 'class-fields' to ES5

//checking if @babel/preset-env supports nullish-coalescing operator

///////////////nullish-coalescing operator///////////////////

console.log('Jonas' ?? null); //works

/////////////////////////////////////////////////////////////

///////////////////ES6 find() method/////////////////////////

console.log(cart.find(el => el.quantity >= 2)); //returns the first object that fulfills the condition

//we see that find() is still there in the index.8cfc62b9.js and has not been converted to ES5

/////////////////////////////////////////////////////////////

//////////////////Promise (an ES6 feature)///////////////////

Promise.resolve('Test').then(function (x) {
  return console.log(x);
});

//we see that 'Promise' is still there in the index.8cfc62b9.js and has not been converted to ES5

/////////////////////////////////////////////////////////////

//the above find() and Promise work as our browser supports/understand ES6, but it wont work in browsers that do not support it

//Babel can only transpile ES6 syntax like classes, arrow functions, const/let, spread operator, etc

//same is not true for real new features that were added to ES6, like 'find()' and 'Promise', so these new features cannot be transpiled by Babel

//for these new features, we can polyfill them
//Babel used to do polyfilling out of the box, but recently they have started suggesting some other library

////////////////////////polyfilling//////////////////////////

import 'core-js/stable';

//we still se the "find()" and the "Promise" in index.8cfc62b9.js

// polyfilling recreates the "find()" function and makes it available in the bundle  [search for "Array.prototype.find" in index.8cfc62b9.js to know more]

//If we wanted we could cherry pick just the features we want to polyfill, that is a lot of work but it can greatly reduce the bundle size

//like if we wanted to polyfill only the 'find()', we could do-
// import 'core-js/stable/array/find';

//if we wanted to polyfill only the 'Promise', we could do-
// import 'core-js/stable/promise';

//we generally dont do this, but this is a way if we are worried about our bundle size

///////////////polyfilling async functions////////////////

//async functions are not polyfilled by "core-js/stable"

//used for polyfilling async functions
import 'regenerator-runtime/runtime';

//////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////

////////////////Review: Writing Clean and Modern Code////////////////////
//***********************************************************************
//In notes
//***********************************************************************
/////////////////////////////////////////////////////////////////////////

//////////////////////Let's Fix Some Bad Code////////////////////////////
//go to the clean.js file
/////////////////////////////////////////////////////////////////////////
