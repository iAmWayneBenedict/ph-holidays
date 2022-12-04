let mon = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    ];

const convertMonthToIndex = (month) => {
	for (let index = 0; index < mon.length; index++) {
		if (month === mon[index]) {
			return index+1;
		}
	}

	return -1;
};

const convertMonthToName = (month) => {
	for (let index = 0; index < mon.length; index++) {
		if (month === index) {
			return mon[index];
		}
	}

	return -1;
};

const getMovableDates = (data) => {
    return data.filter((el) => el.trans === "Movable")
}

const yearUpdate = (data) => {
    for (const d of data) {
        if (d.en_name === "National Bible Day") {
            d.date = "1-";
            d.rule.inMonth = "1, -1"
        }
        if (d.fil_name === "Sinulog") {
            d.en_name = "Sinulog"
            d.date = "1-";
            d.rule.inMonth = "0, 3"
        }
        if (d.fil_name === "Sinulog Rest Day") {
            d.en_name = "Sinulog Rest Day"
            d.date = "1-";
            d.rule.inMonth = "0, 3, +1"
        }
        if (d.fil_name === "Musikahan Festival") {
            d.en_name = "Musikahan Festival"
            d.rule.inMonth = "0, 3, +1"
        }
        if (d.fil_name === "Peñafrancia Festival") {
            d.en_name = "Peñafrancia Festival"
            d.date = "9-";
            d.rule.inMonth = "5, 2, 0, 3, +1"
        }

    }
    return data
//            let rules = d.rule.inMonth.replaceAll(" ", "").split(",")
//
//            return getDay(2022, formatter(d.date.split("-")[0]), parseInt(rules[0]), parseInt(rules[1]))

}

const formatter = (number) => {
    return new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(parseInt(number))
}

const getDay = (year, month, dayOfTheWeek, dayOfTheWeekPosition) => {
    let dat = new Date(year, month, 0);
    let counter = 1;
    let p = 0;
    for(let index = 1; index <= dat.getDate(); index++) {
        let da = new Date(`${year}-${month}-${formatter(index)}`)
        if(da.getDay() === dayOfTheWeek) {
            if (counter === dayOfTheWeekPosition)
                p = da.getDate()
            if(dayOfTheWeekPosition === -1)
                p = da.getDate()
            counter++;
        }
    }

//    p = counter
    return p

}

module.exports = {
	convertMonthToIndex,
	convertMonthToName,
    getMovableDates,
    yearUpdate
};
