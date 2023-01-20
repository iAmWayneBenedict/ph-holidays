const { authControllerRegister } = require("../controller/userController");
const { default: jwtDecode } = require("jwt-decode");
const User = require("../model/User");
const { createToken } = require("../token/createToken");

const home = async (req, res) => {
	if (!req.query?.access_token) return res.render("main");

	handleAuth(req.query, res);

	res.redirect("/");
};

const pricing = (req, res) => {
	res.render("pricing");
};

const handleAuth = async (query, res) => {
	const { access_token, expires_in, provider_token, refresh_token, token_type } = query;

	const d = jwtDecode(access_token);
	console.log(d);

	try {
		const user = authControllerRegister(d.email, d.app_metadata.providers);

		let token = createToken(user?._id);

		res.cookie("token", token, {
			expires: new Date(Date.now() + 604800000),
			signed: true,
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	home,
	pricing,
};
