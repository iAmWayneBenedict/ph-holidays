const { registerController, loginController } = require("../controller/userController");
const express = require("express");
const app = express();
// const cookieParser = require("cookie-parser");
const { createToken } = require("../token/createToken");
const bodyParser = require("body-parser");
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
	res.render("login");
};

const register = (req, res) => {
	res.render("register");
};

const postRegister = async (req, res) => {
	if (hasSignedUser(req))
		return res.status(201).json({
			msg: "Already signed in",
		});

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

module.exports = {
	register,
	login,
	postRegister,
};
