'use strict';

const restaurant = {
  //the restaurant object is an object literal as we have written the object literally using the  "{ }" syntax in our code, or the code has been written using the object literal syntax.
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  //function to order food
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]; //returning an array.
  },

  //function that takes object as arguments and destructures the same object.
  orderDelivery: function (
    { starterIndex = 1, mainIndex = 0, time = '20:00', address } //here a single parameter in the form of object is expected, the name of the properties used while calling the function has to be same as the name in the parameters, the order does not matter (object), default values are given so if values not specified while calling the function these values are used ,(as we have not given any default value to address, it will show undefined if not specified while calling).
  ) {
    console.log(
      `Your order has been recieved ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  //function to order pasta (using spread operator)
  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    //rest operator
    console.log(mainIngredient);
    console.log(otherIngredients);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

///////////////////////////////////////Destructuring Arrays/////////////////////////////////////////////////

console.log(' ');

console.log('Destructuring Arrays');

console.log(' ');

///////////////////////////////////////

const arr = [2, 3, 4];

const a = arr[0];
const b = arr[1];
const c = arr[2];

///////////////////////////////destructuring (arrays)//////////////////////

//TO DESTRUCTURE ARRAYS WE USE "[]"

const [x, y, z] = arr; //(destructuring assignment) destructuring the array form the right side.

console.log(x, y, z); //unpacking the values of the array in different variables

console.log(arr); //original array is unaffected, array is not destroyed but destructured.

//////////////////////////////////////////////////////////////////////////

/////////////////////////destructuring the project content///////////////

let [first, second] = restaurant.categories; //takes the first and the second values of the array categories.

console.log(first, second);

const [f, , t] = restaurant.categories; //now stores first and third values of the array categories, second value is skipped by ", ,"

console.log(f, t);

//if we want to switch the first to second

// //without destructuring
// const temp=first;
// first=second;
// second=temp;

//with destructuring

[first, second] = [second, first]; //switching//now we do not use let or const as we are just reassigning the values of the two variables

console.log(first, second); //value of first is in second and value of second is in first

////////////////////////////////////////////////////////////////////////

/////////////destructuring the array with function//////////////////////

console.log(restaurant.order(2, 0)); //Garlic bread, Pizza

const [order1, order2] = restaurant.order(3, 1);
console.log(order1, ',', order2); ////Caprese Salad , Pasta

///////////////////////////////////////////////////////////////////////

////////////////////////Nested Array Destructuring/////////////////////

const nested = [2, 4, [5, 6]];

const [i, j] = nested;
console.log(i, j);

//to get the nested values
const [k, , [l, m]] = nested; //destructuring inside destructuring
console.log(k, l, m);

//////////////////////////////////////////////////////////////////////

// Setting default values to the variables when we are extracting them (helpful in the case when we dont know the length of the array)/////////////////////////////////////////////

const [p, q, r] = [8, 9];
console.log(p, q, r); //r becomes undefined as we have not assigned any value, if is the same as reading value from an index that does not exist.

//we can set default values
const [d = 1, e = 1, g = 1] = [8, 9];
console.log(d, e, g); //g is 1 here

/////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////

//

////////////////////////////////////////Destructuring Objects////////////////////////////////////////

console.log(' ');

console.log('Destructuring Objects');

console.log(' ');

///////////////////////////////////////

//TO DESTRUCTURE OBJECTS WE USE "{}"

const { name, openingHours, categories } = restaurant; //in objects the order of the properties does not matter so we have to provide the variable names exactly same as the property names that we want to retrieve from the object, and also dont need to manually skip elements like in arrays.

console.log(name, openingHours, categories); //find out why name is depreciated .ts(6358), maybe we are in the global scope and are overwriting a variable that already exists in the window object

/////////if we want to name the variables different from their property name///////////

/////also destructuring/////
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

console.log(restaurantName, hours, tags); //same values different variable name

////////////////////////////////////////////////////////////////////////////////////////

//default values (for the case when we are trying to read a property that is not defined)

const { menu = [], starterMenu: starters = [] } = restaurant; //we have given an empty array as default value to both menu and starter menu but since starter menu is already defined it the default value will be overwritten by the value that is in the class restaurant.

console.log(menu, starters); //shows menu as an empty object (default value)

////////////////////////////////////////////////////////////////////////////////////////

/////////////////Mutatuing Variables while destructuring objects////////////////////////

let u = 23;
let v = 9;

const obj = { u: 5, v: 7, z: 14 };
({ u, v } = obj); //get a SyntaxError "{ u, v } = obj", when we start a line with a "{" JS expects a code block and we cannot assign anything to code block "=" so we wrap it with "()".

console.log(u, v); //u=5,v=7

///////////////////////////////////////////////////////////////////////////////////////

/////////////////////Nested Objects (destructuring them)///////////////////////////////

const { fri } = restaurant.openingHours; //we can access objects inside the object restaurant like this
console.log(fri); //we get the object inside fri object.

//destructuring inner object
const {
  fri: { open, close },
} = restaurant.openingHours;
console.log(open, close);
////////////////////////////

// const { location: oc } = location; //we cannot access properties any property of an object like this directly, we need to use the (.) dot
// console.log(oc);

///////////////////calling function by passing an object as the argument///////////////////////////

restaurant.orderDelivery({
  //calling the function by passing an object of options (one argument)
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

///////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////Spread Operator////////////////////////////////////////////

console.log(' ');

console.log('Spread Operator');

console.log(' ');

/////////////////////////////////////

//the spread operator works on all "iterables", like arrays, strings, maps, sets. SINCE ES 2018 SPREAD OPERATORS ALSO WORKS ON OBJECTS EVEN THOUGH OBJECTS ARE NOT ITERABLES.

const ar = [7, 8, 9];

const badNewArr = [1, 2, ar[0], ar[1], ar[2]]; //we add 1 and 2 in the beginning of the array by forming a new array manually.
console.log(badNewArr);

//By using spread operator (...) we can expand all the elements of the array ,unpacking all the array elements at one

const innerArr = [1, 2, ar]; //ar inside innerArr

const newArr = [1, 2, ...ar]; //adding 1 and 2 in the front of ar in the new newArr using spread operator
console.log(newArr); //gives us the array

console.log(...newArr); //gives us the values of the array newArr as 1,2,7,8,9

/////////////////////////////project array manipulation////////////////////////

const newMenu = [...restaurant.mainMenu, 'Gnocci']; //adding gnocci at the end of the array mainMenu in the restaurant object.
console.log(newMenu);

//The Spread Operator is very similar to Destructuring but the difference is that the spread operator takes all the elements from the array and also does not create new variables, so we can only use it in places where we would otherwise write values separated by commas.

////////////////////////////////////////////////////////////////////////////////

//WHAT IS THE DIFFERENCE BETWEEN COPYING AND SHALLOW AND DEEP COPYING (APPLIES ONLY TO REFERENCE TYPE VARIABLES)

///////////////////////////////////////////
const numbers = [1, 2, 3, 4, 5];

const copyNumbers = numbers; //copying

numbers[2] = 6;

console.log(numbers, copyNumbers); //are same
//both the 'numbers' and 'copyNumbers' identifiers point to the same array(object) in the heap, they point to the same address in the callstack which has a reference to a piece of memory in the heap (here the array(object)), change in one therefore reflects in both of them

const shallowCopyNumbers = [...numbers]; //causing a shallow copy

numbers[0] = 10;

console.log(numbers, shallowCopyNumbers); //are different
//the "numbers" and "shallowCopyNumbers" identifiers point to different arrays in the heap, they point to different addresses in the callstack, each has different value (reference to a piece of memory in the heap)

///////////////////////////////////////////

////////////////shallow copying an array/////////////////

const copyArr = [...restaurant.mainMenu]; //creates a shallow copy of the array
console.log(copyArr); //copying the array to copyArr

///////////////////////////////////////////

///////////////join two arrays/////////////

const addArr = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(addArr); //adding two arrays in the addArr

//////////////////////////////////////////

//the spread operator works on all "iterables", like arrays, strings, maps, sets. SINCE ES 2018 SPREAD OPERATORS ALSO WORKS ON OBJECTS EVEN THOUGH OBJECTS ARE NOT ITERABLES.

const str = 'Jonas';

const letters = [...str, ' ', 'S.'];
console.log(letters);
console.log(...str);

//console.log(`${...str} Schmedtmann`);//gives us syntax error as in template literals, inside "${}" multiple values are not expected separated by commas.(Multiple values separated by commas are only expected when we pass arguments in a function of we build a new array).

console.log(str, 'Schmedtmann'); //works fine

////////////spread operator used in argument///////////////////

const ingredients = ['mushrooms', 'cheese', 'sauce'];
restaurant.orderPasta(...ingredients); //spread operator expands the array with commas and makes them arguments for the function.

// const inputIngredients = [
//   prompt("let's make pasta... ingredient 1"),
//   prompt('ingredient 2'),
//   prompt('ingredient 3'),
// ];

// console.log(inputIngredients); //gives us the array of ingredients given by the user

// restaurant.orderPasta(...inputIngredients);

///////////////////////////////////////////////////////////////

//////////////////spread operators on objects (even though objects are not iterables)//////////////////

const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' }; //order of the properties does not matter

//////////////////////copying objects//////////////////////////

const restaurantCopy = { ...restaurant }; //copying the object
restaurantCopy.name = 'Restaurant Roma';

console.log(restaurantCopy.name); //Restaurant Roma

console.log(restaurant.name); //Classico Italiano

///////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////REST PATTERN AND REST PARAMETERS//////////////////////////////////

//Rest does the opposite of spread operator (i.e. to pack elements into an array), has the same syntax as of spread operator

//Spread operator is used on the right side of the assignment operator
const typedNumbers = [1, 2, ...[3, 4]];

//Rest is also ("...") but is on the left side of the assignment operator
const [ab, bc, ...others] = [1, 2, 3, 4, 5]; //others is an array that stores [3,4,5] using Rest

console.log(ab, bc, others); //others show [3,4,5]

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
]; //we are destructuring here and using "..." on the right side of the assignment operator makes it spread operator and using "..." on the left side of the assignment operator makes it  rest operator.

// const [pizza, , risotto, ...otherFood, bread] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];//THE REST ELEMENT MUST BE THE LAST ELEMENT AND FOR THE SAME REASON THERE CAN BE ONLY ONE REST IN ANY DESTRUCTURING ASSIGNMENT.

console.log(pizza, risotto, otherFood); //pizza and risotto as strings leaving the middle element and , here the mainMenu array ends and the starterMenu array starts and the starterMenu array elements are stored in the otherFood as array of elements using rest operator.(does not include skipped element)

////////////////////////////Rest in objects///////////////////////////

const { sat, ...weekdays } = restaurant.openingHours;

console.log(weekdays); //gives friday and thursday as properties in the  new object weekdays.

//////////////////////////////////////////////////////////////////////

//////////////////////////Rest in functions///////////////////////////

const add = function (...numbers) {
  //In line 304 where spread operator is used to spread the elements of array ingredients and passed as arguments of the function orderPasta, here we pass separated "," numbers and the function parameter uses Rest operator to combine the values into elements of array number. ("..." used as parameter is REST OPERATOR ").By this the function can accept both functions and numbers.
  let sum = 0;
  for (let ij = 0; ij < numbers.length; ij++) {
    sum += numbers[ij];
  }
  console.log(numbers);
  console.log(sum);
};
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const xa = [23, 57, 71];

add(...xa); //using spread operator before passing it as argument in the function add.

//SPREAD OPERATOR IS USED AS ARGUMENT, REST OPERATOR IS USED AS A PARAMETER

//////////////////////////////////////////////////////////////////////

////////////////////////Rest in our project///////////////////////////

restaurant.orderPizza('mushroom', 'onion', 'olives', 'spinach'); //mushroom is put as the mainIngredient and all the other ingredients are put in the otherIngredients parameter where ther are made into an array.

restaurant.orderPizza('mushroom'); //mushroom is put in the mainIngredient , and the otherIngredients is an empty array.

//////////////////////////////////////////////////////////////////////

///////////////////////////////////SPREAD AND REST OPERATOR LOOK SIMILAR BUT WE USE THE SPREAD OPERATOR WHERE WE WOULD OTHERWISE WRITE VALUES SEPARATED BY COMMAS AND THE REST OPERATOR IS USED WHERE WE WOULD OTHERWISE WRITE VARIABLE NAMES SEPARATED BY COMMAS./////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////Short Circuiting (&& and ||)///////////////////////////////////////

//There are more uses of the logical operators other than combining boolean values

//We can use any datatype.

//They can return any datatype (not only boolean).

//short-circuit evaluation

//////////////////////////////////OR OPERATOR///////////////////////////////////////

console.log(3 || 'Jonas'); //3 (not boolean).

//FROM OBSERVATION: short-cicuiting in the case of "||" (two operands), if the first value is truthy value (operand) it will immediately return the first value, JS will not evaluate the second value (operand).

console.log('' || 'Jonas'); //Jonas, " " is a falsy value, string is a truthy value.

console.log(true || 0); //true

console.log(undefined || null); //null, undefined is a falsy value, so as the first operand is not a truthy value there is no short-circuiting and the JS goes to the second operand and the returns the second operand irrespective of it being a truthy or falsy value.

console.log(null || undefined); //undefined

console.log(undefined || 0 || ' ' || 'Hello' || null); //Hello, that is because "Hello" is the first truthy value in the chain of operation, short-circuiting takes place, JS stops evaluating the operands after finding the first truthy value.

//CONCLUSION:   IN CASE OF "||", JS FINDS THE FIRST TRUTHY VALUE IN THE CHAIN OF OPERATION, IF IT FINDS THE FIRST TRUTHY VALUE, IRRESPECTIVE OF ITS POSITION IN THE OPERATION (EVEN IF IT IS IN THE LAST POSITION,  "||" OPERATOR WORKS AS EXPECTED RETURNING THE ONLY TRUTHY VALUE i.e. IN THE LAST POSITION { it is a name given to the behaviour of the "||" operator that returns the first truthy value it finds}), THAT VALUE IS RETURNED AND SHORT-CIRCUITING TAKES PLACE, JS STOPS EVALUATING THE OPERATION ANY FURTHER. HOWEVER IF IT CANNOT FIND ANY TRUTHY VALUE IN THE OPERATION, THE LAST OPERAND IS RETURNED .

const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

//can be used in the place of ternery operator or if/else statement.
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

//above code will return 10 if numGuests is 0.

//////////////////////////////////////////////////////////////////////////////////

////////////////////////////AND OPERATOR//////////////////////////////////////////

//works exactly opposite to the OR operator,  IN CASE OF "&&", JS FINDS THE FIRST FALSY VALUE IN THE CHAIN OF OPERATION, IF IT FINDS THE FIRST FALSY VALUE, IRRESPECTIVE OF ITS POSITION IN THE OPERATION (EVEN IF IT IS IN THE LAST POSITION,  "&&" OPERATOR WORKS AS EXPECTED RETURNING THE ONLY FALSY VALUE i.e. IN THE LAST POSITION  { it is a name given to the behaviour of the "&&" operator that returns the first falsy value it finds}) that value is returned and JS does not evaluate the operation any further.HOWEVER IF IT CANNOT FIND ANY FALSY VALUE IN THE OPERATION, THE LAST OPERAND IS RETURNED .

console.log(0 && 'Jonas'); //0

console.log(7 && 'Jonas'); //Jonas

console.log('Hello' && 23 && null && 'Jonas'); //null

if (restaurant.orderPizza) {
  //if orderPizza method exists
  restaurant.orderPizza('mushrooms', 'spinach');
}

//can be used to replace if/else by this
restaurant.orderPizza && restaurant.orderPizza('mushroom', 'spinach'); //if orderPizza method does not exist it will return undefined and if it exists that is it is a truthy value then the second operand will be evaluated.

/////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////NULLISH COALESCING OPERATOR (??)/////////////////////////////////////

// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);

// const guests2 = restaurant.numGuests || 10;
// console.log(guests2);

// //above code will return 10 if numGuests is 0, but we want to assign guest to 0.

//now to solve this problem of guests2 not getting assigned 0 when numGuest is 0 i.e. a falsy value and the expression not getting executed as per our expectations, we have nullish operator that was introduced in ES 2020.

//Nullish operator works like OR operator but considering only nullish values as falsy values, empty strings and 0 s are not falsy values for nullish operator.
//Nullish:null and undefined.
restaurant.numGuests = 0;
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

///////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////for-of loop (ES6)////////////////////////////////////////

//for-of loop to loop over arrays
//for-in loop is old and is of no use

const ourMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];

//for-of loop
for (const item of ourMenu) console.log(item); //item variable is created that stores values from array ourMenu while looping over it, with each iteration by the help for of loop, gives us access to the current element that is stored in the item variable and logged to the console.

//to get the index in for-of loop
for (const item of ourMenu.entries()) console.log(item); //it prints arrays, each array has two elements, the first element is the index , and the second element is the element of the array "ourMenu" corresponding to the index.
//(2) [0, "Focaccia"]
//(2) [1, "Bruschetta"]
//(2) [2, "Garlic Bread"]
//(2) [3, "Caprese Salad"]
//(2) [4, "Pizza"]
//(2) [5, "Pasta"]
//(2) [6, "Risotto"]

console.log(ourMenu.entries()); //array iterator//explained ahead

console.log(...ourMenu.entries()); //using .entries(), all the elements in the array "ourMenu" is now stored into sub-arrays with their respective indices, first element of the sub-arrays being their indices and the second element of the sub-arrays are the elements, all these sub-arrays are then stored as an array.
// > (2) [0, 'Focaccia'] > (2) [1, 'Bruschetta'] > (2) [2, 'Garlic Bread'] > (2) [3, 'Caprese Salad'] > (2) [4, 'Pizza'] > (2) [5, 'Pasta'] > (2) [6, 'Risotto']

for (const item of ourMenu.entries()) console.log(`${item[0] + 1}:${item[1]}`);

console.log(' ');
//with destructuring
for (const [i, el] of ourMenu.entries()) console.log(`${i + 1}:${el}`);

////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////ENHANCED OBJECT LITERAL (ES6)///////////////////////////////////

//ES6 introduced 3 ways which we can write object iterals more easily.

//#3

//We can now compute property names instead of writing them manually and literally.

const weekDays = ['mon', 'tue', 'wed', 'thurs', 'fri', 'sat', 'sun'];

const hoursOpen = {
  openingHours: {
    [weekDays[3]]: {
      //ES6 property names computed
      open: 12,
      close: 22,
    },
    [weekdays[4]]: {
      //ES6 property names computed
      open: 11,
      close: 23,
    },
    [weekdays[`${6 - 1}`]]: {
      //ES6 property names computed
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

//#1

//If we have two objects and we want to make one object a property of the other object, here we want to make the object "hoursOpen" as the property of the object "hotel".

const hotel = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  //before ES6 we would have to add this to have the object "hoursOpen" as a property inside the object "hotel".//
  // hoursOpen: hoursOpen,
  //the confusion creating thing here is that the porperty name is same as the variable name from which we are getting the object.//

  //with ES6 Enhanced Object literals
  hoursOpen, // we take the hoursOpen object and put it as the property, with  name exactly as the variable name, also to make this object "hourOpen" the property of the object "hotel", we have to define it above this object ("hotel"), or else JS will not be able to access openHours before initialization

  //ES6 enhancement
  order(starterIndex, mainIndex) {
    //VS code changes the color of the methods to green
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  //ES6 enhancement
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    //VS code changes the color of the methods to green
    console.log(
      `Your order has been recieved ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  //ES6 enhancement
  orderPasta(ing1, ing2, ing3) {
    //VS code changes the color of the methods to green
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  //ES6 enhancement
  orderPizza(mainIngredient, ...otherIngredients) {
    //VS code changes the color of the methods to green
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

//#2

//In ES6 we no longer have to create a property and then set that to a function expression, in the case of methods (inside an object obviously), done above in the object "hotel".

//#3 (above)

//////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////OPTIONAL CHAINING (?) ES()2020////////////////////////////////

console.log(restaurant.openingHours.mon); //undefined, as there is no property as mon in openingHours inner-object.

//if we did not know if "mon" property exists or not..

//console.log(restaurant.openingHours.mon.open);//error
//in order to avoid this error we would have to first check that if the "mon" property exists

if (restaurant.openingHours.mon) {
  //falsy value
  console.log(restaurant.openingHours.mon.open); //does not print
}

//in this case we are checking for only one property that is monday, but if other porperties are also absent we would have to check for each, hence multiple conditions and multiple if statements in this case we use OPTIONAL CHAINING, if a certain porperty does not exists, then undefined is returned immediately, it avoids errors.

console.log(restaurant.openingHours.mon?.open); //(?)optional chaining operator

//if the porperty before the question mark exists (here, "mon"), then JS will read from there on (here will read "open"), if the property before the question mark does not exists, then  the property after it will not be read and immediately undefined will be returned.
//here by exists we mean the nullish concept where only the nullish values are falsy, like null and undefined.

console.log(restaurant.openingHours.fri?.open); //11

console.log(restaurant.openingHours?.mon?.open); //checks for openingHours property and mon property, whereever it fails to find the property, it stops reading further.

//real world simulation of the OPTIONAL CHAINING (?)

const allDays = ['mon', 'tue', 'wed', 'thurs', 'fri', 'sat', 'sun'];

for (let day of allDays) {
  const open = restaurant.openingHours[day]?.open ?? 'closed'; //whenever we use a variable (here, day) as a property name, we use "[]", to prevent undefined and also missing out on saturday due to "0", we use nullish coalescing operator ("0" is no more falsy).
  console.log(`On ${day}, we open at ${open}`);
}

/////////////////////optional chaining on methods/////////////////////

//to check if a method exists

console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');

console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

//////////////////////////////////////////////////////////////////////

////////////////////optional chaining on arrays///////////////////////

//to check if an array is empty

const users = [
  // {
  //   name: 'Jonas',
  //   email: 'hello@jonas.io',
  // },
];

console.log(users[0]?.name ?? 'User array empty');

//without optional chaining
if (users.length > 0) console.log(users[0].name);
else console.log('user array is empty');

//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////LOOPING OBJECTS/////////////////////////////////////////////

//we can also indirectly loop over objects which are not iterables

//////////////////////////////property NAMES//////////////////////////

//openingHours is the newly created variable (object) that we created in line 156.
const properties = Object.keys(openingHours); //by using Object.keys we convert the properties of the object "openingHours" into elements which are stored in an array.
console.log(properties); //array with the properties of the object openingHours as elements

console.log(`We are open on ${properties.length} days`);

let openStr = `We are open on ${properties.length} days:`;

for (const day of Object.keys(openingHours)) {
  //console.log(day);//thu, fri, sat
  openStr += `${day},`;
}

console.log(openStr);

console.log(' ');

//////////////////////////////////////////////////////////////////////

///////////////////////////property VALUES////////////////////////////

const values = Object.values(openingHours); //by using Object.values we get the values inside the values stored inside the properties of the object "openingHours" in the form of elements whioch are stored in an array.
console.log(values);

//////////////////////////////////////////////////////////////////////

//////////////////////////property keys///////////////////////////////

const entries = Object.entries(openingHours); //by using Object.entries we get the keys and values of the properties of the object openingHours together as an element stored in an array
console.log(entries);

for (const [key, { open, close }] of entries) {
  //can also use  "Object.entries(openingHours)",as objects are not iterables we convert it into iterables by using the method "entries()".
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////SETS (ES 6 DATA STRUCTURES)/////////////////////////////////

//in the past JS had very little built-in data structures, only had objects and arrays, but in ES 6 two more data structures were introduced that are sets and maps.

//SETS are a collection of unique values, cannot have duplicate values.

const orderSet = new Set([
  //we have to pass an iterable, here an array.
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]); //syntax of declating a set
//here the set holds string values, but set can also hold different data types as well as mixed data types.

console.log(orderSet); //Set(3) {"Pasta", "Pizza", "Risotto"}
//only shows 3 values (size of 3) all the duplicate values are removed.

//sets are also iterables just like an array

//SET looks just like an ARRAY but is different form an array as each value in a set is unique and the order of elements in the set is irrelevant, there are no key values in a set, it is just a bunch of values grouped together.

console.log(new Set('Jonas')); //strings are also iterables, Set(5) {"J", "o", "n", "a", "s"}

console.log(new Set()); //a set could also be empty

///////////////////////////size of a set//////////////////////////////
console.log(orderSet.size); //3, it is called size and not length as we only include unique elements in a set

/////////////////////////////////////////////////////////////////////

///////////////////////to check element in set///////////////////////
console.log(orderSet.has('Pizza')); //true

console.log(orderSet.has('Bread')); //false
//.has is similar to "includes" in arrays

/////////////////////////////////////////////////////////////////////

//////////////////////to add elements in a set///////////////////////
orderSet.add('Garlic Bread');

orderSet.add('Garlic Bread');

console.log(orderSet); //adds "Garlic Bread" only once

/////////////////////////////////////////////////////////////////////

/////////////////////delete element from a set///////////////////////

orderSet.delete('Garlic Bread');

console.log(orderSet);

/////////////////////////////////////////////////////////////////////

/////////////////retrieve values out of a set////////////////////////

console.log(orderSet[0]); //gives undefined, as sets do not have indices

//We cannot retrieve values out of a set as there are no indices in a set, there is no way to get values out of a set, as all values are unique and their order does not matter, there is no need to get values out of the set, all we need to know if a certian value present in a set or not.

/////////////////////////////////////////////////////////////////////

//////////////////////////////clear a set////////////////////////////

//orderSet.clear(); //removes all the values inside the set and returns an empty set

console.log(orderSet);

/////////////////////////////////////////////////////////////////////

//////////////////////looping in sets////////////////////////////////

//as sets are also iterables, looping over sets is possible

for (const order of orderSet) {
  console.log(order);
}

/////////////////////////////////////////////////////////////////////

////////////////////////usecase of SETS//////////////////////////////

const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];

const staffUnique = new Set(staff); //conversion from an array to set to remove duplicate values

console.log(staffUnique); //Set(3) {"Waiter", "Chef", "Manager"}

//conversion from a set to an array is easy as both of them are iterables

const arrayUnique = [...new Set(staff)]; //conversion of a set to an  array, spread operator also works on sets as it is also iterable

console.log(arrayUnique); //(3) ["Waiter", "Chef", "Manager"]

/////////////////////////////////////////////////////////////////////

//////////////to know the number of unique positions/////////////////

console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
); //without creating new variable to store the set

console.log(staffUnique.size); //with the set stored in a variable in the memory

//counting letters in a string
console.log(new Set('Abir').size); //4  //string is also iterable, we through this can count the number of different alphabets in my name

//We use sets only when we to work with unique values, we use arrays when we need to store data in an order and the duplicates are important and also when we might need to manipulate data, also arrays have access to a lot of array methods.

console.log(new Set('AbirA').size); //4

console.log(new Set('Abira').size); //5

console.log(new Set(['Abir']).size); //1 (array with a single element)

/////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////MAPS: FUNDAMENTALS///////////////////////////////////////////

//Maps are a lot more useful than sets

//In JS map is a data structure in which we map values in keys, the data is stored in maps in the form of key value pairs, just like in objects but the difference is that in maps the keys can have any type (unlike in objects where the keys are always strings), like arrays, objects and even other maps.

const rest = new Map(); //syntax of creating an empty map

//////////////////////////adding data to the map////////////////////////////

rest.set('name', 'Classico Italiano'); //using the "set" method, we add data to the data structure, the fisrt argument is the key and the second argument is the value.

console.log(rest.set(1, 'Firenze,Italy')); //calling the "set" method does not only add key value pair but also return the updated map

rest.set(2, 'Lisbon,Portugal');

//so because of the property of the "set" method to return the updated map, we can also chain the "set" method

rest
  .set('categories', ['Italian', 'Pizeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are closed'); //chaining using the set method

console.log(rest);

////////////////////////////////////////////////////////////////////////////

//In order to read data from the map we use the "get" method, which is available on all the maps, we just need to pass the key to get the value assigned to it.

console.log(rest.get('name'));

console.log(rest.get(true)); //"We are open"  //the data type of the key matters, "true" will give undefined as "true" is string, here true is boolean

const time = 21;

console.log(rest.get(time > rest.get('open') && time < rest.get('close'))); //(time>rest.get('open') && time<rest.get('close')) returns true or false, and based on that returned boolean value we can get what is in the map that has that boolean value as the key, and return its value.//[11-23) open, [23-11) closed

////////////to check if a key exists in the map//////////////////////////

console.log(rest.has('categories'));

/////////////////////////////////////////////////////////////////////////

/////to delete elements from the map, that happens based on the key//////

rest.delete(2); // here 2 is the key for Lisbon, Portugal which gets removed

console.log(rest);

/////////////////////////////////////////////////////////////////////////

////////////////////////size property in maps////////////////////////////

console.log(rest.size);

/////////////////////////////////////////////////////////////////////////

/////////to remove all the elements from the map (clear the map)/////////

rest.clear();

/////////////////////////////////////////////////////////////////////////

//there is some overlap as we work with maps and sets as they were introduced together in ES6

///////////////////////////ARRAY AS A KEY//////////////////////////

rest.set([1, 2], 'Test'); //array as a key

console.log(rest);

console.log(rest.size);

//Retreving the value of a map key that is an array

console.log(rest.get([1, 2])); //will not retrieve "Test", will return undefined, THIS IS SO AS THIS ARRAY AND THE ARRAY AS THE KEY ARE NOT THE SAME OBJECT EVEN THOUGH THEY HAVE THE SAME ELEMENTS, THEY ARE NOT THE SAME OBJECT IN THE HEAP, TO MAKE IT WORK WE WOULD HAVE TO CREATE A VARIABLE TO STORE THE ARRAY AND USE THE VARIABLE AS THE KEY AND USE THE SAME VARIABLE (array) TO GET THE VALUES STORED WITH THAT ARRRAY AS KEY.

const arrKey = [1, 2];

rest.set(arrKey, 'Test');

console.log(rest);

console.log(rest.size);

console.log(rest.get(arrKey)); //returns "Test", as arr here and the arr used while giving the key in the method "set", refers to the same place in the memory

//This proves that objects can be used as map keys, which can be very useful with DOM elements, which are a special type of object

rest.set(document.querySelector('h1'), 'Heading'); //<h1>Data Structures and Modern Operators</h1>

console.log(rest);

//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////MAPS:ITERATION////////////////////////////////////////////

//we can populate the map without using the "set" method as sometimes it can be cumbersome

const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct answer'],
  [false, 'Try again!'],
]); //we are going to pass an array having multiple arrays where the first position in those sub-arrays will be the key and the second position will the the value

//has the same array structure from calling Object.entries(objectName), so this means there is an easy way for converting objects into maps

console.log(question);

console.log(Object.entries(openingHours)); //array having multiple arrays as element, where in each array element, the first element is the key and the second element is the value

/////////////////Converting Objects to Maps///////////////////

const hoursMap = new Map(Object.entries(openingHours));

console.log(hoursMap);

//////////////////////////////////////////////////////////////

/////////////////////Iteration in Maps////////////////////////

//Maps are also iterables and so, iteration is also possible in them

console.log(question.get('question'));

for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`${key}:${value}`);
  }
}

