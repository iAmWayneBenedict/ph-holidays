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

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use("/", route);

const { data, setDate } = require("./src/js/toDate");

const scraper = require("./scraper/scraper");
const {
	convertMonthToName,
	convertMonthToIndex,
	getMovableDates,
	yearUpdate,
	getDay,
} = require("./controller/dateController");

const formatter = require("./src/js/formatter");

app.get("/scrape/save", async (req, res) => {
	//        console.log(await scraper());
	let dataDates = data(await scraper());
	setDate(dataDates);
	res.send(dataDates);
});

const {
	getYear,
	isHolidayToday,
	isHoliday,
	searchQuery,
} = require("./controller/dateResponseController");

app.get("/search", (req, res) => {
	let { q } = req.query;
	res.json(searchQuery(q));
});

app.use((req, res, next) => {
	res.status(404).send({
		status: "not found",
		statusCode: 404,
		message: "Hello stranger, your request is nowhere to be found!",
	});
});
