'use strict';


const calcAverage = (a1, a2, a3) => ((a1 + a2 + a3) / 3);


function checkWinner(avgDolphins, avgKoalas) {
    if (avgDolphins >= (2 * (avgKoalas))) {
        const win1 = `Dolphins win (${avgDolphins} vs ${avgKoalas})`;
        return win1;
    }
    else if (avgKoalas >= (2 * (avgDolphins))) {
        const win2 = `Koalas wins (${avgKoalas} vs ${avgDolphins})`;
        return win2;
    }
    else {
        return `No one wins`;
    }
}


const avgDolphins = calcAverage(44, 23, 71);
const avgKoalas = calcAverage(65, 54, 49);

console.log(checkWinner(avgDolphins, avgKoalas));

console.log(checkWinner(calcAverage(85, 54, 41), calcAverage(23, 34, 27)));