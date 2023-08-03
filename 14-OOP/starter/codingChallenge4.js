///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  acclerate() {
    this.speed = this.speed + 10;
    console.log(this.speed);
    return this; //this returns the current object and makes chaining of methods possible
  }
  brake() {
    this.speed = this.speed - 5;
    console.log(this.speed);
    return this; //this returns the current object and makes chaining of methods possible
  }
}

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
  showCharge() {
    return this.#charge;
  }
}

const rivian = new EVCl('Rivian', 120, 20);
rivian.chargeBattery(90);
console.log(rivian.showCharge());

rivian.acclerate().brake();
console.log(rivian); //EVCl {make: 'Rivian', speed: 125, #charge: 90}
