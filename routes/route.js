const router = require('express').Router()
const getDate = require("../controller/getDate")

router.get("/ph/:year", getDate)

module.exports = router