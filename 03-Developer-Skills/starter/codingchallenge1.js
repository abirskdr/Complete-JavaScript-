'use strict';

function printForecast(arr) {
  let str = ''; //Empty string declared
  for (let i = 0; i < arr.length; i++) {
    str = str + `...${arr[i]}*C in ${i + 1} Days `; //things get added to the string with every iteration.
  }
  console.log(str);
}
let arr1 = [17, 21, 23];
let arr2 = [12, 5, -5, 0, 4];
printForecast(arr1);
printForecast(arr2);
