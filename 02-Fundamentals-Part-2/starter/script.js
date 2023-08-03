// //Activating Strict Mode
'use strict';//has to be very first line of code in the script can also be used for a specific function or block

// let hasDriversLisence = false;
// const passTest = true;

// if (passTest) hasDriverLisence = true;//has a bug and that shows in the console, with strict mode
// if (hasDriversLisence) console.log(`I can drive`);

// const interface = 'word';

//Functions


function logger() {
    console.log(`My name is Abir`);

}

//calling/running/invoking function

logger();
logger();


//paratemerised function

function fruitProcessor(apples, oranges) {
    console.log(apples, oranges);
    const juice = `Juice with ${apples} apples and ${oranges} oranges`;
    return juice;//returns when called
}

const liquid = fruitProcessor(3, 4);//returned value saved
console.log(liquid);
console.log(fruitProcessor(3, 4));

// Function Declaration vs.  Function Expression


//function declaration

const age1 = calcAge1(1991);//can be called before function is declared in case of function declaration but it is not the same in function expression
console.log(age1);

function calcAge1(birthyear) {
    return 2037 - birthyear;
}


//Function Expression


const calcAge2 = function (birthyear) {//didnt give a name to the function (also called an anonymous function) so all of these is an expression the expression produces a value and stores it into calcAge2
    return 2037 - birthyear;
}

const age2 = calcAge2(1991);//calling function expression


console.log(age1, age2);


//Arrow Functions (Added to ES6)

const calcAge3 = birthYear => 2037 - birthYear;//easier and faster to write this function expression

const age3 = calcAge3(1991);
console.log(`#${age3}`);

const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2013 - birthYear;
    const retirement = 65 - age;
    //return retirement;
    return `${firstName} retires in ${retirement}`;
}

console.log(yearsUntilRetirement(1980, 'Bob'));

// fundamental difference= arrow functions do not get "this" keyword;



//Functions calling other functions


function cutFruitPieces(fruit) {
    return fruit * 4;
}

function fruitProcessor(apples, oranges) {
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);
    const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
    return juice;//returns when called
}

console.log(fruitProcessor(2, 3));

//DATA STRUCTURES
//ARRAYS 

const friends = ['Michael', 'Stevens', 'Peter'];//literal syntax
console.log(friends);

const years = new Array(1991, 1984, 2004, 2020);//array name years

console.log(friends[0]);
console.log(friends.length);//exact amount of elements in the array

console.log(friends[friends.length - 1]);//inside the brackets for index javascript expects an expression and not a statement

friends[2] = 'Jay';//variable declared with const are immutable but it is the case only for primitive values in the case of an element of an array it is not a primitive value and can be mutated

//friends = ['Bob', 'Farah'];//entire array can not be changed (error assigment to constant variable)

const firstName = 'Abir';
const abir = [firstName, 'Sikdar'];
console.log(abir);


//array exercise

function calcAge(birthyear) {
    return 2037 - birthyear;
}
const y = [1990, 1967, 2002, 2010, 2018];

console.log('#' + calcAge(y));//not a number NaN

console.log(calcAge(y[0]));

//Array Methods

const newLenght = friends.push('Cooper');//adds elements at the end of the array, also returns value of the length of the new array 
console.log(friends);

console.log(newLenght);
friends.unshift('john');//adds in the front of the array and also returns the length of the new array

console.log(friends);

//remove elements
const popped = friends.pop();//removes the last element of the array
console.log(friends);
console.log(popped);

friends.shift();
console.log(friends);

console.log(friends.indexOf("Stevens"));//returns index

//new  ES^ method

console.log(friends.includes("Jay"));//
friends.push(23);
//console.log(friends.includes('23'));//tests with strict equality and does not do type coercion//false
console.log(friends.includes(23));


//Objects (Data Structure)

const paris = {
    //keys   //values
    city: 'Paris',
    country: 'France',
    language: 'French',
    population: 3000000 - 123450,//expression inside object
    casualFriends: ['Mari', 'Duo', 'Paul'],//array inside an object
    bestFriends: ['Silva', 'Xavi', 'Ibrahimovic']

};

//keys are also called properties

console.log(paris);

//Dot vs. Bracket Notation

console.log(paris.population);
console.log(paris['population']);//difference: can put any expression that we like inside the bracket that computes to the key without explicitly writing the string here

