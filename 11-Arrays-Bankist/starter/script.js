'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data

//4 Accounts, one object for each account, we will pretend that all this data is coming from a web API, whenever we get data from an API it usually comes in form of obejcts, so we do not use any other data structure, like maps

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

//an array containing all the account objects. (this is the most common way of organising data in JS applications.)
const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////our code/////////////////////////

///////////////////////////Displaying the movements///////////////////////////////

//we add s second parameter called sort and by default we will set it to sort, and now depending on the parameter whether it is true or false we will then order our movements or not
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  //innerHTML is same as textContent, the only difference is textContent returns only the text whereas innerHTML returns everthing including the html

  const desiredOrder = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;

  //here we need to make a copy of the movements array as sort method mutates the actual array, here we use the slice method and not the spread operator as it is inside a chain

  desiredOrder.forEach(function (mov, i) {
    //we need the info whether it is deposit of withdrawl
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    }${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
      `;
    //The insertAdjacentHTML() method of the Element interface parses the specified text as HTML or XML and inserts the resulting nodes into the DOM tree at a specified position.

    //position strings as thee first argument

    //   <!-- beforebegin -->  (outside)
    // <p>  (here containerMovements)
    //   <!-- afterbegin -->
    //   *******things inside*******
    //   <!-- beforeend -->
    // </p>
    //   <!-- afterend -->     (outside)

    //insertAdjacentHTML takes two arguments first is the position in which we want to attach the html (options given above) and second is the string containing the html that we want to insert in the DOM.
    containerMovements.insertAdjacentHTML('afterbegin', html);

    //containerMovements.insertAdjacentHTML('beforeend', html); //order is inverted, every new element is added at the end the previous element  (each new element will be added after the previous one)

    //we see that we still have the old ones, this is because we are not overwriting, we are adding. so we first empty the container then start adding elements done by(containerMovements.innerHTML = '';)
  });
};

//displayMovement(account1.movements);

// console.log(containerMovements.innerHTML);

//////////////////////////using the reduce method to calculate the balance value/////////////

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  //creating a new property called balance and storing the balance in the account object

  //can also do
  // acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  //when we refresh the page, the balance property is removed, it is added only when we login

  labelBalance.textContent = `${acc.balance} €`;
};

//calcDisplayBalance(account1.movements);

/////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////CLACULATING IN OUT AND INTEREST//////////////////////

const calcDisplaySummary = function (acc) {
  //here inside the function it acc is pointing to the original object in the heap memory, when we pass the original object to the function or a variable which already points to the original object, acc also becomes a variable that points to the original object
  const incomes = acc.movements //so changes made to it like creating a new property in the object reflects in the original object
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  //interest each time we get do deposit
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      //console.log(arr);
      return int >= 1;
    })
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest}€`;
};

//calcDisplaySummary(account1.movements);

//we should not overuse chainings as it can cause performance issues if we are dealing with huge arrays, we should use chainings only to optimize the code

//it is also a bad practiice to chain methods that mutate the underlying array (eg-splice,reverse)

////////////////////////////////////////////////////////////////////////////////

//////////////////////practical use of the map method/////////////////////

///////////////////////creating initials///////////////////////////

console.log('********CREATING USERNAME*************');

// const user = 'Steven Thomas Williams'; //stw

// // const username = user.toLowerCase().split(' '); //split by spaces
// // console.log(username);

// const username = user
//   .toLowerCase()
//   .split(' ')
//   .map(name => name[0]) //this arrow function is actively returning like: name=> RETURN name[0]; but we dont see it, we dont habe return in the syntax

//   .join(''); //we call the map method on the splitted user and then join the array returned and save it in username, this gives us username

// console.log(username);

// //we use the above technique to create usernames of any name

// // const createUserName = function (user) {
// //   const username = user
// //     .toLowerCase()
// //     .split(' ')
// //     .map(name => name[0])
// //     .join('');
// //   return username; //returns to function createUserName
// // };
// // console.log(createUserName('Abir Sikdar'));

// //using  the forEach and map together to create usernames for an array of names

const createUserNames = function (acc) {
  //we pass the array of objects to the function
  acc.forEach(function (acc) {
    //we use forEach loop to trasverse over the account objects (which are elements in the array that we passed)
    acc.username = acc.owner //creating a new property as username in the account object
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserNames(accounts); //we give the array of objects

// console.log(accounts);

//////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////

///////////////////////////UPDATING THE UI///////////////////////////////////////////

//updates the UI, updates the movements, balance and the summary

const updateUI = function (acc) {
  //DISPLAY MOVEMENTS
  displayMovements(acc.movements);

  //DISPLAY BALANCE
  calcDisplayBalance(acc);

  //DISPLAY SUMMARY
  calcDisplaySummary(acc);
};

/////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////IMPLEMENTING THE LOGIN FEATURE///////////////////////

//Eventhandlers

// btnLogin.addEventListener('click', function () {
//   console.log('Login');
// });

//when we click the enter or the ("->") button on the page, the page reloads this is beacuse it is a button in the form element,it is the default behaviour of html to relaod the page when we click the submit button (when the submit button is in the form)

let currentAccount; //declared outside as it can be used by other functions as well

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); //prevents form from submitting

  //another thing about form is that when we are in one of the fields and then click enter button, it is same as clicking the submit button,  it triggers a click event (see the console while in one of the fields and clicking enter)

  // console.log('Login');

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount); //returns the account object where the username is same as the value in the inputLoginUsername, if it cannot find any account object for the given username, currentAccount will be undefined

  //********************************************************************* */
  //currentAccount is not a copy of the object, it is simply another variable that points to the original object in the memory heap, so any changes made to the object made through it will reflect in the main object

  //gives error :"Cannot read properties of undefined", when the username is not found
  // if (currentAccount.pin === Number(inputLoginPin)) {
  //   console.log('LOGIN');
  // }

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //we use optional chaining that reads the pin of the account object only if it exists and is not undefined

    //DISPLAY UI AND WELCOME MESSAGE
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`; //shows welcome back, firstname
    containerApp.style.opacity = 100; //makes the page visible

    //clearing the input fields
    inputLoginUsername.value = inputLoginPin.value = ''; //clearing the imput fields after login is successful

    inputLoginPin.blur(); //this field looses its focus,(when we login, and clear the fields, the cursor is still in the pin field, blur method removes that cursor focus)

    //UPDATING THE UI
    updateUI(currentAccount);

    console.log('LOGIN SUCCESSFULL');
  }
});

////////////////////////////////////////////////////////////////////////////////////

////////////////////////////IMPLEMENTING TRANSFERS///////////////////////////////////

// console.log(currentAccount);

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); //to prevent reloading of the page when clicked (btnTranfer is also a button in the form)
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // console.log(amount, receiverAcc);

  //clearing the input fields

  inputTransferAmount.value = inputTransferTo.value = '';

  inputTransferTo.value.blur();

  //MAKING CHECKS

  //the amount is positive (if the amount is negative we might be transferring money to our own account), if the amount in the currentAccount is greater than or atleast equals to the amount and if the account exists or not and if we are not transferring money to our own account
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc &&
    receiverAcc?.username !== currentAccount.username
  ) {
    console.log('TRANSFER VALID');

    //DOING THE TRANSFER

    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //UPDATE THE UI

    updateUI(currentAccount);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////REQUEST LOAN////////////////////////////////////////////

//the bank has a rule that it grants a loan only if the currentAccount has atleast one deposit with atleast 10% of the request loan amount

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  inputLoanAmount.value = '';
  inputLoanAmount.blur();

  if (amount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
    console.log('inside if');
    //add the movement
    currentAccount.movements.push(amount);

    //UPDATE UI
    updateUI(currentAccount);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////CLOSE ACCOUNT////////////////////////////////////////////

////////////////////////////////FINDEX/////////////////////////////////////////////////

//findIndex method works the same way as find but in findIndex we return the index and not the element itself

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    //just like in find we passed in the callback function a condition that will return a boolean, like the find findIndex returns the index of the first element that satisfies the condition

    //similar to the indexOf
    //accounts.indexOf(23); we can get the index of the element that is in the array we cannot create a complex condition like in the findIndex

    //delete the account
    accounts.splice(index, 1);

    //log out the user (hide UI)
    containerApp.style.opacity = 0;

    //when we refresh the deleted user (account) comes back as we have not saved it anywhere

    console.log('DELETED');
    labelWelcome.textContent = 'Log in to get started';
  } else {
    console.log('wrong request');
    inputCloseUsername.value = inputClosePin.pin = '';
  }
});

////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////TOGGLE THE SORT BUTTON///////////////////////////////////

//state variable to know if the movements are already diaplayed sorted or not
let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted; //flipping the variable
});

///////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//this is commented as the same code is printed in the forEach for maps and sets section as well
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

//this is commented as the same line is prnted in the forEach section as well
//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/////////////////////////////////Array Methods//////////////////////////////////////

//methods are simply functions that we can call on objects, so, if arrays have methods, that means that arrays themselves are also objects, and so array methods are simply functions that are attached to all arrays that we create in JS.

let arr = ['a', 'b', 'c', 'd', 'e'];

////////////////////////////.slice()////////////////////////////////

//we can extract a part of the array without changing the original array, without mutating the original array.
//.slice(x,y)//x is the starting index and y is the ending index of the array we want to extract.
//.slice() returns the extracted array

console.log(arr.slice(2)); //(3) ["c", "d", "e"]

console.log(arr); //arr remains same, is not mutated

console.log(arr.slice(2, 4)); //end index is not included in the output //(2) ["c", "d"]

console.log(arr.slice(-2)); //last two elements of the array //(2) ["d", "e"]

console.log(arr.slice(1, -2)); //starts extracting from index 1 to the index before -2, i.e. 2 //(2) ["b", "c"]

///////////////////////////////////////////////////////////////////
//we can also use the .slice() method to shallow copy of the array.
///////////////////////////////////////////////////////////////////

console.log(arr.slice()); //same array  //(5) ["a", "b", "c", "d", "e"]

//earlier we used the spread operator to shallow copy an array like let cpyarr=[...arr];

//the method that we want to use (i.e. between slice and the spread operator) is completely on our choice.

///////////////////////////////////////////////////////////////////

//////////////////////////.splice()////////////////////////////////

//.splice(), this method is similar to the .slice() method but it changes the actual array, it mutates the array.

//splice(x,y,"abir","sikdar");//x denotes the index at which the operation is to be done, y is the number of elements that has to be deleted starting from the index x, "abir", "sikdar" are two elements that are to be added starting from index x, elements that were in the array before deleting/adding the old elements/new elements shift their positions accordingly.

//.splice() returns the the part of the array that is removed when has one or two arguments, first argument for the index and second argument for the no. of elements that are to be deleted from that index, ***********when the .splice() method is used with 3 or more arguments see what it returns****************

// console.log(arr.splice(2));//(3) ["c", "d", "e"]
// console.log(arr);//mutated array //(2) ["a", "b"]

arr.splice(-1); //removing the last element

console.log(arr); //last element is removed

console.log(arr.splice(1, 2)); //2 elements starting from index 1 are deleted  //(2) ["b", "c"]

console.log(arr); //(2) ["a", "d"]

//*********************************
// arr.splice(2,0,"new","elements");//we have to specify second index as 0, else "new" will be taken as argument for th y parameter
// console.log(arr);//(4) ["a", "d", "new", "elements"]

///////////////////////////////////////////////////////////////////

////////////////////////////.reverse()/////////////////////////////

//.reverse() reverses the array and it also mutates the original array.

arr = ['a', 'b', 'c', 'd', 'e'];

const arr2 = ['j', 'i', 'h', 'g', 'f'];

console.log(arr2.reverse()); //returns reverse of the array //(5) ["f", "g", "h", "i", "j"]

console.log(arr2); //it mutates the original array //(5) ["f", "g", "h", "i", "j"]

///////////////////////////////////////////////////////////////////

//////////////////////////concat()/////////////////////////////////

//.concat()

const letters = arr.concat(arr2); //the first array is the one on which the method is called and the sceond array is the one that is passed in the .concat() method.

console.log(letters); //(10) ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]

//does not mutate the original arrays.
console.log(arr);
console.log(arr2);

//we could also join two arrays using the spread operator without mutating the arrays.
//console.log([...arr, ...arr2]);

///////////////////////////////////////////////////////////////////

///////////////////////////////////ES2022 "at" method////////////////////

console.log('**********************ES2022 "at" method*******************');

const arrz = [23, 11, 64];

console.log(arrz[0]); //21

console.log(arrz.at(0)); //same as arrz[0]

//******************************************** */
//one special use case of the at method

//suppose we need the last element of the array
console.log(arrz[arrz.length - 1]); //64

//another way is to use the slice method
console.log(arrz.slice(-1)[0]); //the slice method returns copy of the last element of the array, to get its value we use "[0]" (element at 0th index), console.log(arrz.slice(-1)); prints the whole array returned by slice method (even though is only has the last element)

console.log(arrz.slice(-1)[0]); //prints an array with the last element if the array arrz as the only element in it

//****************************** */
///using the at method
console.log(arrz.at(-1)); //64
//****************************** */

//"at" method can be helpful in method chaining over "[]"

//at method also works on string

console.log('jonas'.at(0)); //j

/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////.join()///////////////////////////////

console.log(letters.join('-')); //returns a string, where each element is separated by "-".

///////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////FOREACH////////////////////////////////////////

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//+ve values are deposits and the -ve values are withdrawls

for (const movement of movements) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
}

console.log('*****SAME RESULT WITH THE forEach FUNCTION*****');

movements.forEach(function (movement) {
  //the forEach method is a higher-order function as it requires a callback function, in order to tell it what to do.
  //the forEach method calls the call-back function, unlike in other cases where we call the call-back-function.
  //forEach method loops over the array and for each iteration it calls the call-back function, and the call-back function is executed, it passes the element of that iteration (current element) as the first argument, the index of that iteration as the second argument and the array that we are looping through as the third argument of the call-back function.
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
});
//0: function(200)
//1:function(450)
//2:function(400)
//...

//We use a call-back function to tell a higher-order function exactly what to do.

//When we need access to the counter variable.

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: you deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: you withdrew ${Math.abs(movement)}`);
  }
}

