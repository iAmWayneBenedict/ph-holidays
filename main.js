const path = require("path");
const express = require("express");
const app = express();
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const route = require("./routes/route");

app.use(express.static(path.join(__dirname + "/src")));

app.listen(8000, "127.0.0.1", function () {
	console.log("Listening on host 127.0.0.1 port 8000");
});

// app.get("/", (req, res) => {
// 	res.send("<h1>Welcome to ph dates API</h1>");
// });
// app.use("/holiday", route);



const {data, setDate} = require("./src/js/toDate");

const scraper = require("./scraper/scraper");
const { convertMonthToName, convertMonthToIndex, getMovableDates, yearUpdate, getDay} = require("./controller/dateController");
const formatter = require("./src/js/formatter");

app.get("/scrape/save", async (req, res) => {
//        console.log(await scraper());
    let dataDates = data(await scraper())
    setDate(dataDates)
    res.send(dataDates)
})
const jsonObj = require("./src/json/date.json");

app.get("/", async (req, res) => {
    let temp = []
        for (const d of jsonObj) {
            if (!d) continue;
            let dateTemp = d.date;
            let tempDate;
            let month = dateTemp.split("-")[0];
            let year = req.query.year;
            if (dateTemp.split("-").length > 1 && dateTemp.split("-")[1] !== "") {
                if (dateTemp.includes(",")) {
                    let day1 = dateTemp.split("-")[1].split(",")[0];
                    let day2 = dateTemp.split("-")[1].split(",")[1];
                    tempDate = `${month}/${day1}/${year}`;
                    tempDate += ` - ${month}/${day2}/${year}`;
                } else {
                    tempDate = `${month}/${dateTemp.split("-")[1]}/${year}`;
                }
            }
            else {
                let [dayOfTheWeek, dayOfTheWeekPos, incrementor] = d.rule.inMonth.replaceAll(" ", "").split(",");
                let day = getDay(year, formatter(month), parseInt(dayOfTheWeek), parseInt(dayOfTheWeekPos))
                if (incrementor === "+1") {
                    day = getDay(year, formatter(month), parseInt(dayOfTheWeek), parseInt(dayOfTheWeekPos)) + 1
                }
                tempDate = `${month}/${day}/${year}`;
            }
            temp.push(tempDate)
        }
        res.send(temp)
//    res.json(getDay(2022, "12", 2, 2))
})
