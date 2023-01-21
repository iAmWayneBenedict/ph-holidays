const router = require("express").Router();
const getDate = require("../controller/getDate");
const { home, pricing } = require("../router/homeRouter");
const { todayRouter, yearRouter, monthRouter, holiday } = require("../router/dateRouter");
const {
	login,
	register,
	postLogin,
	postRegister,
	googleAuth,
	githubAuth,
	verification,
	postVerification,
} = require("../router/auth");

//router.get("/:keyPass/ph/:year", getDate)
router.get("/", home);
router.get("/login", login);
router.get("/verification", verification);
router.post("/postVerification", postVerification);
router.post("/postLogin", postLogin);
router.get("/googleAuth", googleAuth);
router.get("/githubAuth", githubAuth);

router.get("/pricing", pricing);
router.post("/postRegister", postRegister);
router.get("/register", register);
router.get("/:keyPass/api/today", todayRouter);
router.get("/:keyPass/api/:year", yearRouter);
router.get("/:keyPass/api/:year/:month", monthRouter);
router.get("/:keyPass/api/:year/:month/:day", holiday);

module.exports = router;