console.log('*****SAME RESULT WITH THE forEach FUNCTION*****');

movements.forEach(function (movement, index, array) {
  //the first parameter is always the element of the current index, second parameter is always the index, the third parameter is always the entire array that we are looping over with forEach
  if (movement > 0) {
    console.log(`Movement ${index + 1}: you deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: you withdrew ${Math.abs(movement)}`);
  }
});

//**************************************************************
//The "continue" and "break" statement do not work in forEach loop at all. It will loop over the entire array, if we want that ability to use "continue" or/and "break" we should use the forof loop.

////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////forEach for MAP and SET///////////////////////////////

/////////////////////////MAPS///////////////////////////

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (curValue, key, entireMap) {
  //same as array the first parameter is the current element, the second parameter is the current index and the third parameter is the entire map that we are iterating over.
  console.log(`${key}:${curValue}`);
  //console.log(`${(key, curValue)}`);
});

////////////////////////////////////////////////////////

//////////////////////////SETS//////////////////////////

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);

console.log(currenciesUnique);

currenciesUnique.forEach(function (curValue, _curValue, set) {
  //we cannot have duplicate parameter names, we use "_" which in JS, means a throw-away variable, which means a variable that is completely unnecessary, a convention.

  console.log(`${curValue}:${curValue}`);
});
//USD:USD
//GBP:GBP
//EUR:EUR
//as sets do not have any keys or indices, the key is exactly the same as the value. This was done so as the forEach method would have to be changed for sets as the second parameter made no sense in case of sets, changing the forEach for sets would create more confusion, so the second parameter is passed the same value as the first parameter.

