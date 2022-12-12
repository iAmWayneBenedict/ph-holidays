const router = require("express").Router();
const getDate = require("../controller/getDate");
const home = require("../router/homeRouter");
const { todayRouter, yearRouter, monthRouter, holiday } = require("../router/dateRouter");

//router.get("/:keyPass/ph/:year", getDate)
router.get("/", home);
router.get("/:keyPass/api/today", todayRouter);
router.get("/:keyPass/api/:year", yearRouter);
router.get("/:keyPass/api/:year/:month", monthRouter);
router.get("/:keyPass/api/:year/:month/:day", holiday);

module.exports = router;