//remove comment to make this piece of code work
//const answer = Number(prompt('Your Answer'));
//console.log(answer);

//console.log(question.get(answer === question.get('correct')));

//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////

/////////////////Converting Map to and Array//////////////////

console.log([...question]); //returning an array of arrays, which was returned on using Object.entries();

//////////////////////////////////////////////////////////////

/////////Retrieving both keys and values in a Map/////////////

console.log(question.entries()); //MapIterator {"question" => "What is the best programming language in the world?", 1 => "C", 2 => "Java", 3 => "JavaScript", "correct" => 3, …}

//JavaScript Map. entries() method is used for returning an iterator object which contains all the [key, value] pairs of each element of the map. It returns the [key, value] pairs of all the elements of a map in the order of their insertion.

console.log([...question.entries()]); //(7) [Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2)]

//////////////////////////////////////////////////////////////

////////////////Retrieving the keys in a Map//////////////////

console.log(question.keys()); //MapIterator {"question", 1, 2, 3, "correct", …}

console.log([...question.keys()]); //(7) ["question", 1, 2, 3, "correct", true, false]

//////////////////////////////////////////////////////////////

////////////////Retrieving the values in a Map////////////////

console.log(question.values()); //MapIterator {"What is the best programming language in the world?", "C", "Java", "JavaScript", 3, …}

