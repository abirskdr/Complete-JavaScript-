function calcTip(bills, tips, total) {
    if (bills >= 50 && bills <= 200) {
        tips = ((15 / 100) * bills);
    }
    else {
        tips = ((1 / 5) * bills);
    }
    total = (tips + bills);

    //return tips;
    return total, tips;

}

function calcAverage(bills) {
    let sum = 0;
    for (let j = 0; j < bills.length; j++) {
        sum += bills[j];
    }
    let avge = sum / bills.length;
    return avge;
}


let bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
let tips = [];
let total = [];

for (let i = 0; i < bills.length; i++) {
    console.log(calcTip(bills[i], tips[i], total[i]));

}

console.log(calcAverage(bills));




