let markWeight, johnWeight, markHeight, johnHeight;
markWeight = 78;
markHeight = 1.69;
johnWeight = 92;
johnHeight = 1.95;
const BMI1 = (markWeight / (markHeight ** 2));
const BMI2 = (johnWeight / (johnHeight ** 2));
if (BMI1 > BMI2) {
    console.log(`Mark's BMI (${BMI1}) is higher than John's BMI (${BMI2})!`);
}
else {
    console.log(`John's BMI (${BMI2}) is higher than Mark's BMI (${BMI1})!`);
}