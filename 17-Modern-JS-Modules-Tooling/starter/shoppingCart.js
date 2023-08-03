////////////////////Expporting and Importion in ES6//////////////////////

import { circle } from 'leaflet';

////////////////////////EXPORTING MODULE////////////////////////////

// console.log('exporting module');

//variables that are declared inside of a module are scoped to this module, inside a module, the module itself is like the top level scope

//all top level variables are private inside this variable, unlike traditional scripts which put all of these variables here in the global scope
const shippingCost = 10;
export const cart = [];

///////////////////////////BLOCKING CODE////////////////////////////

// console.log('Start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finish fetching users');

// //console.log('importing module');//from script.js is printed next

// //code in script.js has to wait for the code in shoppingCart.js to complete fetching

// //the top-level await is not only blocking the execution in this module but also the module that is importing it

////////////////////////////////////////////////////////////////////

////////////////////////////NAMED EXPORT////////////////////////////

//we can export multiple values using named exports

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} was added to the cart`);
};

////////exports always need to happen in top level code//////////

//this way it will not work as export is not in the top level code

// if (true) {
//   export const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} was added to the cart`);
//   };
// }

/////////////////////////////////////////////////////////////////

const totalPrice = 237;
const totalQuantity = 23;

//we can also export multiple values at once using named exports

export { totalPrice, totalQuantity as tq }; // exporting totalQuantity as tq, when we import we import "tq".

////////////////////////////////////////////////////////////////////

/////////////////////////////DEFAULT EXPORTS////////////////////////

//we use default exports when we want to export one thing per module

//we are exporting the value itself and not the variable, when we import it we can give it any name we want
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} was added to the cart`);
}

////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
