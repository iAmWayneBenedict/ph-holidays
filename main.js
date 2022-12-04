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
const { convertMonthToName, convertMonthToIndex, getMovableDates, yearUpdate } = require("./controller/dateController");

app.get("/scrape/save", async (req, res) => {
//        console.log(await scraper());
    let dataDates = data(await scraper())
    setDate(dataDates)
    res.json(dataDates)
})

app.get("/", (req, res) => {
        let dara = fs.readFileSync("./src/json/date.json");
        res.send(JSON.parse(dara))
})