const key = 'Friends';

console.log(paris['casual' + key]);
console.log(paris['best' + key]);

//console.log(paris.best+key);gives error, have to use a real property name and not a computed property name

//const enquiry = prompt('What do you want to know about Paris?');

//console.log(paris.enquiry);//undefined (when we try to access property of an object that does not exist)

// SINCE enquiry IS NOT A KEY OR PROPERTY OF THE OBJECT AND THIS IS DOT NOTATION WHICH DOES NOT TAKE EXPRESSIONS, enquiry IS SEARCHED AS KEy, NOT FOUND AND HENCE UNDEFINED IS RETURNED


// console.log(paris[enquiry]);

// if (paris[enquiry]) {
//     console.log(paris[enquiry]);
// }
// else {
//     console.log('look for defined property');
// }

//add properties

paris.monument = 'Eiffel Tower';
paris['people'] = 'busy';

const enquiry = prompt('What do you want to know about Paris?');


console.log(paris[enquiry]);

if (paris[enquiry]) {
    console.log(paris[enquiry]);
}
else {
    console.log('look for defined property');
}


//challenge  print  Paris is the capital of France and has a population of 2876550 and my 6 friends live there including Silva.

console.log(`${paris.city} is the capital of ${paris.country} and has a population of ${paris.population} and my ${paris.casualFriends.length + paris.bestFriends.length} friends live there including ${paris.bestFriends[0]}.`);


//"." member access has higher precedence than "[  ] " computed member access and so using dot notation works over bracket notation if it were written as paris[casualFriends.length]+ paris[bestFriends.length]  it would first calculate ....Friends.length and then search for the key.... same for the paris.bestFriends[0] , first bestFriends array is accessed and then the 0th element is accessed.


//Object Methods

const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    birthYear: 1991,
    job: 'Teacher',
    friends: ['Michael', 'Peter', 'Steven'],
    hasDriversLicense: true,
    calcAgeofJonas: function (birthYear) {  //function expression (function is just a value and can be added to objects, even objects can be added to objects)only  function expression is valid.
        return 2037 - birthYear;
    }
};



const duo = {
    firstName: 'Duo',
    lastName: 'Patrick',
    birthYear: 1994,
    job: 'Receptionist',
    friends: ['Luther', 'Kevin', 'Lola'],
    hasDriversLicense: true,
    calcAgeofDuo: function (birthYear) {
        console.log(this);//"this" keywords points to the object calling it, in this case points to duo and prints the whole object
        return 2037 - this.birthYear;//"this" points to duo so it is same as (duo.birthYear) which is equal to 1994.
    }
};



const niko = {
    firstName: 'Niko',
    lastName: 'Bellic',
    birthYear: 1983,
    job: 'Taxi Driver',
    friends: ['Roman', 'Sal', 'Michael'],
    hasDriversLicense: true,
    calcAgeofNiko: function () {
        this.thenAge = 2037 - this.birthYear;//this keyword can also be used declare new property same as (niko.thenAge)
        return this.thenAge;//returning is not necessary as we will call (niko.thenAge)
    },
    getSummary: function () {
        let canDrive;
        if (this.hasDriversLicense) {
            canDrive = `has`;
        }
        else {
            canDrive = `does not have`;
        }

        this.summary = `${this.firstName} is a  ${this.calcAgeofNiko()} year-old ${this.job}, and he ${canDrive} a driver's license`;
        return this.summary;
    }
};




console.log(jonas.calcAgeofJonas(1991));//dot Notation
console.log(jonas['calcAgeofJonas'](1991));//bracket Notation



console.log(duo.calcAgeofDuo());

niko.calcAgeofNiko();
console.log(niko.thenAge);


//Challenge
//"Niko is a 46-year old teacher, and he has a driver's license"


niko.getSummary();
console.log(niko.summary);


//lOOPS

//continue and break

let numbers = [35, 45, 33, 23, 12, 1, 15, 44, 67, 95];

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] == 44) {
        break;//comes out of the loop if the number is 44.
    }
    else {
        if (numbers[i] % 5 !== 0)
            continue;//skips to the next iteration if the number is not a multiple of 5.
        console.log(numbers[i]);
    }
}

//random number

//a random number between 1 and 99

let n = Math.trunc(Math.random() * 99) + 1;

console.log(n);

















