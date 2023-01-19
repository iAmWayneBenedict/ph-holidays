const router = require("express").Router();
const getDate = require("../controller/getDate");
const { home, pricing } = require("../router/homeRouter");
const { todayRouter, yearRouter, monthRouter, holiday } = require("../router/dateRouter");
const { login, register, postLogin, postRegister } = require("../router/auth");

const express = require("express");

//router.get("/:keyPass/ph/:year", getDate)
router.get("/", home);
router.get("/login", login);
router.post("/postLogin", postLogin);

router.get("/pricing", pricing);
router.post("/postRegister", postRegister);
router.get("/register", register);
router.get("/:keyPass/api/today", todayRouter);
router.get("/:keyPass/api/:year", yearRouter);
router.get("/:keyPass/api/:year/:month", monthRouter);
router.get("/:keyPass/api/:year/:month/:day", holiday);

module.exports = router;
