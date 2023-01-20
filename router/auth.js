const { registerController, loginController } = require("../controller/userController");
const express = require("express");
const app = express();
// const cookieParser = require("cookie-parser");
const { createToken } = require("../token/createToken");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");

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
		});
	} catch (err) {
		res.status(403).json({
			email,
			msg: err.message,
			code: 403,
		});
	}
};

const googleAuth = async (req, res) => {
	// Create a single supabase client for interacting with your database
	const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET);

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "google",
	});

	res.redirect(data.url);
};

const githubAuth = async (req, res) => {
	// Create a single supabase client for interacting with your database
	const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET);

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "github",
	});

	res.redirect(data.url);
};

module.exports = {
	register,
	login,
	postLogin,
	postRegister,
	googleAuth,
	githubAuth,
};
