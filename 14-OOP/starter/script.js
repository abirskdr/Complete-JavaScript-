'use strict';

//In modern JS there are two major paradigms: Object Oriented Programming and Functional Programming

//////////////////////////////////////////////////////////////////////////////////////

////////////////////What is Object-Oriented Programming///////////////////////////////

//it is a programming paradigm (style of the code) that is based on the concept of objects

//************************************************************** */
////////////////////////theory in notes////////////////////////////
//************************************************************** */

/////////////////////////////////////////////////////////////////////////

/////////////////Constructor Functions and the "new" Operator/////////////

//we use constructor function to build an object using function

//a "constructor" function is a completely normal function, the only difference is that we call the constructor function with the "new" keyword

//IN OOP, CONSTRUCTOR FUNCTION ALWAYS STARTS WITH A CAPITAL LETTER (we follow that convention, other built-in constructors like Array, Map, etc also follow that convention)

//we can use function expression and function declaration as function constructor , but we cannot use arrow function it does not have the "this" keyword (we need the "this" keyword here)

const Person = function (
  firstName,
  birthYear //we want the to pass firstName, birthYear to the constructor function
) {
  console.log(this); //empty object (of the type "Person")

  //

  //we know that in the end of the function the object that the "this" keyword is pointing to will basically be returned, so basically whatever we add to that empty object will be returned from the function (object we are trying to build)

  //////////////setting properties to the object//////////////////

  //INSTANCE PROPERTIES (as these will be available on all the instances/ objects that are created through this constructor function)

  this.firstName = firstName;
  this.birthYear = birthYear;

  ///////////////////////methods////////////////////////

  //it is a bad practice to create methods inside of a constructor function

  //if we want to create a large number of objects/ instances of this constructor function, we would end up creating a large number of copies of the methods inside the constructor function

  // this.calcAge = function () {
  //   console.log(2037 - this.bitrhYear);
  // };

  //to solve this problem, we use prototypes and prototypal inheritance
};

///////////when we call the function using the "new" Operator/////////

//1. An empty object ({}) is created

//2. Function is called, the "this" keyword is set to the newly created object (in the execution context of the "Person" function, the "this" keyword will point to the new object created in step 1)

//3. This newly created object is linked to a prototype (using the "__proto__" property that is created on the object)

//4. *****The constructor function automatically returns the object created in the beginning*****

//////////////////////////////////////////////////////////////////////

//we call the constructor function "Person" using the "new" keyword

const jonas = new Person('Jonas', 1991);

console.log(jonas); //Person {firstName: 'Jonas', birthYear: 1991}

// we can use this constructor function to create as many objects as we want

const matilda = new Person('Matilda', 2017);

console.log(matilda); //Person {firstName: 'Matilda', birthYear: 2017}

//objects created from "classical classes" are called "instance" of that class

//JS does not really have classes

//here we have created objects using a constructor function and a class, Constructor functions have been used in JS since the beginning to simulate classes

//so we can still say "jonas" and "matilda" are "instances" of the constructor function "Person"

/////////////operator we can use to test for that/////////////

//"instanceof" can be used to check if the object is an instance of a constructor function

console.log(jonas instanceof Person); //true

const jay = 'Jay';

console.log(jay instanceof Person); //false as 'jay' was not created using the constructor function "Person"

//*********************************************** */
//Function constructors are not a feature of the JS, it is a pattern that has been developed by other developer and now everyone uses this

//////////////////////////////////////////////////////////////////////

////////////////////////////Prototypes////////////////////////////////

//*****************************************************************
//each and every function in JS automatically has a property called "prototype", that includes constructor function
//*****************************************************************

//every object created using a constructor function will have access to all the methods and properties that we define in the prototype property of the constructor function, in our case:  Person.prototype

console.log(Person.prototype); // we see the calAge object there

Person.prototype.calcAge = function () {
  console.log(this); //object that is calling the method
  console.log(2037 - this.birthYear);
};

jonas.calcAge(); //46

//we can now use the calcAge method on the objects created using the Person constructor function, even though it was not in the object itself

//objects have access to calcAge due to "prototypal inheritance"

//now only one copy of the calcAge function exists, all the objects created using the "Person" constructor function can reuse the calcAge function on themselves, so the "this" keyword is set to the object that is calling the method

//ANY OBJECT ALWAYS HAS ACCESS TO THE METHODS AND PROPERTIES FROM ITS PROTOTYPE

//each object has a special property called "__proto__"

//we can confirm that using "__proto__"

