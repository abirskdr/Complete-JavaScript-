'use strict';

const mark = {
    firstName: 'Mark',
    lastName: 'Miller',
    Weight: 78,
    Height: 1.69,
    calcBMI: function () {
        this.BMI = this.Weight / (this.Height ** 2);
        return this.BMI;
    }
};

const john = {
    firstName: 'John',
    lastName: 'Smith',
    Weight: 92,
    Height: 1.95,
    calcBMI: function () {
        this.BMI = this.Weight / (this.Height ** 2);
        return this.BMI;
    }
};

mark.calcBMI();   // calling the function is important as we wont be able to access the "BMI" property as it is made inside the function calcBMI.
john.calcBMI();

if (mark.BMI > john.BMI) {
    console.log(`${mark.firstName + ' ' + mark.lastName}'s BMI (${mark.BMI}) is higher than ${john.firstName + ' ' + john.lastName}'s BMI (${john.BMI})!`);
}
else {
    console.log(`${john.firstName + ' ' + john.lastName}'s BMI (${john.BMI}) is higher than ${mark.firstName + ' ' + mark.lastName}'s BMI (${mark.BMI})!`);
}