console.log([...question.values()]); //(7) ["What is the best programming language in the world?", "C", "Java", "JavaScript", 3, "Correct answer", "Try again!"]

//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////

//****************************************************************************************
///////////////////WHICH DATA STRUCTURE TO USE (IN NOTEBOOK)//////////////////////////////
//****************************************************************************************

///////////////////////////////////STRINGS PART-1/////////////////////////////////////////

const airline = 'TAP Air Portugal';

const plane = 'A320';

console.log(plane[0]); //A
console.log(plane[1]); //3
console.log(plane[2]); //2

console.log('B737'[0]); //B  //this also works

//////////////////////length of a string/////////////////////

console.log(airline.length); //16, counts the spaces
console.log('B737'.length); //4

/////////////////////////////////////////////////////////////

//////////////////strings also have methods//////////////////

//****************************************************************** */
//Strings are just primitives, methods should only be avaliable for object such as arrays, however JS is really smart and so whenever we call a method on a string, JS behind the scenes converts that string primitive to a string object with the same content, and then on that object the methods are called. It takes that string and puts it into a box which is the object, and this process is called BOXING.
//****************************************************************** */

/////////////////////////indexOf()///////////////////////////

console.log(airline.indexOf('r')); //6   //Stings are also 0 based (CASE SENSITIVE)