//the "__proto__" property is created at the 3rd step of using the "new" operator, it links the empty new object to the "__proto__" property, and then sets its value to the prototype property of the function that is being called (sets the "__proto__" property of the object to the prototype property of the constructor function) this is how JS knows internally that the "jonas" object is connected to the Person.prototype

//we can check the "jonas" object to find that it has the "__proto__" property

console.log(jonas.__proto__); //prototype property of the constructor function "Person"

console.log(jonas);

//************************************************************** */
//jonas object's prototype is the prototype property of the Person constructor function
//************************************************************** */

console.log(jonas.__proto__ === Person.prototype); //true

//Person.prototype is not the prototype of Person constructor function, *****it is used as the prototype of all the objects that are created using the Person constructor function*****

//we can also use "isPrototypeOf" to check if an object has the prototype that we are calling this method on (here: Person.prototype) as its prototype

console.log(Person.prototype.isPrototypeOf(jonas)); //true

console.log(Person.prototype.isPrototypeOf(Person)); //false

///////////////////we can also set properties on prototypes///////////////

Person.prototype.species = 'Homo Sapiens';

console.log(jonas.species); //Homo Sapiens

//when we see the "jonas" object, we see that "species" property is not really directly in the object, it is not its own peoperty, OWN PROPERTIES ARE ONLY THE ONES THAT ARE DECLARED DIRECTLY IN THE OBJECT ITSELF, not including the inherited property

//checking own property

console.log(jonas.hasOwnProperty('firstName')); //true

console.log(jonas.hasOwnProperty('species')); //false

console.log(jonas);

/////////////////////////////////////////////////////////////////////////

/////////////////Prototypal Inheritance on Built-In Objects//////////////

//prototype of ("jonas" object's prototype)

console.log(jonas.__proto__.__proto__); //prototype property of the built-in constructor function "Object()"

console.log(jonas.hasOwnProperty('firstName')); //this works as "hasOwnProperty"  is in the prototype of ("jonas" object's prototype's prototype) i.e. "Object()"

console.log(jonas.__proto__.__proto__.__proto__); //null as we have reached the top of the prototype chain

console.log(Person.prototype.constructor); //".constructor" property points back to the constructor function (Person) itself

//******************my test*********************
// console.log(Person.__proto__); //native code

// console.log(Person.constructor);//native code
//***********************************************

//////////////////////prototype of a function//////////////////////////

//any function is also an object, every object has a prototype

console.dir(x => x + 1); //anonymous() , function is also an object and so it will also have a prototype, this is just any function, and as this is a function, it inherits all the function methods, i.e. we can see all the function methods in its prototype

/////////////////////prototype of array////////////////////////////////

const arr = [3, 6, 4, 5, 6, 9, 3];

console.log(arr); //we see [[Prototype]] at the end (shows __proto__ in jonas' lecture)

console.log(arr.__proto__); //we get all the methods for an array, each array does not contain these methods but inherit them

console.log(arr.__proto__ === Array.prototype); //true

//****************************************************************
//so because of the above line, const arr=[] is same as using new Array
//****************************************************************

console.log(arr.__proto__.__proto__); //object.prototype as arr.__proto__ / Array.prototype is also an object

//how any array method is defined in JS
//Array.prototype.filter()

//If we want to create our own Array method, that all the arrays inherit

//our own Array method that returns an array with just the unique values
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };

// console.log(arr.unique());

//extending the prototype of a built-in object is not a good practice
//one of the reasons is that the next version of JS might have a method/property the same name as of the method/property that we declare by ourselves in the prototype of that built-in object, then that new method will be used which can have a different functionality
//also not a good practice when working in a team

////////////////////prototypes and the DOM tree//////////////////////////

const h1 = document.querySelector('h1');

console.log(h1.__proto__); //HTMLHeadingElement

console.log(h1.__proto__.__proto__); //HTMLElement

console.log(h1.__proto__.__proto__.__proto__); //element

console.log(h1.__proto__.__proto__.__proto__.__proto__); //node

console.log(h1.__proto__.__proto__.__proto__.__proto__.__proto__); //EventTarget

console.log(h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__); //Object.prototype

/////////////////////////////////////////////////////////////////////////

////////////////////////////ES6 Classes//////////////////////////////////

//allows us to do the exact same thing but with a nicer syntax

//the goal of adding classes to JS was to make more sense to people coming from different languages

//just like functions we have:

//////////class expression//////////
// const PersonCl = class {};

/////////class declaration//////////
// class PersonCl {}

//this is because classes are a special type of functions in JS

class PersonCl {
  //a method of this class, similar to a constructor function, whenever we create a new object of this class, this constructor is called

