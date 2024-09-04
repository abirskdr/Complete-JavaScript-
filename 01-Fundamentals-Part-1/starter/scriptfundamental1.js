let js = "amazing";
if (js == "amazing") {
  alert("Javascript is fun");
}

console.log(40 + 8 + 23 - 10);
console.log("Jonas"); //value=Jonas smallest unit of info in js is value
let firstname = "jonas"; //creating variable
console.log(firstname);

true; //automatically a boolean value
console.log(true);

// console.log(javascriptIsFun); //************Javascript programmes are executed top to bottom  so this will not work************
let javascriptIsFun = true;

console.log(typeof true); //boolean
console.log(typeof javascriptIsFun); //boolean
console.log(typeof 23); //number
console.log(typeof "korea"); //String
console.log(typeof jonas); //undefined as variable not declared

///////// dynamic typing//////////

javascriptIsFun = "Yes!"; //string value reassigned

console.log(typeof javascriptIsFun); //String

/////////////undefined////////////

let t;
console.log(t); //undefined when a variable is defined in javascript without assigning a value, it automatically takes undefined
console.log(typeof t); //undefined

t = 1900;
console.log(typeof t); //number

console.log(typeof null); //returns object // bug in javascript , not resolved for legacy issues

// 3 different ways of declaring javascript variables

let age1 = 30;
age1 = 20; // using let can let us reassign the value to the variable

const birthday = 13;
// birthday = 14; //not allowed gives TypeError

// const f;//**************not allowed to declare a variable without assigning any value**************

//OPERATORS

const now = 2037;
const ageJonas = now - 1991;
const ageLogan = now - 2018;
console.log(ageJonas, ageLogan);

const firstName = "Abir";
const lastName = "Sikdar";
console.log(firstName + " " + lastName); //concatenate

let x = 10 + 5;
console.log(x); //first 10+5 is done and then assigned to x

//comparison

console.log(ageJonas > ageLogan); //True

let x1, y1;
x1 = y1 = 25 - 10 - 5; //x=y=10
console.log(x1, y1);

const avgage = ageJonas + ageLogan / 2; // will give wrong calculation as we need to put (ageJonas+ageLogan)
console.log(ageJonas, ageLogan, avgage);

// Strings

const first = "Abir";
const job = "programmer";
const birthYear = 2000;
const year = 2037;

const abir = "I'm" + first + ", a" + (year - birthYear); //need to put that operation in parenthesis, type coercion, convert the number to a string and will work just fine while concatenation

// Template literals (write a string in a more normal way)

const abirNew = `I'm ${first}, a${year - birthYear} year old ${job}`; //I'm Abir, a 37 year old programmer

console.log(`can also use backticks to write strings inside it`);

console.log(
  "Strings with\n\
multiple \n\
lines"
); //use \n\ for writing multiline string the old way

console.log(`new
multiline
string`);

// if else

const age2 = 19;
const isOldEnough = age2 >= 18; //boolean

if (isOldEnough) {
  //if true this gets executed
  console.log(`you can have a driving lisence`);
} else {
  console.log(`you are too young wait another ${18 - age} years`);
}

//TYPE CONVERSION

const inputYear = "1991";
console.log(Number(inputYear)); //Number function converts number to string;
console.log(inputYear + 18);

//TYPE COERCION

console.log(`I'm ` + 23 + ` years old`); // concatenate number is converted to string

console.log("23" - "10" - 3); //strings are converted to numbers (10 printed as number)

console.log("23" + "10" + 3); //numbers are converted to strings string concatenate (23103 printed as string)

let n = "1" + 1; //11 (string concatenation)
n = n - 1;
console.log(n); //10

console.log(3 + 4 + 5 + "9"); //129

//truthy and falsy values
//falsy values in javascript: 0,'', undefined, null, NaN

console.log(Boolean(0)); //falsy,false
console.log(Boolean(undefined)); //falsy,false
console.log(Boolean("Abir")); //all other strings other than empty strings are truthy
console.log(Boolean("")); //falsy,false
console.log(Boolean({})); //object true
console.log(Boolean([])); //array true

//Equality Operators

//== vs ===

let fav = prompt("whats your favorite number?");
console.log(fav);
console.log(typeof fav); //string

//***************in notebook***************

//logical Operators

const hasDriversLicense = true;
const hasGoodVision = true;

console.log(hasDriversLicense && hasGoodVision); //true
console.log(!hasDriversLicense || !hasGoodVision); //false

//Switch case

let ch = "monday;";
switch (ch) {
  case "monday":
    console.log(`waa waa we waa`);
    break;
  case "tuesday":
  case "wednesday":
    console.log("like it!");
    break;
  default:
    console.log(`not your business`);
}

//TERNARY OPERATORS
// ternary operators are expressions and can be used inside template iterals

let age = 25;

let drink = age >= 18 ? `wine` : `water`;

console.log(`I like to drink ${age >= 18 ? `wine` : `water`}`); //template literals

//if - else can not be used inside template literal
