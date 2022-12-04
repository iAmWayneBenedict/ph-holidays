const { convertMonthToName, convertMonthToIndex, getMovableDates } = require("../../controller/dateController");
const fs = require("fs");
const prettyjson = require('prettyjson');
const {prettyPrintJson} = require("pretty-print-json")
//import stringify from "json-stringify-pretty-compact";

const data = (dara) => {
//    let dara = fs.readFileSync("./src/Holiday.json");
    let data = dara;
    data = data.map((el) => {
        if (el.en_name === "Vesak Day") return
        if (el.en_name === "National Bible Day") {
            el.date = "1-";
            el.rule.inMonth = "1, -1"
        }

        if (el.fil_name === "Sinulog") {
            el.en_name = "Sinulog"
            el.date = "1-";
            el.rule.inMonth = "0, 3"
        }
        if (el.fil_name === "Sinulog Rest Day") {
            el.en_name = "Sinulog Rest Day"
            el.date = "1-";
            el.rule.inMonth = "0, 3, +1"
        }
        if (el.fil_name === "Musikahan Festival") {
            el.en_name = "Musikahan Festival"
        }
        if (el.fil_name === "Peñafrancia Festival") {
            el.en_name = "Peñafrancia Festival"
            el.date = "9-";
            el.rule.inMonth = "5, 2, 0, 3"
        }

        let month = convertMonthToIndex(el.date.split(/(\s+)/).filter( e => e.trim().length > 0)[0]);
        if (month === -1) return el
        let day = el.date.split(/(\s+)/).filter( e => e.trim().length > 0)[1];
        if ((new RegExp('–')).test(day)) {
            day = day.replace('–', ",")
        } else if((new RegExp('-')).test(day)) {
            day = day.replace('-', ",")
        }

        if (month !== -1) {
            el.date = `${month}-${day}`;
            return el;
        }
    });

    return data;
}

const setDate = (data) => {
    fs.writeFile("./src/json/date.json", JSON.stringify(data), (err) => {
        if (err) throw err;

        return "replaced"
    })
}

module.exports = {
    data, setDate
}