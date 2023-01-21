const { registerController, loginController } = require("../controller/userAuthController");
const express = require("express");
const app = express();
// const cookieParser = require("cookie-parser");
const { createToken, hash } = require("../utils/encode");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");
const { unHash } = require("../utils/decode");

require("dotenv");

// app.use(cookieParser(process.env.PASS_KEY));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const hasSignedUser = (req) => {
	return !!Object.keys(req.signedCookies).length;
};

const removeCookie = (res, key) => {
	res.clearCookie(key);
};

const login = (req, res) => {
	removeCookie(res, "token");
	if (hasSignedUser(req)) return res.redirect("/");

	res.render("login");
};

const register = (req, res) => {
	if (hasSignedUser(req)) return res.redirect("/");

	res.render("register");
};

const postLogin = async (req, res) => {
	const { email, password } = req.body;

	try {
		let user = await loginController(email, password);

		let token = createToken(user?._id);

		res.cookie("token", token, {
			expires: new Date(Date.now() + 604800000),
			signed: true,
		});

		res.status(200).json({
			msg: "Successfully Signed in",
			code: 200,
			user,
		});
	} catch (err) {
		res.status(403).json({
			email,
			msg: err.message,
			code: 403,
		});
	}
};

const postRegister = async (req, res) => {
	const { email, password, "confirm-password": confirmPassword } = req.body;
	try {
		let user = await registerController(email, password, confirmPassword);

		let token = createToken(user?._id);

		res.cookie("token", token, {
			expires: new Date(Date.now() + 604800000),
			signed: true,
		});

		res.status(200).json({
			msg: "Successfully Registered",
			code: 200,
			user,
			redirect: "/verification?q=" + hash(email),
		});
	} catch (err) {
		res.status(403).json({
			email,
			msg: err.message,
			code: 403,
			user: null,
			redirect: "",
		});
	}
};

const handleLocation = (location, res) => {
	res.cookie("location", location, { expires: new Date(Date.now() + 3600000) });
};

const googleAuth = async (req, res) => {
	// Create a single supabase client for interacting with your database
	const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET);

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "google",
	});

	handleLocation(req.query.location, res);

	res.redirect(data.url);
};

const githubAuth = async (req, res) => {
	// Create a single supabase client for interacting with your database
	const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET);

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "github",
	});

	handleLocation(req.query.location, res);

	res.redirect(data.url);
};

const verification = (req, res) => {
	const { q, resend } = req.query;
	// removeCookie(res, "verification-expiry");
	if (q) {
		const email = unHash(q);
		const TIMER = 8000;
		if ((!req.cookies["verification-expiry"] && !req.cookies["sent"]) || resend === "true")
			res.cookie("verification-expiry", Date.now() + TIMER);

		if (!req.cookies["sent"]) res.cookie("sent", 1);

		return res.render("verification", { email });
	}

	res.render("verification");
};

const postVerification = (req, res) => {};

module.exports = {
	register,
	login,
	postLogin,
	postRegister,
	googleAuth,
	githubAuth,
	verification,
};
