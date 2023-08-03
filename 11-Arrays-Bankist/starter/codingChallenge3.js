///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

////////////////////////////////my answer///////////////////////////////

const calcAverageHumanAge2 = function (ages) {
  //human age of dogs
  const avgHumanAge = ages
    .map(cur => (cur <= 2 ? cur * 2 : cur * 4 + 16))
    .filter(cur => cur >= 18)
    .reduce((acc, cur, i) => (i == 0 ? cur : (acc * i + cur) / (i + 1)));

  console.log(avgHumanAge);
};

calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]);

calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]);

///////////////jonas' answer///////////////////

// const calcAverageHumanAge = ages =>
//   ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
// // adults.length

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);
