const {getYear, getMonth, isHolidayToday} = require("../controller/dateResponseController");
const yearRouter = (req, res) => {
    let response = getYear(req.params.year)
    res.status(200).json(response)
}

const monthRouter = (req, res) => {
    let response = getMonth(req.params.year, req.params.month)
    res.status(200).json(response)
}

const todayRouter = (req, res) => {
    let response = isHolidayToday();
    res.status(200).json(response)
}
module.exports = {
    yearRouter,
    monthRouter,
    todayRouter
}