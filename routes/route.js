const router = require('express').Router()
const getDate = require("../controller/getDate")
const {todayRouter, yearRouter, monthRouter} = require("../router/dateRouter");

router.get("/ph/:year", getDate)
router.get("/today", todayRouter)
router.get("/:year", yearRouter)
router.get("/:year/:month", monthRouter)

module.exports = router