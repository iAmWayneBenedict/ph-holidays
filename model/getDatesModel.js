const {getDay} = require("../controller/dateController");
const formatter = require("../src/js/formatter");
const fs = require("fs");
let response = fs.readFileSync("./src/json/date.json")

/*
*
*   get all holidays and format
*
*/

const getDates = (year) => {
    if (isNaN(year)) return 422;
    let jsonDates = JSON.parse(response);
    for (const d of jsonDates) {
        if (!d) continue;
        let dateTemp = d.date;
        let month = dateTemp.split("-")[0];
        let ruleInMonth = d.rule.inMonth.replaceAll(" ", "").split(",")

        if (dateTemp.split("-").length > 1 && dateTemp.split("-")[1] !== "") {
            // get dates for all the dates that has a span of holidays

            if (!dateTemp.includes(",")) {
                d.date = formatDate(setValidDateFormat(month, dateTemp.split("-")[1], year));
                continue;
            }

            let day1 = dateTemp.split("-")[1].split(",")[0];
            let day2 = dateTemp.split("-")[1].split(",")[1];
            d.date = formatDate(setDualValidDateFormat(month, day1, day2, year));

            continue;
        }
        // create dates for movable holidays
        if (ruleInMonth.length === 2) {
            let [ dayOfTheWeek, dayOfTheWeekPos ] = ruleInMonth;
            let day = getDay(year, formatter(month), parseInt(dayOfTheWeek), parseInt(dayOfTheWeekPos))

            d.date = formatDate(setValidDateFormat(month, day, year));
        } else if (ruleInMonth.length === 3) {
            let [ dayOfTheWeek, dayOfTheWeekPos, incrementor ] = ruleInMonth;
            let day = getDay(year, formatter(month), parseInt(dayOfTheWeek), parseInt(dayOfTheWeekPos))
            if (incrementor === "+1") {
                day = getDay(year, formatter(month), parseInt(dayOfTheWeek), parseInt(dayOfTheWeekPos)) + 1
            }

            d.date = formatDate(setValidDateFormat(month, day, year));
        } else if(ruleInMonth.length === 4) {
            // create dates for movable holidays
            let [
                dayOfTheWeek,
                dayOfTheWeekPos,
                dayOfTheWeek2,
                dayOfTheWeekPos2
            ] = ruleInMonth;

            let day = getDay(year, formatter(month), parseInt(dayOfTheWeek), parseInt(dayOfTheWeekPos))
            let day2 = getDay(year, formatter(month), parseInt(dayOfTheWeek2), parseInt(dayOfTheWeekPos2))

            d.date = formatDate(setDualValidDateFormat(month, day, day2, year));
        }
    }

    return jsonDates
}

const setDualValidDateFormat = (month, day, day2, year) => {
    let tempDate = `${month}/${day}/${year}`;
    tempDate += ` - ${month}/${day2}/${year}`;
    return tempDate;
}

const setValidDateFormat = (month, day, year) => {
    return `${month}/${day}/${year}`
}

const formatObjectSingleDate = (date) => {
    let date1 = new Date(date)
    let date2 = new Date(date1.getTime())
    date2.setDate(date2.getDate() + 1)
    return {
            from: {
                fullDate: date1,
                month: date1.getMonth() + 1,
                day: date1.getDate(),
                year: date1.getFullYear()
            },
            to: {
                fullDate: date2,
                month: date2.getMonth() + 1,
                day: date2.getDate(),
                year: date2.getFullYear()
            }
        }
}

const formatObjectDoubleDate = (date) => {
    let [date1, date2] = date.split(" - ");
    date1 = new Date(date1)
    date2 = new Date(date2)
    return {
        from: {
            fullDate: date1,
            month: date1.getMonth() + 1,
            day: date1.getDate(),
            year: date1.getFullYear()
        },
        to: {
            fullDate: date2,
            month: date2.getMonth() + 1,
            day: date2.getDate(),
            year: date2.getFullYear()
        }
    }
}

const formatDate = (date) => date.includes("-") ? formatObjectDoubleDate(date) : formatObjectSingleDate(date)

module.exports = getDates