console.log(airline.lastIndexOf('r')); //10 //last occurence of the alphabet "r" in the string.

console.log(airline.indexOf(' ')); //4

console.log(airline.lastIndexOf(' ')); //7

console.log(airline.indexOf('Portugal')); //8 //where the word portugal starts (case sensitive).

/////////////////////////////////////////////////////////////

////////////////////////slice method/////////////////////////

//slice(x,y);//where x is the index at which the string will be sliced from the front,the starting value, and y is the index where the string will be sliced to, the end value.The method will also work without the end value where the substring retuned after slicing will be from x till the end of the original string.

console.log(airline.slice(4)); //"Air Portugal" (sub string), this does not change the underline string.

//It is impossible to mutate strings, as they are primitive string, if we have to use the sliced string , we will have to store it in some data structure.

console.log(airline.slice(4, 7)); //Air

//Extracting the first word
console.log(airline.slice(0, airline.indexOf(' '))); //TAP

//Extracting the last word
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); //Portugal

//Slicing from the end
console.log(airline.slice(-2)); //al, slices from the end
console.log(airline.slice(1, -1)); //AP Air Portuga    //the second paratemer is the ending index of the slicing method, here we have a negative value which means it cuts from the back.

//writing a function to check if the seat is a middle seat, considering that each row has 6 seats, 3 on each side.
const checkMiddleSeat = function (seat) {
  const s = seat.slice(-1);
  if (s == 'B' || s == 'E') {
    console.log(`${seat} is a middle seat`);
  }
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

/////////////////////////////////////////////////////////////

//***********************************************************
////////////////////BOXING of strings////////////////////////

console.log(new String('jonas')); //JS calls this string function, makes it into an object, happens behind the scenes whenever a method is called on the string.

console.log(typeof new String('jonas')); //object

console.log(typeof new String('jonas').slice(1)); //string  //when the operation is done the object is converted into regular string primitive.

/////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////STRINGS PART-2/////////////////////////////////////////

////////////////////changing the case of a string//////////////////////////

console.log(airline.toUpperCase()); //does not require any arguments

console.log(airline.toLowerCase()); //does not require any arguments

/////////////////////////Fix Capitalisation in name////////////////////////

const passenger = 'jOnas'; //We need Jonas

const passengerLower = passenger.toLowerCase();

const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);