////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////THE MAP METHOD///////////////////////////////////////////////////

///////////////////////////map method discussed///////////////////////////
// const movementsToUsd = movements.map(function (mov) {

const eurToUsd = 1.1;

//   //loops over the array movements arrar and takes each elements and calls the callback function on it and saves the result in a new array. Returns the new array. Is similar to the forEach method  but different as it creates a new array

//   return mov * eurToUsd;
// });

/////////////////////////efficient code using arrow functions///////////////////////////
const movementsToUsd = movements.map(mov => mov * eurToUsd);

console.log(movements); //array not mutated

console.log(movementsToUsd); //returns new array

///////////////////////////////////////////////////////////////////////////////////

///////////////////doing the same thing using for-of loop/////////////////////////

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);

console.log(movementsUSDfor); //we manually create a new array and then store values in it using the for-of loop, but we prefer map method as it is more in line wth functional programming, new and modern way of doing things.

//////////////////////////////////////////////////////////////////////////////////////
//the map method also like forEach has access to the index and the whole array as well, (element,index,array)

// const movementsDescriptions = movements.map((mov, i) => {
//   //map method calls this callback function for each element
//   if (mov > 0) {
//     return `Movement ${i + 1}: you deposited ${mov}`;
//   } else {
//     return `Movement ${i + 1}: you withdrew ${Math.abs(mov)}`;
//   }
// });

