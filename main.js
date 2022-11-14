const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

const YEAR = 2026;
const jsonFile = {
	year: YEAR,
	data: [],
};

(async () => {
	const response = await axios.get(`https://publicholidays.ph/${YEAR}-dates/`);
	const $ = cheerio.load(response.data);

	let counter = 1;
	let date,
		name,
		f = [];
	$(".even, .odd").children(function () {
		let d = $(this).html();
		if (counter === 1) {
			date = convertDate(d.split(" ")[1], d.split(" ")[0], YEAR);
		}
		if (counter === 3) {
			name = $(this).find("a").html();
			f.push({ date, name });
			counter = 0;
		}
		counter++;
	});
	jsonFile.data = f;
})();

function convertDate(month, days, year) {
	let mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	for (let index = 0; index < mon.length; index++) {
		if (month.toLowerCase() === mon[index].toLowerCase()) {
			let monthIndex = (index + 1).toLocaleString("en-US", {
				minimumIntegerDigits: 2,
			});
			let day = parseInt(days).toLocaleString("en-US", {
				minimumIntegerDigits: 2,
			});
			return `${year}-${monthIndex}-${day}`;
		}
	}
}