console.log(passengerCorrect);

//same problem but solving through functions

const passengerC = function (name) {
  const passengerTemp = name.toLowerCase();
  console.log(passengerTemp[0].toUpperCase() + passengerTemp.slice(1));
};

passengerC('aBiR');

///////////////////////////////////////////////////////////////////////////

/////////////////////Check Email (comparing emails)////////////////////////

const email = 'hello@jonas.io'; //the actual email
const lEmail = '  Hello@Jonas.Io \n'; //"\n" is enter, which also coiunts as a white space //the email that is entered by the user while login, which is also valid

const normalisedEmail = lEmail.toLowerCase().trim(); //login email first made into lower case then trimmed removing the white space in the beginning and the enter at the last

//in ES6 there is also trimStart(), used to trim whitespaces from the beginning and trimEnd(), used to trim whitespaces from the end

console.log(normalisedEmail);

console.log(email == normalisedEmail); //true

///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////

//////////////////////////////////replacing////////////////////////////////

const priceGB = '@288,97'; //we want to change this price of euros to dollars of the US and also the "," separator to "." as the separator.

const priceUS = priceGB.replace('@', '$').replace(',', '.'); //replace(x,y), method has two arguments, x is the element to be removed and y is the element that is to be added in the place of x, since using this method returns a string, we can also chain this method, replace method is also case sensitive.