  //needs to be called constructor
  constructor(firstName, birthYear) {
    //the "this" keyword points to the object that is created using the PersonCl
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  //methods / properties can be written inside of the class (but these methods will not be in the object but will be in the prototype of the class)

  //methods / properties outside of the constructor function is added to the prototype property of the class, (prototype of the objects)

  //AND SO THESE METHODS ARE CALLED INSTANCE METHODS/ INSTANCE PROPERTIES
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  //there are no commas between methods, prototypes inside of the class
  // greet() {
  //   console.log(`Hey ${this.firstName}`);
  // }
}

//when we create a new instance of the class PersonCl the constructor() inside of the class is called and then everything goes as similar to calling the constructor function, *****it is as if we call the class as the constructor function, but it is the cosntructor() inside of the class that works as the constructor function,*****  methods / properties inside of the constructor() is added to the object
const jessica = new PersonCl('Jessica', 1996);

console.log(jessica);

//calling the calcAge prototype function
jessica.calcAge(); //41

//the "__proto__" of the object jessica is linked to PersonCl.prototype
console.log(jessica.__proto__ === PersonCl.prototype); //true

//we can also add a method / property manually to the PersonCl class prototype property
PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
};

jessica.greet(); //Hey Jessica

/////////////////////IMPORTANT NOTES ON CLASSES//////////////////////

//classes are NOT hoisted (cannot be used before they are declared in the code)

//just like functions, classes are also first-class citizens (we can pass them into functions and return from functions)

//**************************************************************
//If any programming language has the ability to treat functions as values, to pass them as arguments and to return a function from another function then it is said that programming language has First Class Functions and the functions are called as First Class Citizens in that programming language.
//**************************************************************

//classes are executed in strict mode (even if we did not activate strict mode for the entire script, all the code in the class will be executed in strict mode)

/////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////

////////////////////////Setters and Getters//////////////////////////////

//getters and setters are a feature that is common for all objects in JS

//setter and getter properties are called as "accessor properties"

//while the other normal properties are called as "data properties"

//Getters and Setters are functions that can be used to get or set values, but on the outside they still look like regular properties

///////////////////////object literal/////////////////////////
const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],

  //it is not mandatory to have both getters and setters in a class together

  //getter "get"
  get latest() {
    return this.movements.slice(-1).pop();
  },

  //setter "set"
  set latest(mov) {
    //any setter method will have exactly one parameter (since, we can set only one value using the "=")
    this.movements.push(mov);
  },
};

console.log(account.latest); //we dont call it like a method but write it like a property

//if latest was a regular method and not a setter
// account.latest(50);

//setters are also like regular parameters
account.latest = 50;

//classes also has getters and setters and they also work the same way

/////////////////////////////class///////////////////////////////

class PersonClass {
  constructor(fullName, birthYear) {
    //***********************************
    //"this" points to the object calling the class, this.fullname is (e.g.- jonas.fullname) where fullname is the "setter", and not just a property(variable) anymore that we are making equal to fullName (right side of "=", that we pass to the class and gets passed to the constructor)
    this.fullName = fullName;
    //***********************************
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  //getter
  get age() {
    return 2037 - this.birthYear;
  }

  //getters and setters are very useful for data validation

  //setter with a validation property

  //we are here creating setter for a property name that already exists "fullName" and so whenever we set the fullName on the "this" keyword, (each time "this.fullName = fullName;" is executed in the constructor()) the setter is going to be executed, and then the fullName will be passed as an argument to this setter.
  set fullName(name) {
    // console.log(name);

    //*******************************************************
    // if (name.includes(' ')) this.fullName = name; //recursion call that has no end (no corner case), so the call stack size exceeds (this.fullname calls the setter function again, and passes the name as the argument)
    //*******************************************************
    // this line gives a cryptic error "Maximum call stack size exceeded" as there is a conflict as both the constructor and the setter are trying to set the exact same property name, what we do is create a new property (variable) name using "_" before the fullName as "_fullName" (this is a convention and not a JS feature, "_fullName" is a different variable name to avoid naming conflict)

    if (name.includes(' ')) this._fullName = name;
    //but after using a new variable, the property that has the full name is "_fullName",  jessica.fullName is "undeifined" as it has nothing, so we make a getter for the fullname property to return the "_fullName"
    else alert(`${name} is not a full name`);
  }

  //getter
  get fullName() {
    return this._fullName;
  }
}

const jess = new PersonClass('Jess Wittek', 1996);

//using the getter "age"
console.log(jess.age);

//getter is just like any other regular method that we set on the prototype property of the class, it will also look like a property in the prototype porperty of the class while we have it as a method as well

console.log(jess); //  PersonClass {first....}
//                  .  [[Prototype]]
//                         age: (...), {has dots as it will only be calculated once we click on the dots} [as a property]
//                       get age: ƒ age() [as a method]

//getters and setters are very useful for data validation

console.log(jess.fullName); //fullName is not the property but the getter
//returns the value in the property "_fullName", as we have setter with the name fullName for name validation and save the name in "_fullName" and getter with the name fullName to get the value in the "_fullName"

/////////////////////////////////////////////////////////////////////////

////////////////////////static methods///////////////////////////////////

//the "from" method, that converts any array like structure to a real array
console.log(Array.from(document.querySelectorAll('h1'))); //querySelectorAll returns a nodeList and from converts it to an array

//*****************************************************************
//the "from" method attached to the "Array constructor" and not to the prototype property of the "Array constructor"
//*****************************************************************

//so we cannot use the "from" method on any array
//all the arrays do not inherit "from" method, as it is not on their prototype

// console.log([1, 2, 3].from()); //is not a function

//therefore Array.from() where "from()" is a simple function that is attached to the "Array constructor", so that the developers know that it is related to arrays
//WE ALSO SAY THAT "from" METHOD IS IN THE ARRAY NAMESPACE

//from() is a static method in the Array constructor

//Number.parseFloat(12);//"parseFloat" is another static method in the "Number constructor"

//"parseFloat" is not available to numbers but only on the "Number constructor"

//////writing a static method for the "Person constructor" function///////

//static method
Person.hey = function () {
  console.log('Hey there');
  console.log(this); //the entire constructor function (because the constructor function is the object that is calling this method)
};

//hey is a static method in the Person constructor

Person.hey(); //hey there

//we cannot call hey() method on an object of the Person consturctor as the object does not inherit it in its prototype

/////////////////static method in a class//////////////////////////////

class DemoClass {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  //Instance methods (as these methods will be added to the prototype of the objects / instances)
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  //getter
  get age() {
    return 2037 - this.birthYear;
  }