//same but simplified
/////////////////////////////////////////////////////////
const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movements ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescriptions);

/////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////FILTER METHOD////////////////////////////////////////////////

///////////////////////////////////filter method discussed//////////////////////////////

//used to filter elements that satisfy a certain condition
//the filter method returns a new array that contains all the elements that it loops over in the array we pass to it which pass certain condition(s), it calls the callback function for each element of the array and the callback function returns the elements which pass the condition(s).

// const deposits = movements.filter(function (mov) {
//   return mov > 0; //we return boolean, the elemets for which we return true are returned to the new array formed
// });

// console.log(movements); //the movements array is not mutated

// console.log(deposits); //returns a new array of deposits (where the value was positive)

//same as above code but using arrow functions
const deposits = movements.filter(mov => mov > 0);

console.log(movements); //the movements array is not mutated

console.log(deposits); //returns a new array of deposits (where the value was positive)

///////////////////////////////////////////////////////////////////////////////////////

///////////////////////doing the same as above but using for-of loop///////////////////

const depositFor = [];
for (const mov of movements) if (mov > 0) depositFor.push(mov);
console.log(depositFor);

/////////////////////why we use filter method////////////////////////////////
//we use the filter method because that is in line with functional programming
//we prefer filter method as chaining of different array methods is easy

