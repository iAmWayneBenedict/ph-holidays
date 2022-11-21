const router = require('express').Router()
const getDate = require("../controller/getDate")

router.get("/holiday/ph/:year", getDate)

module.exports = router