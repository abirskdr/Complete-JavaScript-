'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

//******************************************** */
// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2022-02-08T23:36:17.929Z',
    '2022-02-06T10:51:36.790Z',
  ],
  //z at the end of date string is universally coordinated time, i.e. the time without any timezone in London and also without daylight savings
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  //locale is the locale key in the account object passed to the function
  const calcDaysPassedMov = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassedMov(new Date(), date); //we calculate the number of days passed sinse the day of movement and today

  if (daysPassed == 0) return 'today';
  if (daysPassed == 1) return 'yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    //old code

    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;

    /////////////////////////////////////////////////////
    //using the internationalization API
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

//formats the currency using the internationalizaton API
const formatCurr = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

//same as the code of previous section

const displayMovements = function (acc, sort = false) {
  //we also want the movements date and not just movements array, so the best thing to do is to pass the entire account object
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    //CODE PIECE SHIFTED TO formatMovementDate TO PREVENT CONFUSION

    const date = new Date(acc.movementsDates[i]); //we convert the string into JS object (time)
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();

    const displayDate = formatMovementDate(date, acc.locale); //passing the locale as the second parameter

    //////////////////////////////////////////////////////////////
    //internationalization API on currencies

    //code in the function 'formatCurr' created outside to follow DRY code principle

    // const formattedMov = new Intl.NumberFormat(acc.locale, {
    //   //acc.locale gives us the 'language-Country'
    //   //configuration object
    //   style: 'currency',
    //   currency: acc.currency, //getting the currency from the account object
    // }).format(mov);
    //////////////////////////////////////////////////////////////

    //calling the function formatCurr where we have the code above
    const formattedMov = formatCurr(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  // labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
  //internationalization API
  labelBalance.textContent = formatCurr(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  // labelSumIn.textContent = `${incomes.toFixed(2)}€`;
  //internationalization API
  labelSumIn.textContent = formatCurr(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  // labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;
  //internationalization API
  labelSumOut.textContent = formatCurr(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  // labelSumInterest.textContent = `${interest.toFixed(2)}€`;
  //internationalization API
  labelSumInterest.textContent = formatCurr(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc); //pass the whole account object and not just the movements array

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

//////////////////////////TIMER FUNCTIONALITY//////////////////////////////////////////

///////////////improved code/////////////////
const startLogOutTimer = function () {
  //we declare the tick outside of the setInterval function so that we can assign it to a variable and call it immediately (manually) before the setInterval calls it after the delay time is over
  const tick = function () {
    //converting seconds to minutes and seconds
    const min = String(Math.trunc(time / 60)).padStart(2, 0);

    const sec = String(time % 60).padStart(2, 0);

    //in each call, print the remaining time to the UI
    labelTimer.textContent = `${min}:${sec}`;

    //remove one second
    time = time - 1;

    //when 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
  };
  //set time to 5 minutes
  let time = 20;

  //we call tick (that is the callback function of the setInterval timer function outside to immediately reset the value in the labelTimer the moment we log in without waiting for the delay time to be over for the setInterval to call the callback function)
  tick();

  //call the timer every second
  const timer = setInterval(tick, 1000);

  //************************************** */
  //there is one more problem, if we log in into another account while we are already logged in, the timer seems to malfunction, this is as there are now two timers running, one of the first account and another of the second account that we logged in while being logged in in another account.
  //We prevent this by returning the timer to where it was called, this way we can check if there was a timer already or not
  return timer;
};

// const startLogOutTimer = function () {
//   //set time to 5 minutes
//   let time = 300;

//   //call the timer every second
//   const timer = setInterval(function () {
//     //converting seconds to minutes and seconds
//     const min = String(Math.trunc(time / 60)).padStart(2, 0);

//     const sec = String(time % 60).padStart(2, 0);

//     //in each call, print the remaining time to the UI
//     labelTimer.textContent = `${min}:${sec}`;

//     //remove one second
//     time = time - 1;

//     //when 0 seconds, stop timer and log out user
//     if (time === 0) {
//       clearInterval(timer);
//       labelWelcome.textContent = `Log in to get started`;
//       containerApp.style.opacity = 0;
//     }
//   }, 1000);
// };
//There is a problem with this logic, once the time is 0, the account is logged out, next time we log in,for a moment we see 1 second in the timer, and then the timer is reset (this period depends in the delay time, when the delay time is over, the callback function is called and the labelTimer is reset), this is because when the code runs for the first time after we have been logged out and log in again, there is still the delay time after which the setInterval timer function will call the callback function for the first time, till then the labelTimer  will have the last value it had before the timer was cleared in the previous log in session, i.e. the timer was cleared when labelTimer still had 1 sec and the time was 0, to prevent this, we have to call the setInterval callback function to reset the labelTimer immediately when the code is executed for the first time, we do this by declaring the callback function outside of the setInterval timer function and call that callback function for the first time manually (which resets the labelTimer the moment we log in) outside the setInterval until the delay period is over and it is called the next time by the setInterval function itself

////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////
// Event handlers
let currentAccount, timer; //we need both the currentAccount and the timer as a global variable

//FAKE ALWAYS LOGGED IN
// currentAccount = account1; //jonas
// updateUI(currentAccount);
// containerApp.style.opacity = 100;
/////////////////////////

//////////////////////SETTING DATES//////////////////////////////////////

//THE CODE IS PUT INSIDE THE EVENTLISTENER THAT TRIGGERS WHEN LOGGED IN

// const now = new Date(); //returns the current date

// const day = `${now.getDate()}`.padStart(2, 0);
// const month = `${now.getMonth() + 1}`.padStart(2, 0);
// //padStart makes the date and month always of 2 digits, if the date has only one digit, it will add 0 in the beginning

// const year = now.getFullYear();
// const hour = now.getHours().padStart(2, 0);
// const minutes = now.getMinutes().padStart(2, 0).;
// labelDate.textContent = `${day}/${month}/${year},${hour}:${minutes}`;

// //formatting we need
// //date/month/year

//////////////////////////////////////////////////////////////////////////

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //************************************************* */
    //date below current balance

    ///////////////////////////////////////////////////////
    // internationalization API is used

    // const now = new Date(); //returns the current date

    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // //padStart makes the date and month always of 2 digits, if the date has only one digit, it will add 0 in the beginning

    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const minutes = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year},${hour}:${minutes}`;

    //formatting we need
    //date/month/year
    ///////////////////////////////////////////////////////

    ///////EXPERIMENTING API (Intl)/////////////////////////

    const now = new Date();
    //options object (configuration object defined outside)
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long', //we get the name (is we write numeric, we get month (one digit), if we write 2-digit, we get the month (two digits))
      year: 'numeric',
      weekday: 'long',
    };

    //we get the language from the browser of the user
    // const locale = navigator.language;

    //we get the language from the account object
    const locale = currentAccount.locale;
    console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(
      now
    );
    //using the internationalization API ('Intl' namespace for the internationalization API), DateTimeFormat() function is used to format the date and time, as the first argument we pass a local string inside the function (here we have the variable that gets the language from the browser of the user), it usually has the language and the country ('language-Country'), as the second argument we pass a configration object that has keys as the things we want to display and the values set to how we want to display them, all of these create a formatter and on that formatter we can call '.format()', and in that method we pass in the date when we want to format (now)

    //en-GB //english-Great Britain
    //ar-SY //arabic-Syria
    //we can find this by googling iso language code table (lingoes.net)

    //////////////////////////////////////////////////

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //timer functionality

    //we have the timer as a global variable as we need to check if the timer already exists, if the timer is undefined, it does not exist and there is not setInterval function that is running, but if it is not undefined, there is a timer, and a setInterval function is already running, so we clear that setInterval function first before creating another timer
    console.log(`timer:${timer}`);

    if (timer) {
      clearInterval(timer);
    }
    timer = startLogOutTimer(); //what the startLogOutTimer function returns is stored in the timer (which is global)

    // Update UI
    updateUI(currentAccount);
  }
});

//when we use the transfer and loan amount, we get the date as NAN/NAN/NAN ,as we do not update the movementsDates along with the movements, we need to update the date to the movementsDates of currentAccount and recieverAcc where ever required
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //**************************************** */
    //ADD TRANSFER DATE
    console.log(receiverAcc);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    //resetting the timer function
    clearInterval(timer); //clearing the previous timer when we do an activity like a transfer of a loan
    timer = startLogOutTimer(); //starting a new timer
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value); //we round the value, and also we need not convert it into number as the floor function also does type corecions

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    /////////////////////setTimeout////////////////////////
    //putting the code inside of a setTimeout function to simulate the bank processing delay
    setTimeout(function () {
      currentAccount.movements.push(amount);

      //**************************************** */
      //ADD LOAN DATE
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500); //after 2.5 seconds

    //resetting the timer once loan is applied
    clearInterval(timer); //clearing the previous timer when we do an activity like a transfer of a loan
    timer = startLogOutTimer(); //starting a new timer
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted); //pass the whole account object and not just the movements array
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//In JS all numbers are represented internally as floating point numbers

console.log(23 === 23.0); //true

//that is why we have only one datatype for all numbers
//numbers are represented internally as (64)base2, that means numbers are always stored in binary format, in binary form, representation of some fractions is very hard that is otherwise easy in base 10
//BASE 10 :0-9
//BASE 2: 0 & 1

// console.log(0.1 + 0.2);//0.30000000000000004

//the above result should have been 0.3 but as numbers are represented in binary internally, some fractions are difficult to represent

//se we should not prefer JS to do really precise scientific and financial calculations in JS

//convertion string to number

console.log(Number('23')); //23

//easier way
console.log(+'23'); //23 //when JS sees the '+' it does type coercion and converts all the operands to numbers

//parsing

//by parsing , we can parse numbers from strings
console.log(Number.parseInt('30px')); //30 //ignores unnecessary symbols

//but in order for it to work the string must start with a number

//on the Number function, which is also an object (every function is an object in JS), we can have the function parseInt to parsee numbers from a string

console.log(Number.parseInt('e23')); //NaN as the string does not start with a number

//the parseInt function also accepts a second function that is called the radix, the radix is the base of the numeral system we are using

console.log(Number.parseInt('1032302eee', 2)); //the second arguent is to specify we are using base 2, here ot takes 10 which is 2 in decimal so, returns 2

//parseFloat
console.log(Number.parseInt('2.5rem')); //2
console.log(Number.parseFloat('2.5rem')); //2.5

//parseFloat and parseInt are global functions so we need not call them with number, which is the nore traditional and oldschool way of doing it, but in modern JS we use it with Number, it provides parseInt and parseFloat something called namespace

console.log(parseFloat('3.14era')); //3.14

//both parseInt and parseFloat can be used to read values from css values

/////////////////////////////////////////////////////////////////////

//isNaN (is Not a Number)

// Unlike all other possible values in JavaScript, it is not possible to use the equality operators (== and ===) to compare a value against NaN to determine whether the value is NaN or not, because both NaN == NaN and NaN === NaN evaluate to false. The isNaN() function provides a convenient equality check against NaN.

//to check a value is NaN in terms of JS
console.log(Number.isNaN(20)); //false

console.log(Number.isNaN(+'20X')); //true (20X) is NaN

console.log(Number.isNaN('20')); //false;

console.log(Number.isNaN(+'20')); //false

console.log(23 / 0); //infinity

console.log(Number.isNaN(23 / 0)); //false

console.log(Number.isNaN('dsgdssf')); //false

/////////////////////////////////////////////////////////////////////

//isFinite (better to check whether the value is number or not)

console.log('**************isFinite***************');

console.log(Number.isFinite(20)); //true

console.log(Number.isFinite(+'20X')); //false

console.log(Number.isFinite('20')); //false

console.log(Number.isFinite(+'20')); //true

console.log(Number.isFinite(23 / 0)); //false (infinity is not finite)

console.log(Number.isFinite('sdgsgrgf')); //false

//isFinite is the method that we should use to check whether the value is number, a real number and not a string

/////////////////////////////////////////////////////////////////////

//isInteger (checking for Int)

console.log('**********isInteger*************');

console.log(Number.isInteger(20)); //true

console.log(Number.isInteger(23.0)); //true

console.log(Number.isInteger(23.3)); //false

console.log(Number.isInteger('adesf')); //false

/////////////////////////////////////////////////////////////////////

/////////////////Math and Rounding///////////////////////////////////

/////////////////////////////////////////////////////////////////////

//sqrt for square root

console.log(Math.sqrt(25)); //sqrt is a part of the Math namespace

//using exponentiation operator

console.log(25 ** (1 / 2)); //5

console.log(8 ** (1 / 3)); //2 (cube root)

//max  and min (to find the max and min respectively)

console.log(Math.max(5, 6, 4, 6, 23)); //23

console.log(Math.max(5, 6, 4, 4, 34, '37px')); //NaN

console.log(Math.min(1, 2, 3, 4, 5)); //1

/////////////////////////////////////////////////////////////////////
//constants

console.log(Math.PI * Number.parseFloat('10px') ** 2); //Math.PI is a constant number, we calculate the area of a circle whose radius is 10px

/////////////////////////////////////////////////////////////////////
//random

console.log(Math.random()); //returns a random number 0 and 1

//generalised formula to calculate random integers between x and y

const randomList = (max, min) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

//random (0 to 1)*(max-min) +1 gives us a random number between 0 and max-min, adding min at the end gives random numbers between min and max-min+min=max

console.log(randomList(10, 5));

/////////////////////////////////////////////////////////////////////
//Rounding integers

//trunc (removes any decimal part)
console.log(Math.trunc(23.3)); //23

//round (rounds to the nearest integer)
console.log(Math.round(23.9)); //24

//ceil (ceiling function)
console.log(Math.ceil(23.4)); //24

//floor (floor function)
console.log(Math.floor(23.3)); //23

//all of this also methods also do type coercion
console.log(Math.floor('23.3')); //23

//Round and floor are similar for positive numbers while they are not similar when it is the case of negative numbers

console.log(Math.floor(-23.3)); //-24;

console.log(Math.trunc(-23.3)); //-23;

/////////////////////////////////////////////////////////////////////
//rounding decimals

//toFixed (returns a string with the number of places after decimal equal to the number we pass to it)

console.log((2.7).toFixed(0)); //3 as a string, toFixed always returns a string and not a number

console.log((2.7).toFixed(4)); //returns a string that is a number with 4 places after the decimal

console.log((2.345).toFixed(2)); //2.35 (2 places after decimal), rounds the number

console.log(+(2.345).toFixed(2)); //to convert a string into number here, we have to add a "+" sign   //2.35 as a number

/////////////////////////////////////////////////////////////////////

//we round the loan amount using the floor function

//we use the toFixed function to make the numbers look a little bit nicer

/////////////////////////////////////////////////////////////////////

///////////////////////////THE REMAINDER OPERATOR////////////////////

//it returns the remainder of a division

console.log(5 % 2); //1 (remainder)

console.log(5 / 2); //2.5

console.log(8 % 3); //2 (remainder)

console.log(8 / 3); // 2.6666666666666665

//remainder operator is used to check if a number is even or odd

const isEven = n => n % 2 === 0;

console.log(isEven(7)); //false

//to check if a number is completely divisible by the other number

//we want to make the color of every second row as orange

//we put it inside of a callback function as if not done so this will be executed as soon as we execute the program, and will be overlapped when we log in, so we put in inside the call back function of an eventListener that executes when we click on the labelBalance
labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orange';
  });
});
//document.querySelectorAll('.movements__row') selects all the elements with this class name and returns a node list, to convert it into an array we use a spread operator

/////////////////////////////////////////////////////////////////////

///////////////////////The Numeric Separator/////////////////////////

//introduced in ES 2021, we can format numbers in such a way that makes it easier to  read and understand using the numeric separator

const diameter = 287460000000; //this number is really hard to read as we dont have any commas like: 287,460,000,000 , where the thousand separator is (",")
console.log(diameter);

//we can use _ as he thousand separator in js

const diameterG = 287_460_000_000;
console.log(diameterG); //287460000000  //js ignores the "_" but it makes the value in the code readable as the "," does as the thousands separator in real life

//js ignore the use of "_" in between numbers, and we can use it to understand numbers better, 160 cm can be written as 1_60 to denote 1 m 60 cm

//we can only place "_" between numbers , it is not allowed to add it in the beginning or the end or before or after "."

// const PI=3._14;
// console.log(PI);

/////////////////////////////////////////////////
//It is to note that when we try to convert strings that contains "_" to a number, it will not work as expected

console.log(Number('230000')); //230000

console.log(Number('230_000')); //NaN

console.log(parseInt('230_000')); //230 (not expected)

//If we need to store a number in a string for example in an API or get a number as a string from an API, we should not use "_" as then js will not be able to parse the number correctly

/////////////////////////////////////////////////////////////////////

//////////////////////(ES 2020) BigInt/////////////////////////////////

//in JS numbers are stored in 64 bits, there are 53 bits are used to store the digits themselves, rest are used to store position of decimal point and the sign, the largest number

//largest number that JS can store

console.log(2 ** 53 - 1); //9007199254740991 (largest number that can be represented correctly in JS)

console.log(Number.MAX_SAFE_INTEGER); //(2 ** 53 - 1) largest number that JS can store in its 64 bits, any number that is larger than this cannot be stored accurately and safely

console.log(2 ** 53 + 1); //unsafe number cannot be stored accurately as they are bigger than 2 ** 53 - 1, and we might loose precision

console.log(2 ** 53 + 10); //unsafe number cannot be stored accurately as they are bigger than 2 ** 53 - 1, and we might loose precision

//sometimes JS in the background uses some tricks to still represent some of the unsafe numbers, sometimes they work and sometimes they dont

//this can be a problem as in some situations we might need really big numbers than these like for database id s or while dealing with real 64 bit numbers used in other languages, to help in these situations we have a new primitive added to JS in ES2020, called BigInt, using BigInt we can store a number as large as we want

console.log(34543270234730277958453895473980707298472980724n); //the n in the end converts the regular number to a BigInt number

console.log(BigInt(23489768473253278287543972578349825794785)); //this function has good precision for short numbers, as JS has to first represent this number internally before it can transform it into BigInt

//operations

//all the usual operators still work the same way

console.log(10000n + 10000n);

console.log(2345245243254315n * 32432253426346426444n);

//what is not possible is to mix BigInt numbers with regular numbers

// console.log(353422534253443n + 43532454);//Cannot mix BigInt and other types

//this is where the constructor function is used (BigInt())

console.log(32453435354252n + BigInt(345324645643));

//Math operations are not going to work with BigInt

// console.log(Math.sqrt(16n)); // Cannot convert a BigInt value to a number at Math.sqrt

//divisions using bigint numbers

console.log(10n / 3n); //returns the closest bigint (3n), cuts off the decimal part

console.log(10 / 3); //3.3333333333333335

//***************************************************** */
//there are two exceptions to this when working with the comparison operators (=== and ==) and logical operators and "+" operator when working with strings

//logical operators

console.log(20n > 15); //true

console.log(typeof 20n); //bigint

console.log(20n == 20); //true, (JS does type coercion and changes bigint to regular number)

console.log(20n === 20); //false (when using "===" JS does not do type coercion, they have different primitive types)

//string concatenations

console.log(2353423425343645486698n + ' is really big'); //bigint number is actually converted to a string

/////////////////////////////////////////////////////////////////////////

/////////////////////////CREATING DATES//////////////////////////////////

//4 ways of creating dates in JS, all use the new Date() constructor function but take different parameters

// //1st way

// const now = new Date();

// //returns the current date and time
// console.log(now); //Tue Feb 08 2022 20:05:13 GMT+0530 (India Standard Time)

// //2nd way

// //parsing the date from a date string

// //JS generated string (reliable)
// console.log(new Date('Feb 08 2022 20:05:13'));

// //writing the string ourselves (unreliable)
// console.log(new Date('December 24, 2015')); //Thu Dec 24 2015 00:00:00 GMT+0530 (India Standard Time)

// console.log(new Date(account1.movementsDates[0])); //1st time string from the accounts object

// //3rd way

// //giving the values in order
// console.log(new Date(2037, 10, 19, 15, 23, 5)); //Thu Nov 19 2037 15:23:05 GMT+0530 (India Standard Time)

// //year, month, day, hour, min, sec
// //month in JS is zero based

// console.log(new Date(2037, 10, 31, 15, 23, 5)); //Tue Dec 01 2037 15:23:05 GMT+0530 (India Standard Time) JS autocorrects date as there is no 31st November

// //4th way

// //pass in the amount of milliseconds pass since the beginning of unix time, which is Jan 1st 1970

// console.log(new Date(0)); //Thu Jan 01 1970 05:30:00 GMT+0530 (India Standard Time)

// console.log(new Date(3 * 24 * 60 * 60 * 1000)); //3 days later

// //3 * 24 * 60 * 60 * 1000
// // 259200000 (timestamp of day no 3)

//timestamp is the number of milliseconds that has passed since Jan 1st 1970

//the dates that we have creeated are a special type of objects therefore have their own methods

////////////////////Working with Dates///////////////////////

//methods of Dates

const future = new Date(2037, 10, 19, 15, 23);

console.log(future);

console.log(future.getFullYear()); //2037 (do not use getYear(), use getFullYear() instead)

console.log(future.getMonth()); //10 (0 based)

console.log(future.getDate()); //19

console.log(future.getHours()); //15

console.log(future.getMinutes()); //23

console.log(future.getSeconds()); //0

//we can also get a nicely formatted string (follows some international standard)
console.log(future.toISOString()); //2037-11-19T09:53:00.000Z

//we can also get the timestamp for the date (milliseconds that has passed since Jan 1sr 1970)
console.log(future.getTime()); //2142237180000

//to get the current timestamp
console.log(Date.now()); //gives the current timestamp

//to set versions of the get methods previously seen
future.setFullYear(2040);
console.log(future); //Mon Nov 19 2040 15:23:00 GMT+0530 (India Standard Time)

//similarly we can set Month, Day, Hour, Minute, Seconds..

//////////////////////////////////////////////////////////////////////

///////////////////////////OPERATION WITH DATES///////////////////////

//Days passed between two dates

//whenever we attempt to convert a date to a number, the result is going to be a timestamp (in milliseconds) and we can then perform calculations on these timestamps

const futr = new Date(2037, 10, 19, 15, 23);

console.log(Number(futr)); //converts it into timestamp

console.log(+futr); //converts it into timestamp

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24); //when we date2 - date1, the calculation is done on the timestamps, dates are converted to timestamps when operations are done on them

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));

console.log(days1);

//moment.js is a date library to get precise calculations, e.g.-time changes due to daylight saving changes and other weird edge cases

const days2 = calcDaysPassed(
  new Date(2037, 3, 14, 10, 4),
  new Date(2037, 3, 24, 11, 2)
);

console.log(days2); //10.040277777777778
//we might not want the result of days in decimal, for that we can use Math.round like this :Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24))

////////////////////////////////////////////////////////////////

//////////////////////////INTERNATIONALIZING NUMBERS (INTL)////////////////////////////

//JS has a new internationalization API, that helps us to easily format numbers and strings to different languages, we can make our application support different languages for users around the world.

const num = 3557756.23;

//configuration object
const options = {
  style: 'unit', //it is a unit options:(unit, percent, currency)
  unit: 'mile-per-hour', //setting the unit property, there are several units we can read from the documentation
  // currency:'EUR', //can be used when we use the style as currency, the unit property is ignored
  // useGrouping: false, //the numbers are no more separated by "," or "."
};

console.log('en-US', new Intl.NumberFormat('en-US', options).format(num)); //NumberFormat is used to format the number based on the string argument we pass that has the (language-Country) code

console.log('en-GB:', new Intl.NumberFormat('en-GB', options).format(num));

console.log('ar-SY:', new Intl.NumberFormat('ar-SY', options).format(num));

console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
); //getting the language from the browser

//////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////TIMERS IN JS///////////////////////////////////////////////////////

//setTimeout and setInterval

//setTimeout timer runs just once after a defined time
//setInterval timer keeps running until it is stopped

////////////////////////////////////setTimeout/////////////////////////////////////

setTimeout(() => console.log('Here is your pizza'), 3000); //the first parameter is a callback function, here we are using an arrow function, the second argument is the time in milliseconds after which the setTimeout timer function calls the callback function

//IT IS TO NOTE THE THE CODE EXECUTION DOES NOT STOP ON REACHING THE setTimeout FUNCTION, on reaching the setTimeout function, it calls the setTimeout function and then it registers the timeout function that has to be called after a certain amount of time and then continues to execute the rest of the code, this mechanism is called ASYNCHRONOUS JAVASCRIPT
console.log('Waiting for setTimeout...');

//passing arguments to setTimeout

//since we are not calling the function ourselves we cannot pass the arguments into the parenthesis while calling the function (as we are not calling it in the first place)

//the setTimeout function has a solution for that
//all the arguments that we pass after the delay time (in milliseconds) will be arguments to the function
setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000,
  'olives',
  'corn'
); //ing1 is olives and ing2 is spinach which are passed after the delay time

const ingredients = ['olives', 'spinach'];

//same as the above code
const pizzaTimer = setTimeout(
  //assign the timer to a variable
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000,
  ...ingredients //using the spread operator to spread the elements of the array and get them as arguments to the parameters ing1 and ing2
);

//we can clear the setTimeout using the clearTimeout function

//******************************************************************* */
// The returned timeoutID is a positive integer value which identifies the timer created by the call to setTimeout(). This value can be passed to clearTimeout() to cancel the timeout.

// It is guaranteed that a timeoutID value will never be reused by a subsequent call to setTimeout() or setInterval() on the same object (a window or a worker). However, different objects use separate pools of IDs.

//we can cancel the setTimeout function before the delay time is over
if (ingredients.includes('spinach')) {
  clearTimeout(pizzaTimer);
}

///////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////setInterval////////////////////////////////////////////

//setInterval is just like setTimeout but it keeps on calling the callback function after every delay period

//every second a new date is created and then logged to the console
// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 1000);

//the setInterval function returns an interval ID which uniquely identifies the interval, so you can remove it later by calling clearInterval().

//we else have a function clearInterval just like clearTimeout, to clear the setInterval function

//make a clock using this

////////////////////////////////////////////////////////////////////////////////////////