console.log(priceUS);

//replace() can also be used to replace not only alphabets of single elements but words as well.

const announcement =
  'All passengers come to the boarding door 23, Boarding door 23';

console.log(announcement.replace('door', 'gate')); //replaces the first "door" to "gate".

console.log(announcement);

//replaceAll() method can also be used in the future to replace all the matching string values to the given values
//console.log(announcement.replaceAll()('door', 'gate'));

//to change all the "door" to "gate", we can use regular expressions

/////////////////////////////regular expressions///////////////////////////

console.log(announcement.replace(/door/g, 'gate')); //"g" stands for global, changes all the occurences of the word "door" to "gate".

///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////

////////////////////Boolean returning string methods//////////////////////

//includes()

const planes = 'A320neo';

console.log(planes.includes('A320')); //true

console.log(planes.includes('o')); //true

//////////////

//startsWith()

console.log(planes.startsWith('A320')); //true

console.log(planes.startsWith('A')); //true

//////////////

//endsWith()

console.log(planes.endsWith('neo')); //true

console.log(planes.endsWith('n')); //false

console.log(planes.endsWith('o')); //true

//////////////

///////////////////////////////////////////////////////////////////////////

///////////////////////////practice evercise///////////////////////////////

//to check if the baggage of a certain passenger is allowed  on the plane

