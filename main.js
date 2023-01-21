const path = require("path");
const express = require("express");
const app = express();
const axios = require("axios");
const fs = require("fs");
const route = require("./routes/route");
const session = require("express-session");
const config = require("./config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(express.static(path.join(__dirname + "/src")));

(async () => {
	try {
		mongoose.set("strictQuery", "true");
		await mongoose.connect(config.mongoDBURI);
		await app.listen(config.port, () => console.log("Listening on host 127.0.0.1 port 3000"));
	} catch (err) {
		console.log(err);
	}
})();

app.use(bodyParser.json());
app.use(cookieParser(process.env.PASS_KEY));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

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
