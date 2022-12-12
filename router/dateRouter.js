const {
	getYear,
	getMonth,
	isHolidayToday,
	isHoliday,
} = require("../controller/dateResponseController");
const yearRouter = (req, res) => {
	let response = getYear(req.params.year);
	res.status(200).json(response);
};

const monthRouter = (req, res) => {
	let response = getMonth(req.params.year, req.params.month);
	res.status(200).json(response);
};

const todayRouter = (req, res) => {
	//    let {keyPass} = req.params

	let response = isHolidayToday();
	res.status(200).json(response);
};

const holiday = (req, res) => {
	let { year, month, day } = req.params;
	let response = isHoliday(`${year}-${month}-${day}`);
	res.send(response);
};
module.exports = {
	yearRouter,
	monthRouter,
	todayRouter,
	holiday,
};
