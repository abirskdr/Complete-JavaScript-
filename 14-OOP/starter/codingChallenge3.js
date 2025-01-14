///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
  console.log(this.make);
};

//prototypes

Car.prototype.accelerate = function () {
  this.speed = this.speed + 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed = this.speed - 5;
  console.log(this.speed);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype); //Car is now the parent class of EV

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

const tesla = new EV('Tesla', 120, 23);

tesla.chargeBattery(90);

console.log(tesla.charge); //90

tesla.brake(); //115

//this overwrites the acceleration method in the Car.prototype when an object of EV calls accelerate() method, this is an example of polymorphism
EV.prototype.accelerate = function () {
  this.speed = this.speed + 20;
  this.charge = this.charge - 1;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

tesla.accelerate(); //Tesla going at 135 km/h, with a charge of 89%
