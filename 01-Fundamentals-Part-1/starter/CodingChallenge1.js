let markWeight, johnWeight, markHeight, johnHeight;
markWeight = 78;
markHeight = 1.69;
johnWeight = 92;
johnHeight = 1.95;
const BMI1 = (markWeight / (markHeight ** 2));
const BMI2 = (johnWeight / (johnHeight ** 2));
let markHigherBMI = (BMI1 > BMI2);
console.log(markHigherBMI);