  ///////////////////////////////////

  //////////Static method////////////

  static hey() {
    console.log('Hey there');
    console.log(this); //"this" keyword points to the entire class
  }
  //////////////////////////////////
}

DemoClass.hey();

const obj = new DemoClass('demo', 1990);

// obj.hey(); //is not a function

//these static methods are not available to instances and sometimes they are still useful to implement some kind of helper function about a class or about a constructor function

/////////////////////////////////////////////////////////////////////////

/////////////////////////Object.create()/////////////////////////////////

//works is a different way than the constructor functions or the classes

//there is still the idea of prototypal inheritance, however there are no "prototype properties" involved and also no "constructor functions" and no "new" operator

//instead we use object.create to manually set the prototype of an object to any other object that we want

const PersonProto = {
  //this object will be the prototype of all the objects we use "Object.create(PersonProto)" on
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  //we declare a method to set properties to the object

  //WE CAN HAVE A METHOD LIKE THIS IN ANY OTHER OBJECT LITERAL, this is made to make setting properties of objects more programatic

  //looks like the constructor function / constructor(), but has nothing to do with the constructor function / constructor() as we are not using the "new" operator to call this
  init(firstName, birthYear) {
    console.log(this); //here the "this" keyword also points to the object we use to call this function

    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

//creating an object using the "PersonProto" as the prototype

const steven = Object.create(PersonProto); //we pass the object inside of the Object.create() we want to be the prototype of the new object

//what we are doing here is linking the "__proto__" of steven to prototype property of PersonProto

//****************************************************************** */
//" Object.create(PersonProto)" returns a brand new object that will be linked to the prototype we passed inside of the Object.create
//****************************************************************** */

//the linkage of the newly created object to the Object we want to make it as its prototype happens through (".__proto__")

console.log(steven); //an empty object at this moment, but we have the prototype and have the method calcAge in it

//properties on the object
steven.name = 'Steven';

steven.birthYear = 2002;

steven.calcAge(); //works, 35

//************************************************************ */
//working explained in notes
//************************************************************ */

console.log(steven.__proto__); //PersonProto

console.log(steven.__proto__ === PersonProto); //true

const sarah = Object.create(PersonProto);

//init() and calcAge() both are in the prototype of the sarah object and steven object and so we can call these methods on sarah and steven
sarah.init('Sarah', 1979);
sarah.calcAge();

//WE USE Object.create() IN INHERITANCE BETWEEN CLASSES ("Constructor functions")

/////////////////////////////////////////////////////////////////////////

//////////Inheritance between 'CLASSES': Constructor Functions///////////

//we use the word "class" to make it easier to understand, we know that there is nothing like the classes as we see in classical OOP, in JS

//in "real inheritance",  where one class "child" inherits from another class "Parent". Unlike in prototype inheritance, where objects inherit properties and methods from its prototype

//we have specific properties / methods for the child class, the child class also inherits properties and methods from its parent class

////////Parent "class"////////

//we will use the "Person" constructor function that is declared in the line 27, as the parent "class" / constructor function

//it has the "calcAge" method in its prototype property

//////////////////////////////

////////child "class"/////////

const Student = function (firstName, birthYear, course) {
  //this part of the code is a copy of the "Person" function constructor, its parent class

  //2 reasons we should avoid this:
  //1.to make the code more DRY
  //2.if the implementation of Person, that change will not be reflected in the Student
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  //////////////////////////////

  //what if we call the person as a function

  // Person(firstName, birthYear); //we are now calling the function constructor function as a regular function, and so therefore as this is a regular function call, the "this" keyword is set to "undefined" in a regular function call,so we get the error Cannot set properties of undefined (setting 'firstName')

  //so we need to manually set the "this" keyword

  //to do this we use the "call" method, where the first argument is set as the "this" keyword to the function we are calling, and the other arguments passed except the first argument is passed to the function in the same order
  Person.call(this, firstName, birthYear); //"this" here is the new object of the Student constructor function, it is that new empty object (in the beginning) where we want to set the firstName and birthYear property

  this.course = course; // additional property in student compared to "Person"
};

//we want Student class to be the child class and the Person class to be the parent class

//what we want to do is to link the "__proto__" of the prototype property of the Student(Student.prototype) to the prototype property of Person (i.e.- Person.prototype),[look in notes for details] we create this link manually using Object.create()

//******************************************* */
//we do this exactly at this point of the code, we create the connection here before we add anymore methods / properties to the prototype property of Student, as Object.create() will return an empty object and at this moment, Student.prototype is empty, and onto that empty object, we can then add method, if we had already added methods, Object.create()'s returned empty object will overwrite the already added methods

Student.prototype = Object.create(Person.prototype); //we pass the object inside of the Object.create() we want want to link the "_proto__" of the Student.prototype with.

//************************************************
//when we do this we make the "__proto__" property of the Student.prototype point to the Person.prototype
//************************************************

//****************************** */
//why do we need Object.create()

// Student.prototype = Person.prototype; //this does not work at all, as this does not create prototype chain, rather it makes the prototype property of Student as the Person.prototype, objects of Student have Person.prototype as their prototype

// Student.__proto__ = Person.prototype; //this also does not work

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');

console.log(mike);
mike.introduce();

mike.calcAge(); //this now works, even though calcAge is not in its (mike's) __proto__, i.e. in the Student.prototype, but as we have inherited the prototype property of the Person class to the Student class, Person.prototype is now in the prototype chain and calcAge() is present in the Person.prototype

//////////////the whole prototype chain now///////////////

console.log(mike); //we see the [[Prototype]] (.__proto__) as Person which is not correct, it should be Student

//[[Prototype]]: Person, introduce() is in the prototype, calcAge() is in the prototype of the prototype

console.log(mike.__proto__); //Person

console.log(mike.__proto__ === Student.prototype); //true here

console.dir(Student.prototype.constructor); //ideally should point back to the Student constructor function but points to the Person constructor function

//JS now thinks that the constructor of Student.prototype is Person, and the reason for that is that we set the prototype property of Student using Object.create(), constructor of Student.prototype is still Person

//sometimes its important to rely on this constructor property

////////////////we fix this//////////////

Student.prototype.constructor = Student;

console.log(Student.prototype.constructor); //now points to Student

/////////////////////////////////////////

console.log(mike instanceof Student); //true
console.log(mike instanceof Person); //true (we linked the prototypes together using the Object .create, so it is in its prototype chain)
console.log(mike instanceof Object); //true (Object is also in its prototype chain)

console.log(mike.__proto__.__proto__); //Person.prototype

console.log(mike.__proto__.__proto__.__proto__); //Object.prototype

console.log(mike.__proto__.__proto__.__proto__.__proto__); //null

/////////////////////////////////////////////////////////////////////////

///////////////////Inheritance between 'CLASSES':ES6 CLASSES/////////////

//We want the PersonClass class (in the line 363)  as the "parent" class and the "StudentClass" class as the "child" class

//we need two things to implement inheritance between classes, the "extends" keyword and the "super" function

class StudentClass extends PersonClass {
  //extends links the prototypes behing the scenes, PersonClass becomes the parent class

  // //*****************************************
  // //In a case where we do not need the constructor() (although we can still have the constructor() and the super() inside of it), the code will still work and the super() would be called  automatically without us calling it, and it will be called with the arguments(as many as it's  parent class' constructor() takes) passed while making the object of this class

  // super(fullName,birthYear); //no need of writing this line of code as it is automatically called, just comment the while constructor() to check
  // //*****************************************

  constructor(fullName, birthYear, course) {
    //course is an extra argument that was not in the ParentClass class constructor()
    //we do not need to manually call the "PersonClass.call(this,firstName,birthYear)"", we can do the same using the super function
    //***************************************** */
    //ALWAYS NEEDS TO HAPPEN FIRST
    //this call to the super function always needs to happen first, as this call to the super function is responsible for creating/initializing the "this" keyword in this sub-class
    super(fullName, birthYear); //"super" is basically the constructor() of the parent class, we dont need to specify the name of the parent class again as we did that already
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  //overwriting the calcAge() method for the StudentClass objects
  calcAge() {
    console.log(
      `I am ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

//*************************************************
//if we didn't have/(want to set) a third parameter (here: "course") we would not even need a constructor(), inside of the StudentClass  at all, in that case the super() will be called automatically [shown in line 690]
//*************************************************

// const martha = new StudentClass('Martha Jones', 2012);
// console.log(martha); //StudentClass {_fullName: 'Martha Jones', birthYear: 2012} (notice the "_fullName", in the class PersonClass, the fullName is stored in _fullName )

//this also works without the constructor(), the super() is called, fullName and birthYear are set but course is not set in that case
const martha = new StudentClass('Martha Jones', 2012, 'Computer Science');
console.log(martha); //StudentClass {_fullName: 'Martha Jones', birthYear: 2012, course: 'Computer Science'}(notice the "_fullName", in the class PersonClass, the fullName is stored in _fullName )

//introduce() method is in the StudentClass.prototype
martha.introduce(); //My name is Martha Jones and I study Computer Science

//calcAge() method is in the PersonClass.prototype that is inherited by the StudentClass.prototype
// martha.calcAge(); //25

//calcAge() when overridden in the StudentClass class
martha.calcAge(); // I am 25 years old, but as a student I feel more like 35

///////////////////prototype chain/////////////////////

console.log(martha.__proto__); //PersonClass {constructor: ƒ, introduce: ƒ}, in the prototype we have the introduce()

console.log(martha.__proto__ === StudentClass.prototype); //true here

console.dir(StudentClass.prototype.constructor); //class StudentClass (correct)

console.log(martha instanceof StudentClass); //true
console.log(martha instanceof PersonClass); //true (the prototypes got linked together automatically by extends, so it is in its prototype chain)
console.log(martha instanceof Object); //true (Object is also in its prototype chain)

//this link proves us that the prototype properties of the StudentClass and ParentClass were linked by the "extends" keyword

console.log(martha.__proto__.__proto__); //(PersonClass) here we have the calcAge(), setters, getters, etc

console.log(martha.__proto__.__proto__.__proto__); //Object.prototype

console.log(martha.__proto__.__proto__.__proto__.__proto__); //null

/////////////////////////////////////////////////////////////////////////

//////////////////Inheritance between 'CLASSES': Object.create///////////

//we use the "PersonProto" as the parent prototype and "studentProto" as the child prorotype, we want StudentProto to inherit directly form PersonProto

//We do this first
const StudentProto = Object.create(PersonProto); //we make the PersonProto as the prototype of StudentProto

console.log(StudentProto); //for now an empty object, whose "_proto__" points to PersonProto

// //*******************my testings***********************
console.log(StudentProto.prototype); //undefined

console.log(StudentProto.__proto__); //PersonProto, this shows that the "__proto__" property of the StudentProto is linked to the PersonProto making PersonProto as the prototype of StudentProto
// //*****************************************************

StudentProto.init = function (firstName, birthYear, course) {
  //
  //we can use the init() form the PersonProto
  PersonProto.init.call(this, firstName, birthYear); //we want to set the "this" keyword to the object of StudentProto calling init()

  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jaya = Object.create(StudentProto); //StudentProto is  now the prototype of jaya

//jaya objects will be able to use all the methods that are contained in the "StudentProto" and "PersonProto"

jaya.init('Jaya', 2010, 'Computer Science'); //works as expected

jaya.introduce(); //My name is Jaya and I study Computer Science

jaya.calcAge(); //27, calcAge() is in the prototype chain in the PersonProto

////////////////////Prototype chain/////////////////////

console.log(jaya);

console.log(jaya.__proto__); //StudentProto

console.log(jaya.__proto__.__proto__); //PersonProto

console.log(jaya.__proto__.__proto__.__proto__); //Object.Prototype

console.log(jaya.__proto__.__proto__.__proto__.__proto__); //null

////////////////////////////////////////////////////////

//check the below lines
//in the above technique, we are not faking classes, we are simply linking objects together, where some objects serve as the prototype of other objects

/////////////////////////////////////////////////////////////////////////

///////////////////////ANOTHER CLASS EXAMPLE/////////////////////////////

//we make the account objects we made in Bankist App programatically

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = []; //movements property, not based on any inputs initially
    this.locale = navigator.language; //locale property to get the local language

    //we can execute any code inside of the constructor()
    console.log(`Thanks for opening an account, ${owner}`);
  }

  //we built methods to interact with properties, these methods are PUBLIC INTERFACES to the objects and are also called API

  //methods for deposits and withdraws
  deposit(val) {
    this.movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val); //we can call other methods from inside of a method (abstracts the fact that a withdrawl is a negative movement {acc1.movements.push(-140)}, "-" here is something the user of this object should not be caring about)
  }

  //we do not want user to access approveLoan method
  approveLoan(val) {
    return true;
  }

  //we want user to use this method only for loan
  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log('Loan Approved');
    }
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

console.log(acc1);

//not a good idea to interact with properties like this
// //deposit
// acc1.movements.push(250);

// //withdraw
// acc1.movements.push(-140);

//its a lot better to create methods to interact with properties

//to deposit
acc1.deposit(250);

///to withdraw
acc1.withdraw(140);

//now  we are actually using the public interface (deposit and withdraw) that we built, these methods are the interface to the objects, and are also called API

//still theres is nothing stopping a user accessing the properties like movements, pins (pins should not be accessible from outside of the class), directly and introducing bugs

//WE NEED DATA ENCAPSULATION AND DATA PRIVACY as we no not want user to access certain properties and methods

////////////////////////ENCAPSULATION///////////////////////////////////

// //Encapsulation means we want certain properties and methods private inside the class so that they are not accessible outside of the class, then the rest of the methods are basically exposed as a public interface (API)

// //2 big reasons why we need DATA ENCAPSULATION and PRIVACY

// //1. To prevent code from outside of a class to accidentally manipulate data that is inside of a class

// //2. When we expose only a small interface (a small API consisting only a few public methods, then we can change all the other internal methods with more confidence), as we can be sure that external code will not rely on these private methods, and therefore code will not break when we do internal changes

// //JS classes do not yet support real data privacy and data encapsulation, there is a proposal to add truly private class fields and methods to the language, but its not completely ready yet

// //we fake encapsulation by using convension ("_" in front of methods and properties )

// class AccountTest {
//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     //PROTECTED PROPERTY
//     // (since it is not truly private, it is just a convention, something that developers agree to use and keep it in mind not to access from outside of the class)
//     this._pin = pin; //we cannot access using (testCus.pin)
//     this._movements = []; //we cannot access using (testCus.movements)
//     /////////////////////
//     this.locale = navigator.laguages;

//     console.log(`Thanks for opening an account, ${owner}`);
//   }

//   //giving access to the user to view the movements, but the movements cannot be manipulated or overwritten
//   getMovements() {
//     console.log(this._movements);
//   }

//   deposit(val) {
//     this._movements.push(val);
//   }

//   withdraw(val) {
//     this.deposit(-val);
//   }

//   //we do not want user to access "_approveLoan" method
//   _approveLoan(val) {
//     //cannot access using "testCus.approveLoan()"
//     return true;
//   }

//   //we want user to use this method only for loan
//   requestLoan(val) {
//     if (this._approveLoan(val)) {
//       this.deposit(val);
//       console.log('Loan Approved');
//     }
//   }
// }

// const testCus = new AccountTest('Jonas', 'EUR', 1111);

// testCus.deposit(100);

// console.log(testCus.movements); //undefined
// //we cannot use (testCus.movements) to access the movements as we use "_movements" inside of the class to store the movements

// //*******************************************************
// //we can still access it using (testCus._movements), but now it is known that "_movements" is used inside of the class and not supposed to be touched outside of the class
// // console.log(testCus._movements);
// //*******************************************************

// //we can use the getMovements() to view the movements
// testCus.getMovements(); //100

// // testCus.approveLoan(); //testCus.approveLoan is not a function

// //***********************************************
// //we can access it by using _approveLoan()
// console.log(testCus._approveLoan());
// //***********************************************

////////////////////////////////////////////////////////////////////////

/////////////////////PRIVATE CLASS FIELDS AND METHODS///////////////////

//private class fields and methods are a part of a bigger proposal of "class fields" (that aims at improving and changing JS classes)

//"class fields" proposal is currently at STAGE 3, not yet part of the JS language, however, being at STAGE 3, means it will at some point in the future move forward to STAGE 4 and then be a part of JS.

//some parts of this proposal already work in google chrome, other parts dont
//in traditional OOP languages like Java, C++, properties are usually called "fields", so with this new proposal, JS is moving away from he idea that classes are just syntactic sugar over constructor function, with these new class features, classes actually start to have abilities that we did not previously have with constructor function

//In this proposal, there are 8 different kinds of fields and methods

//in this lecture we will focus on 4 of them
//1.Public fields
//2.Public methods
//3.Private fields
//4.Private methods
// we also have the static versions of the above methods

//we can think of a field as a property

class AccountTest {
  //The fields that we are adding are on the objects / instances and not on the prototypes, these fields are also referenceable by the "this" keyword

  //1) PUBLIC FIELDS (property that will be present on every instance / object, that we are creating through the class, also called Public Instance Field )

  //syntax for a Public Field: we need a ";" at the end and we do not need to declare it
  locale = navigator.language;

  //2) PRIVATE FIELDS  (these preperties are really truly private not accessible from the outside)
  //syntax for a Private Field: we need a ";" at the end and we do not need to declare it, "#" in front of the property, that makes it a private field, we now have the name of the property / field as "#variable"
  #movements = [];
  #pin; //not set to anything (in the beginning it is set to "undefined")

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;

    // this._pin = pin;
    //we want to convert "pin" it to a truly private field, but it is a little different as we are setting the pin to the value we pass to the constructor in the constructor, however we can not define a field inside of the constructor, they have to be out, outside of any method

    //reassigned down here
    this.#pin = pin;

    //having these above is exactly same as having it here when it comes to adding it to objects
    // this._movements = [];
    // this.locale = navigator.laguages;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // PUBLIC METHODS (all these methods are public methods, all of these methods become the public interface of the class)
  //we can still use this method to get the movements even though it is a private field now, we cannot manipulate it though
  getMovements() {
    console.log(this.#movements);
  }

  deposit(val) {
    this.#movements.push(val);
    return this; //returning "this" returns the current object, on which we can call the next method if we are chaining methods
  }

  withdraw(val) {
    this.deposit(-val);
    return this; //returning "this" returns the current object, on which we can call the next method if we are chaining methods
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log('Loan Approved');
      return this; //returning "this" returns the current object, on which we can call the next method if we are chaining methods
    }
  }

  //PRIVATE METHODS (very useful to hide the implementation details from outside)

  //to make method private we hase the same syntax as making a field private, adding a "#" in front of method name
  #approveLoan(val) {
    //google chrome till now treats this method not as a private method but as a private field, so it can be seen in the instance of the class and not in the prototype
    return true;
  }

  //STATIC PUBLIC METHOD (we have already used it)

  //these "static" methods will not be available on the instances / objects but on the class itself
  static helper() {
    console.log('Helper');
  }
}

const testCus = new AccountTest('Jonas', 'EUR', 1111);

// console.log(testCus.#movements); //cannot access this private field (property) from outside
//error:Private field '#movements' must be declared in an enclosing class

// console.log(testCus.#pin); //cannot access this private field (property) from outside
//Private field '#pin' must be declared in an enclosing class

testCus.deposit(100);
testCus.getMovements(); //[100]

//**************************************
//checking if we can access it from outside
//chrome currently sees this as a private field and not as a private method
// console.log(testCus.#approveLoan(100));//Private field '#approveLoan' must be declared in an enclosing class
//**************************************

//calling the "static" Public method
AccountTest.helper(); //Helper

//other three static methods and fields are not that important

////////////////////////////////////////////////////////////////////////

////////////////////////Chaining Methods////////////////////////////////

//we can also chain class methods, given that each time, we are returned the object an object each time, so that we can attach another method on that object

//*********************************************
//BEFORE WE MADE CHANGES AND RETURNED "this", THESE METHODS RETURNED NOTHING (undefined)
//gives an error
// testCus
//   .deposit(300)
//   .deposit(500)
//   .withdraw(35)
//   .requestLoan(25000)
//   .withdraw(4000);
//as the deposit method in the beginning of the chain deposit nothing (undefined), and so we are trying to call deposit method on undefined
//*********************************************

//to make this work we can return the current object  (or object we wish to return) in the method, so that the next method is called on the current object (object we returned)

//now this works
testCus
  .deposit(300)
  .deposit(500)
  .withdraw(35)
  .requestLoan(25000)
  .withdraw(4000);

testCus.getMovements(); //shows that it works

//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
