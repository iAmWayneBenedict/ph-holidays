const {
	registerController,
	loginController,
	verifyUser,
} = require("../controller/userAuthController");
const express = require("express");
const app = express();
// const cookieParser = require("cookie-parser");
const { createToken, hash } = require("../utils/encode");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");
const { unHash, getTokenData } = require("../utils/decode");
const verifyUserEmail = require("../services/email");
const Promise = require("bluebird");
const randomNumber = require("random-number-csprng");

require("dotenv");

// app.use(cookieParser(process.env.PASS_KEY));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const hasSignedUser = (req) => {
	return !!Object.keys(req.signedCookies).length;
};

const verifySignedUser = (req, res) => {
	if (hasSignedUser(req)) {
		res.status(200).json({
			msg: "Verified user",
			code: 200,
			user: "",
			redirect: req.query.redirect,
		});

		return;
	}

	res.status(403).json({
		msg: "User not found",
		code: 404,
		user: null,
		redirect: "/",
	});
};

const removeCookie = (res, key) => {
	res.clearCookie(key);
};

const login = (req, res) => {
	removeCookie(res, "token");
	console.log(req.signedCookies);
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
		let hashed = hash(email).includes("+") ? hash(email).replaceAll("+", "%2b") : hash(email);
		res.status(200).json({
			msg: "Successfully Registered",
			code: 200,
			user,
			redirect: "/verification?q=" + hashed,
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

const verification = async (req, res) => {
	let { q, resend } = req.query;
	// removeCookie(res, "verification-expiry");
	q = q.replaceAll("%2b", "+");
	q = q.replaceAll("%20", "+");
	q = q.replaceAll(" ", "+");
	if (q) {
		const email = unHash(q);
		const TIMER = 180000;

		if ((!req.cookies["verification-expiry"] && !req.cookies["sent"]) || resend === "true") {
			const fullUrl = `${req.protocol}://${req.get("host")}/verification?q=${q}`;

			try {
				let randNumber = await Promise.try(() => randomNumber(100000, 999999));

				let response = await verifyUserEmail(email, randNumber);

				res.cookie("verification-expiry", Date.now() + TIMER);
				res.cookie("verification-code", randNumber);
			} catch (err) {
				console.log(err);
			}

			if (resend === "true") return res.redirect(fullUrl);
		}

		if (!req.cookies["sent"]) res.cookie("sent", 1);

		return res.render("verification", { email });
	}

	res.render("verification");
};

const postVerification = (req, res) => {
	const { value } = req.body;

	if (value !== req.cookies["verification-code"])
		return res.status(403).json({
			// email,
			msg: "Invalid Code",
			code: 403,
			user: null,
			redirect: "",
		});

	let token = req.signedCookies.token;
	let { _id } = getTokenData(token);

	try {
		let user = verifyUser(_id);
		if (!user)
			return res.status(403).json({
				msg: "User not found",
				code: 403,
				redirect: "",
			});

		removeCookie(res, "verification-expiry");
		removeCookie(res, "verification-code");
		removeCookie(res, "sent");

		res.status(200).json({
			msg: "Successfully Verified",
			code: 200,
			redirect: "/",
		});
	} catch (error) {
		res.status(403).json({
			msg: error.message,
			code: 403,
			redirect: "",
		});
	}
};

module.exports = {
	register,
	login,
	postLogin,
	postRegister,
	googleAuth,
	githubAuth,
	verification,
	postVerification,
	verifySignedUser,
};
