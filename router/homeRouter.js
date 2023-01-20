const { authControllerRegister, authControllerLogin } = require("../controller/userController");
const { default: jwtDecode } = require("jwt-decode");
const User = require("../model/User");
const { createToken } = require("../token/createToken");

const home = async (req, res) => {
	if (!req.query?.access_token) return res.render("main");

	handleAuth(req.query, res, req.cookies);
};

const pricing = (req, res) => {
	res.render("pricing");
};

const handleAuth = async (query, res, cookies) => {
	const { access_token, expires_in, provider_token, refresh_token, token_type } = query;

	const d = jwtDecode(access_token);

	try {
		let user = null;
		if (cookies?.location === "signup") {
			user = await authControllerRegister(d.email, d.app_metadata.providers);
		} else {
			user = await authControllerLogin(d.email, d.app_metadata.providers);
		}

		res.clearCookie("location");
		if (user) {
			let token = createToken(user?._id);

			res.cookie("token", token, {
				expires: new Date(Date.now() + 604800000),
				signed: true,
			});

			return res.redirect("/");
		}
	} catch (error) {
		return res.redirect("/login?error=" + error.message);
	}
};

module.exports = {
	home,
	pricing,
};