const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('Your baggage is not allowed on the plane');
  } else {
    console.log('Your baggage is checked and is alowed in the plane');
  }
};

checkBaggage('I have a laptop, some food and a pocket Knife');

checkBaggage('socks and camera');

checkBaggage('Got some snacks and a gun for protection');

///////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////STRINGS PART-3/////////////////////////////////////////

/////////////////////split(x) method////////////////////////

//here x is the divider string that will be identified in the string that is to be split up and then will be split up at parts where it finds the x.

console.log('a+very+nice+string'.split('+')); //returns an ARRAY of elements consisting of words which are separated by "+".

/////////////////////////working with names/////////////////

const [firstName, lastName] = 'Abir Sikdar'.split(' ');

///////////////////////join(x) method///////////////////////

//here x is used to join different strings together.
const newName = ['Mr.', firstName, lastName].join(' ');

console.log(newName);

//my solution
// const capitalizeName = function (name) {
//   let name2;
//   name2 = name[0].toUpperCase() + name.slice(1);
//   let nameFinal;
//   nameFinal = name2;
//   for (let i = 1; i < name2.length; i++) {
//     if (name2[i - 1] == ' ') {
//       nameFinal = [
//         nameFinal.slice(0, i) + name2[i].toUpperCase() + name2.slice(i + 1),
//       ].join(' ');
//     }
//   }
//   console.log(nameFinal);
// };

//solution using replace()
// const capitalizeName = function (name) {
//   const names = name.split(' ');
//   const namesUpper = [];
//   for (const n of names) {
//     namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
//   }
//   console.log(namesUpper.join(' '));
// };

