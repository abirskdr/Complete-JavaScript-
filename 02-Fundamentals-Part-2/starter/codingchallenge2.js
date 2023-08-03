function calcTip(bills) {
    const tips = new Array();
    const total = new Array();
    for (let i = 0; i < bills.length; i++) {
        if (bills[i] >= 50 && bills[i] <= 200) {
            tips[i] = ((15 / 100) * bills[i]);
        }
        else {
            tips[i] = ((1 / 5) * bills[i]);
        }
        total[i] = (tips[i] + bills[i]);
    }
    //return tips;
    return total;

}

const bills = [125, 555, 44];
console.log(calcTip(bills));