// Remember, we're gonna use strict mode in all scripts now!
'use strict';

const x = 23;
const abc = 'Julia'; //prettier by default uses double quotes, we make changes to make everything in string to be with single Quotes

const calcAge = birthYear => 2037 - birthYear; // By default in arrow functions prettier uses parenthesis even for single parameter,we change it by using "arrowParens":"avoid"
console.log();

//solving problem

//We work for a company that makes a smart home thermometer.Given the array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error.

//temperature altitude is the highest and the lowest value in the array.

const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

const calcTempAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];
  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};

const amplitude = calcTempAmplitude(temperatures);
console.log(amplitude);

//problem update; problem should take 2 arrays

//merge the two arrays at the beginning  (look for concat in MDN)

const calcTempAmplitudeNew = function (t1, t2) {
  const temps = t1.concat(t2);

  let max = temps[0];
  let min = temps[0];
  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};

const amplitudeNew = calcTempAmplitudeNew([3, 5, 1], [9, 0, 5]);
console.log(amplitudeNew);

//we need to do some measuments in a unit called kelvin

const measureKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'celcius',
    //fix: prompt returns values as strings so in the later part where we add it actually concatenates the string.
    value: Number(prompt('Degrees celsius:')),
  };
  console.log(measurement); //looking for error in the object

  //console.table(measurement);

  console.log(measurement.value); //looking for error
  //console.warm(measurement.value);
  //console.error(measurement.value);

  const kelvin = measurement.value + 273;
  return kelvin;
};
console.log(measureKelvin());
