const { authController } = require("../controller/userController");
const { default: jwtDecode } = require("jwt-decode");
const User = require("../model/User");

const home = async (req, res) => {
	if (!req.query?.access_token) return res.render("main");

	handleGoogleAuth(req.query);

	res.redirect("/");
};

const pricing = (req, res) => {
	res.render("pricing");
};

const handleGoogleAuth = async (query) => {
	const { access_token, expires_in, provider_token, refresh_token, token_type } = query;

	const d = jwtDecode(access_token);

	try {
		console.log(d.app_metadata.provider);
		const user = authController(d.email, d.app_metadata.provider);

		// res.cookie("auth-token", access_token, {
		// 	expires: new Date(Date.now() + 604800000),
		// 	signed: true,
		// });
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	home,
	pricing,
};
