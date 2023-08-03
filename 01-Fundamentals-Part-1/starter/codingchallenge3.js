for (let t = 1; t <= 3; t++) {
    if (t == 1) {
        let dolphins = [96, 108, 89];
        let dolphinsavg = ((dolphins[0] + dolphins[1] + dolphins[2]) / 3);
        let koalas = [88, 91, 110];
        let koalasavg = ((koalas[0] + koalas[1] + koalas[2]) / 3);

        if (dolphinsavg > koalasavg) {
            console.log(dolphinsavg);
        }
        else if (dolphinsavg < koalasavg) {
            console.log(koalasavg);
        }
        else {
            console.log(`draw`);

        }
    }

    else if (t == 2) {
        let dolphins = [96, 108, 89];
        let dolphinsavg = ((dolphins[0] + dolphins[1] + dolphins[2]) / 3);
        let koalas = [88, 91, 110];
        let koalasavg = ((koalas[0] + koalas[3] + koalas[2]) / 3);

        if ((dolphinsavg > koalasavg) && (dolphinsavg >= 100)) {
            console.log(dolphinsavg);
        }
        else if ((dolphinsavg < koalasavg) && (koalasavg >= 100)) {
            console.log(koalasavg);
        }
        else {

            console.log(`draw`);
        }
    }

    else if (t == 3) {
        let dolphins = [97, 112, 101];
        let dolphinsavg = ((dolphins[0] + dolphins[1] + dolphins[2]) / 3);
        let koalas = [109, 95, 106];
        let koalasavg = ((koalas[0] + koalas[1] + koalas[2]) / 3);

        if ((dolphinsavg > koalasavg) && (dolphinsavg >= 100)) {
            console.log(dolphinsavg);
        }
        else if ((dolphinsavg < koalasavg) && (koalasavg >= 100)) {
            console.log(koalasavg);
        }
        else (dolphinsavg == koalasavg)
        {
            if ((dolphinsavg >= 100) && (koalasavg >= 100)) {
                console.log(`draw`);
            }

            else {
                console.log(`no one wins`);
            }
        }
    }


}