//solution in video
const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = []; //empty array
  for (const n of names) {
    namesUpper.push(n[0].toUpperCase() + n.slice(1));
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('jonas schedtmann');

/////////////////////////Padding/////////////////////////////

//padding a string means adding a number of characters to the string until the string has the desired length

const message = 'Go to gate 23!';

/////////////////////////////////////////////////////////////
//padStart(x,"y"), adds (x-length of the string) amount of "y" characters in the front of the string, without giving the "y" argument to the method, we will add (x-length of the string) amount of whitespaces.
console.log(message.padStart(25, '+'));

console.log('Abir'.padStart(23, '@ '));

/////////////////////////////////////////////////////////////
//padEnd(x,"y"), adds (x-length of the string) amount of "y" characters at the end of the string, without giving the "y" argument to the method, we will add (x-length of the string) amount of whitespaces.

console.log(message.padEnd(35, '+'));

////////////////////////////combination//////////////////////
console.log(message.padStart(25, '@').padEnd(35, '+')); //11 "+" before the string and 10 "+" after the string,total length of the string is 35, 35-25 places are filled after the string.

console.log(message.padEnd(35, '+').padStart(25, '@')); //Go to gate 23!+++++++++++++++++++++, as the length has already exceeded 25, no more padding in the front.

///////////////Masking Credit Card Function//////////////////

const maskCreditCard = function (number) {
  const str = number + ' '; //whenever we add string to a number the resultant is a string
  //const str = String(number);
  const padded = str.slice(str.length - 2); //leaves last two digits, or use .slice(-2)
  console.log(padded.padStart(str.length, 'X'));
};

maskCreditCard(5126522025257597);

/////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////

/////////////////////////Repeat//////////////////////////////

//repeat(x), repeats the string x times

const message2 = 'Bad weather... All departures Delayed... ';

console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'__/'.repeat(n)}`);
};

planesInLine(5);
planesInLine(3);
planesInLine(12);

//////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////String Exercise//////////////////////////////////////

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

//OUTPUT
//  #Delayed Departure from FAO to TXL (11h25)
//             Arrival from BRU to FAO (11h45)
//    #Delayed Arrival from HEL to FAO (12h05)
//           Departure from FAO to LIS (12h30)

const flightInfo = flights.split('+');
//console.log(flight);

for (const partInfo of flightInfo) {
  //use destructuring for storing 4 values in 4 different variables, clean less complicated code
  const part = partInfo.split(';');
  //console.log(part);
  const output = `${!part[0].includes('Delayed') || '#'}${part[0] //part[0].startsWith("_Delayed")?"#":""
    .replaceAll('_', ' ')
    .trim()} from ${part[1].slice(0, 3).toUpperCase()} to ${part[2]
    .slice(0, 3)
    .toUpperCase()} (${part[3].replace(':', 'h')})`.padStart(42, ' ');
  console.log(output);
}

//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////LOGICAL ASSIGNMENT OPERATOR ES 2021///////////////////

//3 new so-called logical assignment operator introduced in ES 2021

//restaurant objects

const rest1 = {
  name: 'Capri',
  numGuests: 20,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

//lets pretend that we got these restaurant objects from an API, and now we want to apply something in all of them
//what we want to do is to set a default number of guests for all the restaurant objects that do not have this property

//lets start by using the tool we already know about

// rest1.numGuests = rest1.numGuests || 10; //this works because of short-circuiting, if the (first) value "rest1.numGuests" is truthy it is returned and the next value is not event evaluated, but if the "rest1.numGuests" is falsy, the next (last) value "10" is returned, so rest1.numGuest remains the same

// rest2.numGuests = rest2.numGuests || 10;//rest2.numGuests is given the value 10, as the "rest2.numGuests" is falsy so the second value (last value) is returned that is "10"

// console.log(rest1); //numGuests is same
// console.log(rest2); //numGuests=10 (as it did not have numGuests)

//////////////Logical "OR" Assignment Operator///////////////////////

rest1.numGuests ||= 10; // same as "rest1.numGuests = rest1.numGuests || 10"

rest2.numGuests ||= 10; //same as "rest2.numGuests = rest2.numGuests || 10"

//there is one problem, if the numGuest property is 0 in an object, the value is changed to 10, this happens because 0 is a falsy value, and so the OR assignment operator assigns 10

console.log(rest1); //numGuests is same
console.log(rest2); //numGuests=10 (as it did not have numGuests)

///////////////////////////////////////////////////////////////

////////////////////Logical "NULLISH" Operator///////////////////

rest1.numGuests ??= 10;

rest2.numGuests ??= 10;

//here we do not have the problem when numGuest is 0 [nullish means null or undefined]

console.log(rest1); //numGuests is same
console.log(rest2); //numGuests=10 (as it did not have numGuests)

///////////////////////////////////////////////////////////////

//here we want to anonymise the names of the restaurant owners, if there is the name of the owner in the object, we want to replace the string with "anonymous"

// rest1.owner = rest1.owner && '<ANONYMOUS>'; //in this case rest1.owner is falsy as there is no such property, so undefined is returned

// console.log(rest1); //rest1.owner:undefined

// rest2.owner = rest2.owner && '<ANONYMOUS>'; //this works because of short circuiting, if short-circuits at the first value it finds falsy, and then immediately returns that falsy value, in this case the first value is truthy and there are ony two value, so the last value is returned that is "<ANONYMOUS>"

// console.log(rest2); //rest2.owner:<ANONYMOUS>

//////////////////Logical "AND" Assignment Operator////////////

//the result is better in this case, as the Logical "AND" Assignment Operator, assigns a value to a variable if it is currently / already truthy

rest1.owner &&= '<ANONYMOUS>'; // same as "rest1.owner = rest1.owner && '<ANONYMOUS>'", as rest.owner is falsy already, it is not assigned anything

rest2.owner &&= '<ANONYMOUS>'; //same as "rest2.owner = rest2.owner && '<ANONYMOUS>'"

console.log(rest1); //rest1.owner is not present in the object
console.log(rest2); //rest2.owner:<ANONYMOUS>

/////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////
