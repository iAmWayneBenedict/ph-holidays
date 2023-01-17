const { registerController, loginController } = require("../controller/userController");

const login = (req, res) => {
	res.render("login");
};

const register = (req, res) => {
	res.render("register");
};

const postRegister = async (req, res) => {
	const { email, password } = req.body;
	let user = await registerController(email, password);
	if (user) {
		res.json({
			msg: "Successfully Registered",
			code: 200,
		});
	} else {
		res.json({
			msg: "Registration Failed",
			code: 201,
		});
	}
};

module.exports = {
	register,
	login,
	postRegister,
};