////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////THE REDUCED METHOD/////////////////////////////////////////////

////////////////////////////////reduce method discussed//////////////////////////////////

//we do not return a new array but a single value, we get that value by reducing the whole array (eg- adding all the elements if an array, accumulative sum (snowball effect))

//in the callback function of the reduce method, the first parameter is accumulate, that is, it keeps accumulating the value that we finally want to return (like a snowball), second parameter is the current element, third parameter is the current index and the fourth parameter is the entire array

//the reduce method has two parameters, the first parameter is the call back function whereas the second parameter is the initial value of the accumulate, (the value with which we want to start accumulate with)

const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i + 1}: ${acc}`);
  return acc + cur; //at each iteration we return the value of acc+cur which is stored in the acc for the next iteration
}, 0); //we have the initial value of acc as 0, the second parameter of the reduce method

//the above code with arrow functions in the callback function

// const balance = movements.reduce((acc, cur, i, arr) => acc + cur, 0);

console.log(balance);

/////////////////////////////////////////////////////////////////////////////////////////

/////////////doing the same as above using the for-of loop/////////////

let balance2 = 0;

for (const mov of movements) balance2 += mov;

console.log(balance2);

/////////////////////////////////////////////////////////////////////////

//other examples if the reduce method

//maximum value in the array

const maxMovement = movements.reduce(function (acc, mov) {
  if (mov >= acc) {
    return mov;
  } else {
    return acc;
  }
}, movements[0]);

console.log(maxMovement); //3000

const lastElement = movements.reduce(function (acc, mov) {
  return mov;
});

console.log(lastElement); //last element of the array (1300)

//****************************************************************************************** */
//what the callback function of the reduce method does is it at every iteration,the value that is returned from the operation done inside the callback function is saved in the accumulate overwriting the previous value(if theres a new value, if no new value, the old value remains), this is done until the last iteration and then the accumulate is returned by the reduce method

//****************************************************************************************** */

/////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////CHAINING METHODS/////////////////////////////////////

const eurToUsd2 = 1.1;

//pipeline
const totalDepositUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd2)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositUSD);

//we chain filter, map and reduce, since filter and map return an array, we can chain methods on the returned array.
//we can chain array methods that takes arrays to work only if the previous method in the pipeline returns an array, we cannot chain map and filter after using reduce as reduce does not return a new array but returns just a value and map and filter both take arrays to work with.

// const totalDepositUSD2 = movements
//   .reduce((acc, mov) => acc + mov, 0)
//   .map(mov => mov * eurToUsd2);
// console.log(totalDepositUSD2);//gives error

/////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////THE FIND METHOD////////////////////////////////////

//we can retrieve one element of an array based on a condition

//find method loops over the array and has a callback function which it calls for element of the array and the callback function has a condition

const firstWithdrawal = movements.find(mov => mov < 0); //returns the first withdrawal

//just like the filter method the find method also needs a condition in the callback function that returns a boolean, but instead it does not return an array but a single value, in this case it returns the first element that fulfills this condition in the array

//Two major difference between the find method and the filter method

//1. The filter method returns all the elements in the array that satisfy the condition in the callback function whereas the find method returns only the first element that satisfies the condition

//2.The filter method returns an array of all the elements that satisfy the filter condition whereas the find method returns only one value that is the first element that satisfies the condition

console.log(accounts); //array of objects

const account = accounts.find(accnt => accnt.owner === 'Jessica Davis');

console.log(account); //object of Jessica Davis, we search this object using the property that we know

//the goal of find method is to find exactly one element, so we usually set up a condition that can be satisfied by only one element

////////////////////////////////same code as above using the for-of loop////////////////////

let accountWeNeed;

for (const accnt of accounts) {
  if (accnt.owner === 'Jessica Davis') {
    accountWeNeed = accnt;
  }
}

console.log(accountWeNeed);

////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////some and every method////////////////////////////////////////

console.log(movements);

console.log(movements.includes(-130)); //we can use includes method to see if there is an element in the array that is equal to -130

//returns true

//we can only test for equality using .includes(x), but if we want to test for some condition we can use the some method

/////////////////////////////SOME METHOD///////////////////////////

//some method iterates over the array and uses a callback function for every element, the callback function has a condiition inside it and it returns boolean, some method returns that boolean

console.log(movements.some(mov => mov > 1500)); //checking if there is any deposit above 1500, returns true

//some method returns true if any element in the array satirfies the condition, else it returns false

///////////////////////////EVERY METHOD////////////////////////////

//similar to some method, but it only returns true if all of the elements in the array satisfy the condition in the callback function, else if return false

console.log(movements.every(mov => mov > 0)); //false, as every movement in the array is not a deposit

console.log(account4.movements.every(mov => mov > 0)); //true

//separate callback

const deposit = mov => mov > 0;

console.log(movements.some(deposit)); //can be used with any method that has a callback function, we declare the function outside and in the callback function we give the function name

///////////////////////////////////////////////////////////////////////////////////////////

/////////////////////(ES2019)FLAT AND FLATMAP///////////////////////////////////////////////

//////////////////////   //FLAT///////////////////////////////
const arrayNested = [[1, 2, 3], [4, 5, 6], 7, 8]; //nested array

console.log(arrayNested.flat()); //makes the nested array into simplearray

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];

console.log(arrDeep.flat()); //flat with no argument can make nested arrays on only one level deep into simple array, it does not return simple array in this case,it reduces one level of nesting
//  0: (2) [1, 2]
// 1: 3
// 2: 4
// 3: (2) [5, 6]
// 4: 7
// 5: 8

console.log(arrDeep.flat(2)); //goes two levels deep, returns simple array [1, 2, 3, 4, 5, 6, 7, 8]

//////////////////////////////////////////////////////////
//if we want to calculate the overall account balance of all the accounts

const accountMovements = accounts.map(acc => acc.movements); //we take the movements arrays (property in account objects) and save it in the accountMovements array

console.log(accountMovements); //array of array movements

const allMovements = accountMovements.flat(); //takes out all the movements from all the movement arrays into one

console.log(allMovements);

const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0); //adding all the elements in the allMovements

console.log(overallBalance); //gives the overall balance of all the accounts

//or we can also chain methods
const overallBalance2 = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

console.log(overallBalance2);

///////////////////////////////////////////////////////////////////

//turns out its is pretty common to use map and chain it with flat method, so we have a method flatMap that is combines flat and map method, it is better for performance

const overallBalance3 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);

//flatMap has exactly the same callback function as map method

console.log(overallBalance3);

//one thing to notice is that flatMap goes only one level deep in nested arrays and we cannot change it, so it make 2 or more level deeply nested array into simple array we need to use flat and map methods separately

///////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////SORTING ARRAYS////////////////////////////////////////

//we use js built-in sort method

const owners = ['Jonas', 'Zack', 'Adam', 'Martha'];

console.log(owners.sort()); //sorts the array alphabetically

console.log(owners); //using the sort also mutates the original array

console.log(movements.sort()); //the result is not as we expected as the sort method sorts based on strings, the sort method converts everything to strings and then sorts //[-130, -400, -650, 1300, 200, 3000, 450, 70]

//we can use sort method for numbers by passing a compare function in the sort method
//the compare function that is passed to the sort method is a callback function that is passed with two arguments where a is the current element and b is the next element, or a and b are two consecutive function

//return<0 ; result:A,B //we return a negative value to get A before B
//return>0 ; result:B,A //we return a positive value to get B before A
//return ==0 ; no change to position

// positive and negative values can be any value which are simply positive and negative respectively

console.log(
  movements.sort((a, b) => {
    if (a > b) return 1; //when we find a>b we reurn a positive number to get b before a
    if (b > a) return -1; //when we find b>a we return a negative number to get a before a
  })
); //sorts the array in ascending order

//the sort method keeps looping over the array and applying the callback function until every element in the array follows the condition in the callback function

//Ascending
console.log(
  movements.sort((a, b) => {
    if (a > b) return 1; //when we find a>b we reurn a positive number to get b before a
    if (b > a) return -1; //when we find b>a we return a negative number to get a before a
  })
);

//Descending
console.log(
  movements.sort((a, b) => {
    if (a > b) return -1; //when we find a>b we reurn a positive number to get b before a
    if (b > a) return 1; //when we find b>a we return a negative number to get a before a
  })
);

//simplifying
console.log(movements.sort((a, b) => a - b)); //if a is greater than b, a-b will always be positive number that will return a positive number which will put b first, while if b is greater than a, a-b will always be a negative number, it will return a negative number that will put a before b, if a==b so no change in position

//if we have a mixed array of numbers and string, we cannot sort it using the sort method

///////////////////////////////////////////////////////////////////////////////////////

///////////////////////////CREATING AND FILLING ARRAYS/////////////////////////////////

//GENERATING ARRAYS PROGRAMATICALLY

//using ARRAY CONSTRUCTOR FUNCTION

const x = new Array(7); //PASSING ONLY ONE ARGUMENT

console.log(x); //creating an array with seven empty elements (contains nothing)

//whenever we pass only one argument (x) in an array constructor, it does not create an array of one element but rather it creates an empty array of x elements

//there is not much use of the empty array that we just created, we cannot map over it an input elements in the array
// console.log(x.map(() => 5));//does not work

//the only one method that can be called on the empty array that is the fill method

//////////////////////fill method///////////////////////////////

// x.fill(1);
// console.log(x); //mutates the underlying array

//fill is like slice, fill(x,y,z), where x is the element we want to push in the array, y is the starting index, z is the ending index and like in slice the ending index is not included

console.log(x.fill(1, 3, 5));

//we can also use fill to fill in arrays that already have elements and not just empty arrays

const arro = [1, 2, 3, 4, 5, 6, 7, 8];

arro.fill(23, 2, 6);

///////////////////////////////////////////////////////////////////

///////////////////////////Array.from()////////////////////////////

//here we are not using the from() method on just any Array but on the array constructor like the Array in const x=new Array();

const y = Array.from({ length: 7 }, () => 1); //first argument it takes is an object with a key/proptery as length and its value as the length we want the array to be, for the second argument it has a callback function that is exactly like the callback function in the map method, it is like calling the map method on an empty array

console.log(y); //[1, 1, 1, 1, 1, 1, 1]

//creating an array with length 7 and elements from 1 to 7

const z = Array.from({ length: 7 }, (_, i) => i + 1); //"_" throwaway variable, we dont use this parameter

console.log(z); //[1, 2, 3, 4, 5, 6, 7]

//Array.from() was introduced in JS to create arrays from array like structures

//iterables like maps, strings, sets, etc can be converted to real arrays  using Array.from()

//besides these obvious iterables, another gret example of an array like structure is the result of querySelectorAll, it returns a node list, which is like an array that contains all the selected elements, but its not a real array and so it doesnt have methods most arrays do, so to apply these methods which are available on arrays, we have to first convert the node list into an array using the Array.from()

/////////////////////////////////////////////////////////////////////

//say we do not have data of someting that is in the UI, here we conside we do not have the movements data and we are trying to get the data from the UI

const movementsUI = Array.from(document.querySelectorAll('.movements__value')); //selecting all of the elemets that have th class '.movements_value'
//converts the node list into an array

console.log(movementsUI); // we only get two elements in the array, i.e. the already existing elements in the html by same class name because by the time script loads, there are no elements with the class name as movements__value other than the one in the html

//this way we get all the movements on the UI and not not from the HTML when we click on the labelBalance (BALANCE VALUE IN THE UI)

// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value')
//   );
//   console.log(movementsUI);

//   console.log(movementsUI.map(el => Number(el.textContent.replace('€', '')))); //removes €
//   //works as movementsUI is an array
// });

//combining all

// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => Number(el.textContent.replace('€', ''))
//   );
//   console.log(movementsUI);
// });

//we can also use the spread operator to convert the node list into an array
//we can also use the spread operator but then we will have to do the mapping separately

labelBalance.addEventListener('click', function () {
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  console.log(movementsUI2);
});

////////////////////////////////////////////////////////////////

// Array Methods Practice

//1,sum of all the deposits in all the 4 accounts combined
const bankDeposit = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDeposit);

//2.no. of deposits in the bank above 1000 dollars

// const numDeposits1000Easy = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

//using reduce
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((cnt, cur) => (cur >= 1000 ? cnt + 1 : cnt), 0);

console.log(numDeposits1000);

//usig cnt++ wont work as it returns the same value but increments in the next line, so we use ++cnt

// let example = 10;
// console.log(example++); //10
// console.log(example); //11
// console.log(++example); //12

// const numDeposits1000temp = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((cnt, cur) => (cur >= 1000 ? ++cnt : cnt), 0);

//3.create a new object which contains the sum of the deposits and withdrawls

// const { depositSum, withdrawalSum } = accounts //destructuring the object
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, cur) => {
//       //the initial value of sums is the object
//       //like:
//       // sums={ depositSum: 0, withdrawalSum: 0 }
//       //so we can access the depositSum and withdrawalSum as sums.depositSum and sums.withdrawalSum
//       cur > 0 ? (sums.depositSum += cur) : (sums.withdrawalSum += cur);
//       return sums; //in arrow function the value is automatically or implicitly returned if the function body not with "{}", as here we have the function body with "{}", we have to explictly return the value (sums)
//     },
//     { depositSum: 0, withdrawalSum: 0 } //we declare an object with depositSum and withdrawalSum as keys with values of both as 0,the object is the initial value of the sums
//   );

// //goal is to create an object so the starting point is also object

// console.log(depositSum, withdrawalSum); //we get sum of all the depositSum and all the withdrawalSum

//cleaner code
const { depositSum, withdrawalSum } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      sums[cur > 0 ? 'depositSum' : 'withdrawalSum'] += cur;
      return sums;
    },
    { depositSum: 0, withdrawalSum: 0 }
  );

console.log(depositSum, withdrawalSum); //same answer

//doing the same thing with arrays

const line = [1, 2, 3, 4, 5, 6, 7, 8];

const lineSquared = line.reduce((acc, cur, i) => {
  acc.push((i + 1) * cur);
  return acc;
}, []);

console.log(lineSquared);

//4. Create a simple function to convert any string to title case (title case means all the words in a sentence is captalised except some of them)

//this is a nice title
//TITLE CASE: This Is a Nice Title

const convertTitleCase = function (title) {
  //we capitalize the first alphabet of the word and join it with the rest of the words
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  //exceptions which we do not want to capitalise
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  let titleCase = title
    .toLowerCase() //we convert the whole string into lower case
    .split(' ') //we split the words on spaces
    //we map over the array of strings, taking each string and making it go through the callback function, where it is checked whether it is an exception or has to be capitalised
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    //we then join the array of strings
    .join(' ');
  titleCase = capitalize(titleCase); //capitalizing the first word of the string again in case it is an exception
  return titleCase;
};

//examples
console.log(convertTitleCase('this is a nice title'));

console.log(convertTitleCase('this is a LONG TITLE bit not too long'));

console.log(convertTitleCase('and here is another Example of a title case'));
