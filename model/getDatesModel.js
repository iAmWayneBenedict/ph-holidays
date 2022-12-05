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
    let temp = [];
    let jsonDates = JSON.parse(response);
    for (const d of jsonDates) {
        if (!d) continue;
        let dateTemp = d.date;
        let tempDate;
        let month = dateTemp.split("-")[0];

        if (dateTemp.split("-").length > 1 && dateTemp.split("-")[1] !== "") {
            // get dates for all the dates that has a span of holidays

            if (dateTemp.includes(",")) {
                let day1 = dateTemp.split("-")[1].split(",")[0];
                let day2 = dateTemp.split("-")[1].split(",")[1];
                tempDate = `${month}/${day1}/${year}`;
                tempDate += ` - ${month}/${day2}/${year}`;
                d.date = tempDate;
            } else {
                /*
                *
                *   reformat dates in supported format
                *   format mm/dd/yyyy or m/d/yyy
                *
                */
                tempDate = `${month}/${dateTemp.split("-")[1]}/${year}`;
                d.date = tempDate;
            }
        }
        else {
            // create dates for movable holidays
            if (d.rule.inMonth.length === 3) {
                let [dayOfTheWeek, dayOfTheWeekPos, incrementor] = d.rule.inMonth.replaceAll(" ", "").split(",");
                let day = getDay(year, formatter(month), parseInt(dayOfTheWeek), parseInt(dayOfTheWeekPos))
                if (incrementor === "+1") {
                    day = getDay(year, formatter(month), parseInt(dayOfTheWeek), parseInt(dayOfTheWeekPos)) + 1
                }
                tempDate = `${month}/${day}/${year}`;
                d.date = tempDate;
            } else if(d.rule.inMonth.length === 4) {
                // create dates for movable holidays
                let [dayOfTheWeek, dayOfTheWeekPos, dayOfTheWeek2, dayOfTheWeekPos2] = d.rule.inMonth.replaceAll(" ", "").split(",");
                let day = getDay(year, formatter(month), parseInt(dayOfTheWeek), parseInt(dayOfTheWeekPos))
                let day2 = getDay(year, formatter(month), parseInt(dayOfTheWeek2), parseInt(dayOfTheWeekPos2))

                tempDate = `${month}/${day}/${year}`;
                tempDate += ` - ${month}/${day2}/${year}`;
                d.date = tempDate;
            }
        }
        temp.push(tempDate)
    }
    return jsonDates
}

module.exports = getDates