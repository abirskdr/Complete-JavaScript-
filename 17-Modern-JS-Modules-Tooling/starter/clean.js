////////////////////////////////Starter Code/////////////////////////////

// var budget = [
//   { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
//   { value: -45, description: 'Groceries 🥑', user: 'jonas' },
//   { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
//   { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
//   { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
//   { value: -20, description: 'Candy 🍭', user: 'matilda' },
//   { value: -125, description: 'Toys 🚂', user: 'matilda' },
//   { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
// ];

// var limits = {
//   jonas: 1500,
//   matilda: 100,
// };

// var add = function (value, description, user) {
//   if (!user) user = 'jonas';
//   user = user.toLowerCase();

//   var lim;
//   if (limits[user]) {
//     lim = limits[user];
//   } else {
//     lim = 0;
//   }

//   if (value <= lim) {
//     budget.push({ value: -value, description: description, user: user });
//   }
// };
// add(10, 'Pizza 🍕');
// add(100, 'Going to movies 🍿', 'Matilda');
// add(200, 'Stuff', 'Jay');
// console.log(budget);

// var check = function () {
//   for (var el of budget) {
//     var lim;
//     if (limits[el.user]) {
//       lim = limits[el.user];
//     } else {
//       lim = 0;
//     }

//     if (el.value < -lim) {
//       el.flag = 'limit';
//     }
//   }
// };
// check();

// console.log(budget);

// var bigExpenses = function (limit) {
//   var output = '';
//   for (var el of budget) {
//     if (el.value <= -limit) {
//       output += el.description.slice(-2) + ' / '; // Emojis are 2 chars
//     }
//   }
//   output = output.slice(0, -2); // Remove last '/ '
//   console.log(output);
// };

/////////////////////////////////////////////////////////////////////////

/////////////////////Let's fix some bad code: Part 1/////////////////////

// const budget = [
//   { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
//   { value: -45, description: 'Groceries 🥑', user: 'jonas' },
//   { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
//   { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
//   { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
//   { value: -20, description: 'Candy 🍭', user: 'matilda' },
//   { value: -125, description: 'Toys 🚂', user: 'matilda' },
//   { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
// ];

// const spendingLimits = {
//   jonas: 1500,
//   matilda: 100,
// };

// //********************************************************************
// const getLimit = user => spendingLimits?.[user] ?? 0;

// //better function name
// //using native language features (default parameter)
// const addExpense = function (value, description, user = 'jonas') {
//   user = user.toLowerCase();

//   ////////////////////////////////////////////////////////////////////
//   //   let lim;
//   //   if (spendingLimits[user]) {
//   //     lim = spendingLimits[user];
//   //   } else {
//   //     lim = 0;
//   //   }

//   //using ternary operator
//   //   const limit = spendingLimits[user] ? spendingLimits[user] : 0;

//   //using optional chaining and nullish coalescing operator
//   //   const limit = spendingLimits?.[user] ?? 0;

//   //making a function for it
//   // const getLimit = user => spendingLimits?.[user] ?? 0; //transferred outside the function

//   //making the code DRY
//   //   const limit = getLimit(user);
//   //optimised in the next line, in the if statement

//   ////////////////////////////////////////////////////////////////////

//   //   optimising code
//   if (value <= getLimit(user)) {
//     budget.push({ value: -value, description, user });
//   }
// };
// addExpense(10, 'Pizza 🍕');
// addExpense(100, 'Going to movies 🍿', 'Matilda');
// addExpense(200, 'Stuff', 'Jay');

// const checkExpenses = function () {
//   for (const entry of budget) {
//     // let lim;
//     // if (spendingLimits[entry.user]) {
//     //   lim = spendingLimits[entry.user];
//     // } else {
//     //   lim = 0;
//     // }

//     // const limit = spendingLimits?.[entry.user] ?? 0;

//     //making the code DRY
//     if (entry.value < -getLimit(entry.user)) {
//       entry.flag = 'limit';
//     }
//   }
// };
// checkExpenses();

// const logBigExpenses = function (bigLimit) {
//   let output = '';
//   for (const entry of budget) {
//     output +=
//       entry.value <= -bigLimit ? `${entry.description.slice(-2)} /` : '';
//   }
//   output = output.slice(0, -2); // Remove last '/ '
//   console.log(output);
// };

// console.log(budget);

// logBigExpenses(500);

/////////////////////////////////////////////////////////////////////////

//////////////////Let's fix some bad code: Part 2////////////////////////

('use strict');

//Object.freeze(), makes the object/array(which is basically an object) immutable, we pass the object as argument

//Object.freeze(), only freezes the first level of the object, is not a so-called 'deep freeze', we can still change objects inside of the immutable object, but not add new objects/ properties/ methods, to the immutable object.

//////////////immutable/////////////
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);
// budget[0].value = 1000; //this is reflected, we can change the object inside of the immutable object [There are third party libraries that can implement a deep freeze]

// budget[9] = 'jonas'; //not possible

////////////////////////////////////

/////////////immutable//////////////
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
// spendingLimits.jay = 200;
// console.log(spendingLimits);//Uncaught TypeError: Cannot add property jay, object is not extensible

////////////////////////////////////

////////////////////////////////////

const getLimit = (limits, user) => limits?.[user] ?? 0; //function no longer depends on any external variable, it can do its work without having to look in the scope chain

////////////////////////////////////

////////////////////////////////////

/////////////old////////////

// const addExpense = function (value, description, user = 'jonas') {
//   user = user.toLowerCase();
//   if (value <= getLimit(user)) {
//     budget.push({ value: -value, description, user }); //we are mutating the outside object, so this function has a 'side-effect', this makes it an 'impure function'
//   }
// };

////////////new/////////////

//pure function now
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  //new variable to avoid data mutations
  const cleanUser = user.toLowerCase();
  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state; //we return the state to avoid returning 'undefined' if the conditions are not fulfilled
};
//in real world we would use 'composing' and technique called 'currying' to create this chain of operations
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
// console.log(newBudget3);

////////////////////////////////////

////////////////////////////////////

//////impure function///////
// const checkExpenses = function () {
//   for (const entry of budget) {
//     if (entry.value < -getLimit(entry.user)) {
//       entry.flag = 'limit'; //we violate the principle of immutability
//     }
//   }
// };

// const checkExpenses = function (state, limits) {
/////////////old/////////////

// for (const entry of state) {
//   if (entry.value < -getLimit(limits, entry.user)) {
//     entry.flag = 'limit';
//   }
// }

////////////new//////////////

//map method returns a brand new array
//   return state.map(entry => {
//     return entry.value < -getLimit(limits, entry.user)
//       ? { ...entry, flag: 'limit' }
//       : entry;
//   });
// };
// const finalBudget = checkExpenses(newBudget3, spendingLimits);
// console.log(finalBudget);

///////////new arrow function for 'checkExpenses'/////////////
const checkExpenses = (state, limits) =>
  state.map(entry =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry
  );

const finalBudget = checkExpenses(newBudget3, spendingLimits);
// console.log(finalBudget);

////////////////////////////////////////////////////////////

////////////////////////////////////

////////////////////////////////////////////////////////////

const logBigExpenses = function (state, bigLimit) {
  ///////////////////old///////////////////////
  // let output = ''; //constant mutation of this variable (not )
  // for (const entry of budget) {
  //   output +=
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)} /` : '';
  // }
  // output = output.slice(0, -2);
  // console.log(output);

  ///////////////////new///////////////////////
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');

  console.log(bigExpenses);
};

logBigExpenses(finalBudget, 500);

/////////////////////////////////////////////////////////////////////////
